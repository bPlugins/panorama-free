import { createRoot } from "react-dom/client";
import ViewerOfImage from "./Components/Common/ViewerOfImage";
import ViewerOfVideo from "./Components/Common/ViewerOfVideo";
import "./style.scss";
import Style from "./Components/Common/Style";

document.addEventListener("DOMContentLoaded", () => {
  const panoramaEls = document.querySelectorAll(".wp-block-bpgb-panorama");

  panoramaEls.forEach((panoramaEl) => {
    const attributes = JSON.parse(panoramaEl.dataset.attributes);

    let device = "desktop";

    if (window.innerWidth < 768) {
      device = "mobile";
    } else if (window.innerWidth < 1024) {
      device = "tablet";
    }

    createRoot(panoramaEl).render(
      <>
        <Style attributes={attributes} id={panoramaEl.id} />

        <div className="bBlocksViewer">
          {attributes.panoType === "image" ? (
            <ViewerOfImage {...{attributes,device}} />
          ) : (
            <ViewerOfVideo attributes={attributes} />
          )}
        </div>
        
      </>
    );

    panoramaEl?.removeAttribute("data-attributes");
  });
});
