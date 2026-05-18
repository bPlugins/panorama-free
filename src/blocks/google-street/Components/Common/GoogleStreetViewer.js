import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleStreetViewer = ({ attributes, setAttributes, isButton = true }) => {
  const { panoId, options } = attributes;
  const { hideDefaultCtrl, autoRotate, autoRotateSpeed, autoRotateActivationDuration, initialView, initialPosition } = options || {};

  const { x, y, z } = initialPosition || {};

  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);
  const panoramaInstance = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!panoId) return;

    if (viewerInstance.current) {
      viewerInstance.current.dispose();
      viewerInstance.current = null;
      if (viewerRef.current) {
        viewerRef.current.innerHTML = "";
      }
    }

    panoramaInstance.current = new PANOLENS.GoogleStreetviewPanorama(panoId);

    viewerInstance.current = new PANOLENS.Viewer({
      container: viewerRef.current,
      controlButtons: !hideDefaultCtrl ? ["setting", "fullscreen"] : [],
      autoRotate,
      autoRotateSpeed,
      autoRotateActivationDuration,
    });
    viewerInstance.current.add(panoramaInstance.current);

    if (initialPosition) {
      viewerInstance.current.camera.position.set(x, y, z);
    }

    if (buttonRef.current && viewerRef.current) {
      viewerRef.current.appendChild(buttonRef.current);
    }

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.dispose();
      }
    };
  }, [
    panoId,
    hideDefaultCtrl,
    autoRotate,
    autoRotateSpeed,
    autoRotateActivationDuration,
    initialView,
    initialPosition
  ]);

  const handleSetInitialView = () => {
    try {
      if (viewerInstance.current) {
        const {x,y,z} = viewerInstance.current.camera.position;
        setAttributes({
          options: {
            ...options,
            initialPosition: {x,y,z}
          },
        });
        toast.success("Initial view set successfully", { position: "bottom-center" });
      } else {
        toast.error("VR view not initialized!", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to set initial view ⚠️", { position: "top-right" });
    }
  };


  return (
    <>
    <ToastContainer />

    <div ref={viewerRef} className="panoramaGoogleStreetViewer">
      {isButton && initialView && (
        <button
          ref={buttonRef}
          onClick={handleSetInitialView}
          className="setInitialLookButton"
        >
          Set as Initial View
        </button>
      )}
    </div>
    
    </>
    
  );
};

export default GoogleStreetViewer;
