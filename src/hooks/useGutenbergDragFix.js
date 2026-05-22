import { useEffect } from 'react';

const useGutenbergDragFix = (wrapperRef, panoRef, isBackend = false, isSelected = false) => {
  useEffect(() => {
    if (!isBackend || !wrapperRef?.current) return;

    const container = wrapperRef.current;
    const blockGutenbergDrag = (e) => e.stopPropagation();
    const blockDragStart = (e) => e.preventDefault();

    let isDragging = false;
    const handleMouseDown = (e) => {
      if (e.button === 0 && panoRef?.current?.contains(e.target)) {
        isDragging = true;
      }
    };
    const handleMouseUp = (e) => {
      if (e.button === 0) {
        isDragging = false;
      }
    };

    if (isSelected) {
      container.addEventListener("mousedown", blockGutenbergDrag);
      container.addEventListener("touchstart", blockGutenbergDrag);
      container.addEventListener("pointerdown", blockGutenbergDrag);
    }
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("dragstart", blockDragStart);

    // Capture-phase event forwarding to resolve iframe drag-lock
    const targets = [];
    try {
      if (window) targets.push({ win: window, doc: window.document });
    } catch (e) { }
    try {
      if (window.parent && window.parent !== window) {
        targets.push({ win: window.parent, doc: window.parent.document });
      }
    } catch (e) { }
    try {
      if (window.top && window.top !== window && window.top !== window.parent) {
        targets.push({ win: window.top, doc: window.top.document });
      }
    } catch (e) { }

    const handleRelease = (e) => {
      if (e && e.__forwarded) return;
      const currentPanoEl = panoRef?.current;
      const dragFixEl = currentPanoEl?.querySelector(".pnlm-dragfix");
      const canvasEl = currentPanoEl?.querySelector("canvas");
      const targetEl = dragFixEl || canvasEl || currentPanoEl;
      if (!targetEl) return;

      // Dispatch synthetic mouseup
      let mouseUpEvent;
      if (typeof MouseEvent === "function") {
        mouseUpEvent = new MouseEvent("mouseup", {
          bubbles: true,
          cancelable: true,
          view: window,
          detail: e?.detail,
          screenX: e?.screenX,
          screenY: e?.screenY,
          clientX: e?.clientX,
          clientY: e?.clientY,
          button: e?.button || 0,
          buttons: e?.buttons || 0,
        });
      } else {
        mouseUpEvent = document.createEvent("MouseEvent");
        mouseUpEvent.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      mouseUpEvent.__forwarded = true;
      targetEl.dispatchEvent(mouseUpEvent);

      // Dispatch synthetic touchend
      let touchEndEvent;
      if (typeof TouchEvent === "function") {
        touchEndEvent = new TouchEvent("touchend", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
      } else {
        touchEndEvent = document.createEvent("Event");
        touchEndEvent.initEvent("touchend", true, true);
      }
      touchEndEvent.__forwarded = true;
      targetEl.dispatchEvent(touchEndEvent);
    };

    const handleGlobalRelease = (e) => {
      if (e && e.__forwarded) return;
      isDragging = false;
      handleRelease(e);
    };

    const handleMouseMove = (e) => {
      if (isDragging && (e.buttons & 1) === 0) {
        isDragging = false;
        handleRelease(e);
      }
    };

    targets.forEach(({ doc }) => {
      doc.addEventListener("mouseup", handleGlobalRelease, { capture: true });
      doc.addEventListener("touchend", handleGlobalRelease, { capture: true });
    });

    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseenter", handleMouseMove, { capture: true });

    const handleBlur = (e) => {
      isDragging = false;
      handleRelease(e);
    };
    window.addEventListener("blur", handleBlur, { capture: true });

    return () => {
      if (container) {
        if (isSelected) {
          container.removeEventListener("mousedown", blockGutenbergDrag);
          container.removeEventListener("touchstart", blockGutenbergDrag);
          container.removeEventListener("pointerdown", blockGutenbergDrag);
        }
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("dragstart", blockDragStart);
      }

      targets.forEach(({ doc }) => {
        doc.removeEventListener("mouseup", handleGlobalRelease, { capture: true });
        doc.removeEventListener("touchend", handleGlobalRelease, { capture: true });
      });

      document.removeEventListener("mouseup", handleMouseUp, { capture: true });
      document.removeEventListener("mousemove", handleMouseMove, { capture: true });
      document.removeEventListener("mouseenter", handleMouseMove, { capture: true });
      window.removeEventListener("blur", handleBlur, { capture: true });
    };
  }, [isBackend, isSelected, wrapperRef?.current, panoRef?.current]);
};

export default useGutenbergDragFix;
