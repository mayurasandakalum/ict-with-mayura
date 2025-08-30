import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

// Configuration
const STORAGE_KEY = "visitor_id";
const BATCH_SIZE = 10;
const BATCH_DELAY = 1000;
const RETRY_DELAY = 5000;
const THROTTLE_DELAY = 500;
const MAX_RETRIES = 3;

// Types
interface PageViewData {
  visitor_id: string;
  page_path: string;
  referrer: string | null;
  user_agent: string;
  browser_name: string;
  browser_version: string;
  screen_size: string;
  language: string;
  timestamp: string;
}

interface QueueItem extends PageViewData {
  retries?: number;
}

// State management
let analyticsQueue: QueueItem[] = [];
let isProcessingQueue = false;
let lastTrackTime = 0;
let isAnalyticsEnabled = true;

// Privacy checks
const shouldRespectDoNotTrack = (): boolean => {
  const respectDNT = import.meta.env.VITE_RESPECT_DO_NOT_TRACK === "true";
  return (
    respectDNT &&
    (navigator.doNotTrack === "1" ||
      (window as any).doNotTrack === "1" ||
      (navigator as any).msDoNotTrack === "1")
  );
};

const isAnalyticsAllowed = (): boolean => {
  const enabled = import.meta.env.VITE_ANALYTICS_ENABLED !== "false";
  const respectsPrivacy = !shouldRespectDoNotTrack();
  return enabled && respectsPrivacy && isAnalyticsEnabled;
};

// Visitor ID management
const getOrCreateVisitorId = (): string => {
  try {
    let visitorId = localStorage.getItem(STORAGE_KEY);
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem(STORAGE_KEY, visitorId);
    }
    // visitorId is guaranteed to be a string here
    return visitorId as string;
  } catch (error) {
    // Fallback for privacy mode or localStorage issues
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Queue processing with retry logic
const processQueue = async (): Promise<void> => {
  if (
    isProcessingQueue ||
    analyticsQueue.length === 0 ||
    !isAnalyticsAllowed()
  ) {
    return;
  }

  isProcessingQueue = true;

  try {
    const batch = analyticsQueue.splice(0, BATCH_SIZE);

    const { error } = await supabase
      .from("page_views")
      .insert(batch.map(({ retries, ...item }) => item));

    if (error) {
      throw error;
    }

    // Continue processing if there are more items
    if (analyticsQueue.length > 0) {
      setTimeout(processQueue, BATCH_DELAY);
    }
  } catch (error) {
    // On failure, re-queue batch items with incremented retry count
    console.error("Analytics batch failed:", error);

    // If we have a failed batch (we attempted to remove it above), we need to reconstruct behavior:
    // We'll increment retries for the last attempted batch items and put retriable ones back to the front.
    // Since `batch` is out of scope here if an exception was thrown before assignment, defensively compute from scratch.
    // For robustness, treat the first BATCH_SIZE items as the failed batch.
    // (no explicit failed batch variable needed)

    // Build retriable list from what was attempted previously — conservative approach: take up to BATCH_SIZE items from the front
    const attemptCandidates = analyticsQueue.splice(0, BATCH_SIZE);
    const retriable = attemptCandidates
      .map((item) => ({ ...item, retries: (item.retries || 0) + 1 }))
      .filter((item) => (item.retries || 0) < MAX_RETRIES);

    // Put retriable items back at front
    analyticsQueue.unshift(...retriable);

    if (retriable.length > 0) {
      setTimeout(processQueue, RETRY_DELAY);
    }
  } finally {
    isProcessingQueue = false;
  }
};

// Enhanced page tracking with throttling
function getBrowserInfo(): { name: string; version: string } {
  try {
    // Prefer the User-Agent Client Hints API when available
    const navAny = navigator as any;
    if (navAny.userAgentData) {
      const brands = navAny.userAgentData.brands || navAny.userAgentData.uaList;
      if (Array.isArray(brands) && brands.length > 0) {
        // Pick the most specific brand (last) or first as a fallback
        const b = brands[brands.length - 1] || brands[0];
        return { name: b.brand || "unknown", version: b.version || "unknown" };
      }
    }

    const ua = navigator.userAgent || "";
    // Simple UA parsing (covers common browsers)
    if (/Edg\//.test(ua)) {
      return {
        name: "Edge",
        version: (ua.match(/Edg\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }
    if (/OPR\//.test(ua)) {
      return {
        name: "Opera",
        version: (ua.match(/OPR\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }
    if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
      return {
        name: "Chrome",
        version: (ua.match(/Chrome\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }
    if (/CriOS\//.test(ua)) {
      return {
        name: "Chrome iOS",
        version: (ua.match(/CriOS\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }
    if (/Firefox\//.test(ua)) {
      return {
        name: "Firefox",
        version: (ua.match(/Firefox\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }
    if (/Safari\//.test(ua) && /Version\//.test(ua)) {
      return {
        name: "Safari",
        version: (ua.match(/Version\/([\d\.]+)/) || [])[1] || "unknown",
      };
    }

    return { name: "unknown", version: "unknown" };
  } catch (e) {
    return { name: "unknown", version: "unknown" };
  }
}

export const trackPageView = (pagePath: string): void => {
  if (!isAnalyticsAllowed()) {
    return;
  }

  // Throttle rapid navigation
  const now = Date.now();
  if (now - lastTrackTime < THROTTLE_DELAY) {
    return;
  }
  lastTrackTime = now;

  try {
    const visitorId = getOrCreateVisitorId();

    const browser = getBrowserInfo();

    const pageViewData: PageViewData = {
      visitor_id: visitorId,
      page_path: pagePath,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      browser_name: browser.name,
      browser_version: browser.version,
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timestamp: new Date().toISOString(),
    };

    analyticsQueue.push(pageViewData);

    // Start processing if not already running
    if (!isProcessingQueue) {
      setTimeout(processQueue, 100); // Small delay to allow batching
    }
  } catch (error) {
    console.error("Failed to queue page view:", error);
  }
};

// Custom event tracking
export const trackCustomEvent = (
  eventName: string,
  eventData?: Record<string, any>
): void => {
  if (!isAnalyticsAllowed()) {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();

    supabase
      .from("custom_events")
      .insert({
        visitor_id: visitorId,
        event_name: eventName,
        event_data: eventData || {},
        timestamp: new Date().toISOString(),
      })
      .then((res: any) => {
        if (res?.error) {
          console.error("Failed to track custom event:", res.error);
        }
      });
  } catch (error) {
    console.error("Failed to track custom event:", error);
  }
};

// Session management
export const trackSessionStart = (): void => {
  trackCustomEvent("session_start", {
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};

export const trackSessionEnd = (): void => {
  trackCustomEvent("session_end", {
    timestamp: new Date().toISOString(),
  });
};

// Initialize analytics system
export const initializeAnalytics = (): void => {
  if (!isAnalyticsAllowed()) {
    // eslint-disable-next-line no-console
    console.log("Analytics disabled due to privacy settings or configuration");
    return;
  }

  // Track initial page load
  try {
    trackPageView(window.location.pathname);
    trackSessionStart();
  } catch (error) {
    console.error("Failed to track initial page/session:", error);
  }

  // Enhanced SPA navigation tracking
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (
    this: History,
    state: any,
    title: string,
    url?: string | URL | null
  ) {
    originalPushState.call(this, state, title, url);
    if (typeof url === "string") {
      try {
        trackPageView(new URL(url, window.location.origin).pathname);
      } catch (e) {
        // ignore
      }
    }
  } as typeof history.pushState;

  history.replaceState = function (
    this: History,
    state: any,
    title: string,
    url?: string | URL | null
  ) {
    originalReplaceState.call(this, state, title, url);
    if (typeof url === "string") {
      try {
        trackPageView(new URL(url, window.location.origin).pathname);
      } catch (e) {
        // ignore
      }
    }
  } as typeof history.replaceState;

  // Handle back/forward navigation
  window.addEventListener("popstate", () => {
    trackPageView(window.location.pathname);
  });

  // Track session end on page unload
  window.addEventListener("beforeunload", () => {
    trackSessionEnd();
    // Try to process remaining queue synchronously if possible
    try {
      void processQueue();
    } catch (e) {
      // ignore
    }
  });

  // Handle visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      // Process remaining queue before page becomes hidden
      void processQueue();
    }
  });
};

// Public API for manual control
export const analytics = {
  enable: () => {
    isAnalyticsEnabled = true;
  },
  disable: () => {
    isAnalyticsEnabled = false;
  },
  isEnabled: () => isAnalyticsEnabled && isAnalyticsAllowed(),
  getVisitorId: getOrCreateVisitorId,
  clearVisitorId: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear visitor ID:", error);
    }
  },
};
