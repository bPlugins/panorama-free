import { createRoot } from "react-dom/client";
import PanoramicImageViewer from "./Components/Common/PanoramicImageViewer";
import Style from "./Components/Common/Style";
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const PanoramicImageViewerEls = document.querySelectorAll( ".wp-block-panorama-image-3d");
  
  PanoramicImageViewerEls.forEach((PanoramicImageViewerEl) => {
    const attributes = JSON.parse(PanoramicImageViewerEl.dataset.attributes);

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
    
    createRoot(PanoramicImageViewerEl).render(
      <>
        <Style attributes={attributes} id={PanoramicImageViewerEl.id} />

        <div className="bBlocksImg3dViewer">
          <PanoramicImageViewer
            attributes={attributes}
            device={device}
            isMotionSupported={isMotionSupported}
            isButton={false}
          />
        </div>
      </>
    );

    PanoramicImageViewerEl?.removeAttribute("data-attributes");
  });
});
