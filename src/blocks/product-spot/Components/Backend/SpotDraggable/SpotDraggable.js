import { Children, cloneElement, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Moves its only child with a CSS translate, inside the closest `bounds` element, and calls
 * onStop(event, { x, y }) when the drag ends. Replaces react-draggable, which needs
 * ReactDOM.findDOMNode (removed in React 19).
 */
const SpotDraggable = ({ position, bounds = ".image", onStop, children }) => {
  const ref = useRef(null);
  const [dragPosition, setDragPosition] = useState(null);
  const child = Children.only(children);
  const { x, y } = dragPosition || position;

  const onPointerDown = (event) => {
    child.props.onPointerDown?.(event);

    const node = ref.current;
    // Typing in a hotspot's title / description must not start a drag.
    if (!node || 0 !== event.button || event.target.closest("input, textarea, select, [contenteditable='true']")) {
      return;
    }

    const doc = node.ownerDocument;
    const win = doc.defaultView;
    const area = node.closest(bounds) || node.parentElement;
    const nodeRect = node.getBoundingClientRect();
    const areaRect = area.getBoundingClientRect();
    const start = { pointerX: event.clientX, pointerY: event.clientY, x: position.x, y: position.y };
    let last = { x: position.x, y: position.y };
    const userSelect = doc.body.style.userSelect;
    doc.body.style.userSelect = "none";

    const onMove = (moveEvent) => {
      const dx = clamp(moveEvent.clientX - start.pointerX, areaRect.left - nodeRect.left, areaRect.right - nodeRect.right);
      const dy = clamp(moveEvent.clientY - start.pointerY, areaRect.top - nodeRect.top, areaRect.bottom - nodeRect.bottom);
      last = { x: start.x + dx, y: start.y + dy };
      setDragPosition(last);
    };

    const onUp = (upEvent) => {
      win.removeEventListener("pointermove", onMove);
      win.removeEventListener("pointerup", onUp);
      doc.body.style.userSelect = userSelect;
      setDragPosition(null);
      onStop?.(upEvent, last);
    };

    win.addEventListener("pointermove", onMove);
    win.addEventListener("pointerup", onUp);
  };

  return cloneElement(child, {
    ref,
    onPointerDown,
    style: { ...child.props.style, transform: `translate(${x}px, ${y}px)`, touchAction: "none" },
  });
};

export default SpotDraggable;
