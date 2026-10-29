import { createRoot } from "react-dom/client";
import { trackRoot, unmountDetachedRoots } from "../../utils/viewerRoots";
import { getElementorSetAttributes } from "../../utils/elementorBridge";
import PanoramicImageViewer from "./Components/Common/PanoramicImageViewer";
import Style from "./Components/Common/Style";
import "./style.scss";

// Also mounts on "bppiv:mount" (fired by the Elementor integration); already-mounted viewers are skipped.
const mountViewers = () => {
  unmountDetachedRoots();

  const PanoramicImageViewerEls = document.querySelectorAll(".wp-block-panorama-image-3d[data-attributes]");
  
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);
    const editorSetAttributes = getElementorSetAttributes(PanoramicImageViewerEl);

      // const device = window.innerWidth < 768 ? "mobile" : "desktop";
     // -------- Device detection --------
     let device = "desktop";

     if (window.innerWidth < 768) {
       device = "mobile";
     } else if (window.innerWidth < 1024) {
       device = "tablet";
     }
 
     // -------- Sensor support check --------
     const isMotionSupported = "DeviceOrientationEvent" in window;
    
    trackRoot(PanoramicImageViewerEl, createRoot(PanoramicImageViewerEl)).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksImg3dViewer">
          <PanoramicImageViewer
            attributes={attributes}
            device={device}
            isMotionSupported={isMotionSupported}
            isButton={Boolean(editorSetAttributes)} setAttributes={editorSetAttributes || undefined}
          />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
};

document.addEventListener("DOMContentLoaded", mountViewers);
document.addEventListener("bppiv:mount", mountViewers);
