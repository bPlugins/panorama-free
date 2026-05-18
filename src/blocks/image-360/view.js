import { createRoot } from "react-dom/client";
import ImageViewer from "./Components/Common/ImageViewer";
import Style from "./Components/Common/Style";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-image-360");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksImageViewer">
            <ImageViewer attributes={attributes} isButton={false} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
