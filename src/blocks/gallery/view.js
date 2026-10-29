import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { getElementorSetAttributes } from "../../utils/elementorBridge";
import Style from "./Components/Common/Style";
import GalleryViewer from "./Components/Common/GalleryViewer";
import "./style.scss";


// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-gallery[data-attributes]");
  
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);
    const editorSetAttributes = getElementorSetAttributes(PanoramicImageViewerEl);

    trackRoot(PanoramicImageViewerEl, createRoot(PanoramicImageViewerEl)).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksGalleryViewer">
            <GalleryViewer attributes={attributes} isButton={Boolean(editorSetAttributes)} setAttributes={editorSetAttributes || undefined} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
