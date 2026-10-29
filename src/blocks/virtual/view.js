import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { useState } from "react";
import "./style.scss";
import Style from "./Components/Common/Style";
import TourViewer from "./Components/Common/TourViewer";

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const blockNameEls = document.querySelectorAll(".wp-block-panorama-virtual-tour[data-attributes]");
  blockNameEls.forEach((blockNameEl) => {
    const attributes = JSON.parse(blockNameEl.dataset.attributes);

    const VirtualView = () => {
      const [currentScene, setCurrentScene] = useState(attributes.scenes[0] || null);

      return (
        <>
          <Style {...{ attributes, id: blockNameEl.id }} />

          <TourViewer {...{ attributes, currentScene, setCurrentScene }} />

        </>
      );
    }

    trackRoot(blockNameEl, createRoot(blockNameEl)).render(<VirtualView />);

    blockNameEl?.removeAttribute("data-attributes");
  });

};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
