import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { getElementorSetAttributes } from "../../utils/elementorBridge";
import ImageViewer from "./Components/Common/ImageViewer";
import Style from "./Components/Common/Style";
import "./style.scss";

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-image-360[data-attributes]");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);
    const editorSetAttributes = getElementorSetAttributes(PanoramicImageViewerEl);

    trackRoot(PanoramicImageViewerEl, createRoot(PanoramicImageViewerEl)).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksImageViewer">
            <ImageViewer attributes={attributes} isButton={Boolean(editorSetAttributes)} setAttributes={editorSetAttributes || undefined} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
