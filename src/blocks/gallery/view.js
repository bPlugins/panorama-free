import { createRoot } from "react-dom/client";
import Style from "./Components/Common/Style";
import GalleryViewer from "./Components/Common/GalleryViewer";
import "./style.scss";


document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll( ".wp-block-panorama-gallery");
  
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksGalleryViewer">
            <GalleryViewer attributes={attributes} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
