import { useRef, useEffect, useState } from "react";
import { Markmap } from "markmap-view";
import { transformer } from "../lib/markmap";
import { loadMarkdown } from "../lib/loadMarkdown";

interface MarkmapPreviewProps {
  onClick?: () => void;
}

export default function MarkmapPreview({ onClick }: MarkmapPreviewProps) {
  const [markdown, setMarkdown] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);
  const refMm = useRef<Markmap>();

  // Use callback ref to ensure we get the SVG element when it's ready
  const svgRef = useRef<SVGSVGElement | null>(null);
  const setSvgRef = (node: SVGSVGElement | null) => {
    svgRef.current = node;
    if (node && !refMm.current) {
      initializeMarkmap(node);
    }
  };

  const initializeMarkmap = (svgElement: SVGSVGElement) => {
    // Prevent multiple initializations
    if (refMm.current) return;

    const mm = Markmap.create(svgElement, {
      autoFit: true,
      fitRatio: 0.9,
      spacingHorizontal: 80,
      spacingVertical: 15,
      // Disable interactions for preview
      pan: false,
      zoom: false,
    });

    refMm.current = mm;

    // If we already have markdown, render it immediately
    if (markdown !== "Loading...") {
      try {
        const { root } = transformer.transform(markdown);
        mm.setData(root).then(() => {
          mm.fit();
        });
      } catch (e) {
        console.error("Error transforming markdown:", e);
      }
    }
  };

  // Load the grades.md file
  useEffect(() => {
    loadMarkdown("data/grades.md")
      .then(setMarkdown)
      .catch((e) => {
        console.error("Error loading grades.md:", e);
        setError("Could not load mindmap preview");
        // Fallback content
        setMarkdown(`# ශ්‍රේණිය

## 9 ශ්‍රේණිය

## සාමාන්‍ය පෙළ
### 10 ශ්‍රේණිය
### 11 ශ්‍රේණිය

## උසස් පෙළ
### 12 ශ්‍රේණිය
### 13 ශ්‍රේණිය`);
      });
  }, []);

  // Initialize markmap
  useEffect(() => {
    // Cleanup function
    return () => {
      if (refMm.current) {
        refMm.current.destroy?.();
        refMm.current = undefined;
      }
    };
  }, []);

  // Update markmap when markdown changes
  useEffect(() => {
    if (!refMm.current || markdown === "Loading...") return;

    try {
      const { root } = transformer.transform(markdown);
      refMm.current.setData(root).then(() => {
        refMm.current?.fit();
      });
    } catch (e) {
      console.error("Error transforming markdown:", e);
    }
  }, [markdown]);

  if (markdown === "Loading...") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fg-muted)",
          background: "transparent",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🗺️</div>
          <div>Loading mindmap preview...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "transparent",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
      title={onClick ? "Click to view full mindmap" : undefined}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        ref={setSvgRef}
      />
      {error && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "var(--warn)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 10,
          }}
        >
          Preview using fallback data
        </div>
      )}
    </div>
  );
}
