import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { getElementorSetAttributes } from "../../utils/elementorBridge";
import Video360Viewer from "./Components/Common/Video360Viewer";
import Style from "./Components/Common/Style";
import "./style.scss";

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-video-360[data-attributes]");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);
    const editorSetAttributes = getElementorSetAttributes(PanoramicImageViewerEl);

    trackRoot(PanoramicImageViewerEl, createRoot(PanoramicImageViewerEl)).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksVideo360Viewer">
            <Video360Viewer attributes={attributes} isButton={Boolean(editorSetAttributes)} setAttributes={editorSetAttributes || undefined} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
