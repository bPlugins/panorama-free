import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { getElementorSetAttributes } from "../../utils/elementorBridge";
import Style from "./Components/Common/Style";
import "./style.scss";
import GoogleStreetViewer from "./Components/Common/GoogleStreetViewer";

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-google-street[data-attributes]");
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);
    const editorSetAttributes = getElementorSetAttributes(PanoramicImageViewerEl);

    trackRoot(PanoramicImageViewerEl, createRoot(PanoramicImageViewerEl)).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksGoogleStreetViewer">
          <GoogleStreetViewer attributes={attributes} isButton={Boolean(editorSetAttributes)} setAttributes={editorSetAttributes || undefined} />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
