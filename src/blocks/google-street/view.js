import { createRoot } from "react-dom/client";
import Style from "./Components/Common/Style";
import "./style.scss";
import GoogleStreetViewer from "./Components/Common/GoogleStreetViewer";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-google-street");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksGoogleStreetViewer">
          <GoogleStreetViewer attributes={attributes} isButton = {false} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
