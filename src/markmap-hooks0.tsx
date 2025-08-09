import React, { useState, useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './lib/markmap';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

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
    // Register custom buttons
    toolbar.register({
      id: 'alert',
      title: 'Click to show an alert',
      content: 'Alert',
      onClick: () => alert('You made it!'),
    });
    toolbar.setItems([...Toolbar.defaultItems, 'alert']);
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapHooks({ initialValue }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue ?? defaultInitValue);
  // Ref for SVG element
  const refSvg = useRef<SVGSVGElement | null>(null);
  // Ref for markmap object
  const refMm = useRef<Markmap>();
  // Ref for toolbar wrapper
  const refToolbar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    console.log('create', refSvg.current);
    refMm.current = mm;
    if (refToolbar.current) {
      renderToolbar(refMm.current, refToolbar.current);
    }
  }, [refSvg.current]);

  // Update internal state when initialValue prop changes (e.g., user picked a different button)
  useEffect(() => {
    if (initialValue !== undefined && initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root).then(() => {
      mm.fit();
    });
  }, [refMm.current, value]);

  // If you want to re-enable editing, add a textarea and onChange handler.

  return (
    <React.Fragment>
      {/* <div className="flex-1">
        <textarea
          className="w-full h-full border border-gray-400"
          value={value}
          onChange={handleChange}
        />
      </div> */}
      <svg className="flex-1" ref={refSvg} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </React.Fragment>
  );
}
