import React, { useState, useRef, useEffect } from "react";
import { Markmap } from "markmap-view";
import { transformer } from "../lib/markmap";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";

const defaultInitValue = `# markmap

- beautiful
- useful
- easy
- interactive
`;

function renderToolbar(mm: Markmap, wrapper: HTMLElement) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    toolbar.register({
      id: "alert",
      title: "Click to show an alert",
      content: "Alert",
      onClick: () => alert("You made it!"),
    });
    toolbar.setItems([...Toolbar.defaultItems, "alert"]);
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapHooks({
  initialValue,
}: {
  initialValue?: string;
}) {
  const [value, setValue] = useState(initialValue ?? defaultInitValue);
  const refSvg = useRef<SVGSVGElement | null>(null);
  const refMm = useRef<Markmap>();
  const refToolbar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (refMm.current) return;

    const mm = Markmap.create(refSvg.current, {
      autoFit: true, // Enable auto-fit
      fitRatio: 0.8, // Optional: adjust fit ratio (default is 0.95)
      spacingHorizontal: 120, // Adjust horizontal spacing
      spacingVertical: 20, // Adjust vertical spacing
    });

    refMm.current = mm;

    if (refToolbar.current) {
      renderToolbar(refMm.current, refToolbar.current);
    }
  }, [refSvg.current]);

  useEffect(() => {
    if (initialValue !== undefined && initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root).then(() => {
      mm.fit();
    });
  }, [refMm.current, value]);

  return (
    <React.Fragment>
      <svg
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        ref={refSvg}
      />
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          zIndex: 10,
        }}
        ref={refToolbar}
      ></div>
    </React.Fragment>
  );
}
