import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./style.scss";
import Style from "./Components/Common/Style";
import TourViewer from "./Components/Common/TourViewer";

document.addEventListener("DOMContentLoaded", () => {
  const blockNameEls = document.querySelectorAll(".wp-block-panorama-virtual-tour");
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

    createRoot(blockNameEl).render(<VirtualView />);

    blockNameEl?.removeAttribute("data-attributes");
  });

});
