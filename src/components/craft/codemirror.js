import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { EditorView, ViewUpdate, Decoration } from '@codemirror/view';
import './_codemirror.scss';

const CodeEditorWithPreview = ({
  code,
  setCode,
  setComponentIds,
  setShowTuneDialog,
}) => {
  const previewRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    updatePreview();
  }, [code]);

  const updatePreview = () => {
    const previewElement = document.getElementById('preview');
    if (previewElement) {
      if (!previewElement.shadowRoot) {
        const shadowRoot = previewElement.attachShadow({ mode: 'open' });
        const styleElement = document.createElement('style');
        const scriptElement = document.createElement('script');

        styleElement.textContent = `
        * {
          transition: outline 0.1s ease-in-out;
        }
        *[id]:hover, .hover-highlight {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `;

        scriptElement.textContent = `
        document.body.addEventListener('mouseover', (e) => {
          if (e.target.id) {
            e.target.classList.add('hover-highlight');
          }
        });
        document.body.addEventListener('mouseout', (e) => {
          if (e.target.id) {
            e.target.classList.remove('hover-highlight');
          }
        });
      
      `;
        shadowRoot.appendChild(styleElement);

        shadowRoot.innerHTML = code;
        shadowRoot.appendChild(scriptElement);
      } else {
        previewElement.shadowRoot.innerHTML = code;
        const styleElement = document.createElement('style');
        const scriptElement = document.createElement('script');

        styleElement.textContent = `
       * {
          transition: outline 0.1s ease-in-out;
        }
        *[id]:hover, .hover-highlight {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `;

        scriptElement.textContent = `
       document.body.addEventListener('mouseover', (e) => {
          if (e.target.id) {
            e.target.classList.add('hover-highlight');
          }
        });
        document.body.addEventListener('mouseout', (e) => {
          if (e.target.id) {
            e.target.classList.remove('hover-highlight');
          }
        });
      `;

        previewElement.shadowRoot.prepend(scriptElement);
        previewElement.shadowRoot.prepend(styleElement);
      }
      bindClicks();
      blindHovers();
    }
  };
  const blindHovers = () => {
    const previewElement = document.getElementById('preview');
    if (previewElement && previewElement.shadowRoot) {
      previewElement.shadowRoot.addEventListener('mouseover', handleHover);
      previewElement.shadowRoot.addEventListener(
        'mouseover',
        updateTooltipPosition
      );
      previewElement.shadowRoot.addEventListener('mouseout', hideTooltip);
    }
  };
  const handleHover = (event) => {
    const path = event.composedPath();
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element.id) {
        showTooltip(element.id, event);
        break;
      }
    }
  };
  let tooltip = null;

  const createTooltip = () => {
    tooltip = document.createElement('div');
    tooltip.id = 'id-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.backgroundColor = '#C7F564';
    tooltip.style.color = 'black';
    tooltip.style.fontSize = '12px';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '10px';
    document.body.appendChild(tooltip);
  };

  const showTooltip = (id, event) => {
    if (!tooltip) createTooltip();
    if (tooltip) {
      tooltip.textContent = id;
      tooltip.style.display = 'block';
      updateTooltipPosition(event);
    }
  };

  const hideTooltip = () => {
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  };

  const updateTooltipPosition = (event) => {
    if (tooltip && tooltip.style.display === 'block') {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    }
  };
  const bindClicks = () => {
    const previewElement = document.getElementById('preview');
    if (previewElement && previewElement.shadowRoot) {
      previewElement.shadowRoot.addEventListener('click', handlePreviewClick);
    }
  };

  const handlePreviewClick = (event) => {
    const path = event.composedPath();
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element.id) {
        console.log('id', element.id);
        setComponentIds([element.id]);
        setShowTuneDialog(true);
        break;
      }
    }
  };
  const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="92px" height="92px" viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve">
  <path id="XMLID_32_" d="M46,53c-1.8,0-3.7-0.8-5-2.1c-1.3-1.3-2-3.1-2-4.9c0-1.8,0.8-3.6,2-5c1.3-1.3,3.1-2,5-2
	c1.8,0,3.6,0.8,4.9,2c1.3,1.3,2.1,3.1,2.1,5c0,1.8-0.8,3.6-2.1,4.9C49.6,52.2,47.8,53,46,53z" fill="rgb(141, 141, 141)"/>
</svg>`;
  const base64SVG = btoa(svg);

  return (
    <div>
      <div
        id="preview"
        ref={previewRef}
        class="dot-pattern"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${base64SVG}')`,
          backgroundSize: '10px 10px',
        }}
        // className="w-full aspect-square max-h-[85vh] bg-[#F4F4F4] bg-dot-pattern bg-dot p-3"
      >
        {/* {previewError ? (
          <pre>Error: {previewError}</pre>
        ) : (
          PreviewComponent && <PreviewComponent />
        )} */}
      </div>
      {/* <CodeMirror
        value={code}
        height="100%"
        extensions={[javascript({ jsx: true }), xml(), html()]}
        onChange={(value, viewUpdate) => setCode(value)}
        onCreateEditor={(view) => {
          editorRef.current = view;
        }}
      /> */}
    </div>
  );
};

export default CodeEditorWithPreview;
