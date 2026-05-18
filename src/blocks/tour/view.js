import { createRoot } from "react-dom/client";
import Style from "./Components/Common/Style";
import "./style.scss";
import TourViewer from "./Components/Common/TourViewer";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll( ".wp-block-panorama-tour");
  
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksTourViewer">
            <TourViewer attributes={attributes} isButton={false} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
