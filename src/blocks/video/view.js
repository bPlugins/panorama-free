import { createRoot } from "react-dom/client";
import VideoViewer from "./Components/Common/VideoViewer";
import Style from "./Components/Common/Style";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-video");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksVideoViewer">
            <VideoViewer attributes={attributes} isButton={false} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
