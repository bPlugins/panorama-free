import { createRoot } from "react-dom/client";
import Video360Viewer from "./Components/Common/Video360Viewer";
import Style from "./Components/Common/Style";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-video-360");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksVideo360Viewer">
            <Video360Viewer attributes={attributes} isButton={false} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
