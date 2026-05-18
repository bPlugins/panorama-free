
import { createRoot } from "react-dom";
import React from "react";
import FieldObserver from "./components/FieldObserver";

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const container = document.querySelector(".bppivimages_preview");

    if (!container) return;

    const root = createRoot(container);
    root.render(
      <>
        <View />
        <FieldObserver />
      </>
    );
  }, 50); 
});

export function View() {
  return <>View</>;
}

