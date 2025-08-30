import { useEffect } from "react";
import { trackCustomEvent, analytics } from "../lib/analytics";

export const useAnalytics = () => {
  return {
    trackEvent: trackCustomEvent,
    isEnabled: analytics.isEnabled,
    enable: analytics.enable,
    disable: analytics.disable,
    getVisitorId: analytics.getVisitorId,
  };
};

// Hook for tracking component interactions
export const useTrackInteraction = (componentName: string) => {
  const trackInteraction = (action: string, data?: Record<string, any>) => {
    trackCustomEvent("component_interaction", {
      component: componentName,
      action,
      ...data,
    });
  };

  return trackInteraction;
};

// Hook for tracking page-specific events
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    trackCustomEvent("page_interaction", {
      page: pageName,
      action: "page_loaded",
    });

    return () => {
      trackCustomEvent("page_interaction", {
        page: pageName,
        action: "page_unloaded",
      });
    };
  }, [pageName]);
};
