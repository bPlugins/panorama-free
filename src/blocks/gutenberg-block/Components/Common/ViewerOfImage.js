import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewerOfImage = ({attributes,setAttributes, isButton = false, device = "desktop"}) => {

  const { panoImage, autoRotate, rotateSpeed, autoRotateInactivityDelay, isDeviceMotion, hideControl, initialView, initialPosition } = attributes;

  const {url} = panoImage || {};

  const imageContainerRef = useRef(null);
  const [isDeviceMotionActive, setIsDeviceMotionActive] = useState(false);
  const viewerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const { PANOLENS } = window;
    const panorama = new PANOLENS.ImagePanorama(url);

    viewerRef.current = new PANOLENS.Viewer({
      container: imageContainerRef.current,
      autoRotate,
      autoRotateSpeed : rotateSpeed, 
      controlButtons: hideControl ? ["setting", "fullscreen"] : [],
      autoRotateActivationDuration: autoRotateInactivityDelay,
    });
    
    viewerRef.current.add(panorama);
    window.viewer = viewerRef.current;
    window.panorama = panorama;

    if (initialPosition) {
      const { x, y, z } = initialPosition;
      viewerRef.current.camera.position.set(x, y, z);
    }

    const onControlChange = () => {
      setIsDeviceMotionActive(viewerRef.current.getControl().id !== "orbit");
    };

    viewerRef.current.addUpdateCallback(() => {
      if (
        viewerRef.current.getControl() !== viewerRef.current.previousControl
      ) {
        onControlChange();
        viewerRef.current.previousControl = viewerRef.current.getControl();
      }
    });

    if (buttonRef.current && imageContainerRef.current) {
      imageContainerRef.current.appendChild(buttonRef.current);
    }

    return () => {
      viewerRef.current.dispose();
    };
  }, [
    url,
    autoRotate,
    rotateSpeed,
    autoRotateInactivityDelay,
    isDeviceMotion,
    hideControl,
    initialView,
    initialPosition
  ]);

  const handleDeviceMotionToggle = () => {
    setIsDeviceMotionActive((prev) => !prev);
  };

  const handleDeviceOrientation = (event) => {
    const { alpha, beta, gamma } = event;

    if (viewerRef.current && viewerRef.current.camera) {
      viewerRef.current.camera.rotation.set(
        THREE.Math.degToRad(beta),
        THREE.Math.degToRad(alpha),
        THREE.Math.degToRad(-gamma)
      );
    }
  };

  useEffect(() => {
    if (isDeviceMotionActive) {
      viewerRef.current?.enableControl(
        window.PANOLENS.CONTROLS.DEVICEORIENTATION
      );
      if (
        typeof window.DeviceOrientationEvent?.requestPermission === "function"
      ) {
        window.DeviceOrientationEvent?.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener(
                "deviceorientation",
                handleDeviceOrientation
              );
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    } else {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      viewerRef.current?.enableControl(window.PANOLENS.CONTROLS.ORBIT);
    }
    window.viewerRef = viewerRef;

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [isDeviceMotionActive]);

  const handleSetInitialView = () => {
    try {
      if (viewerRef.current && viewerRef.current.camera) {
        const camera = viewerRef.current.camera;
        const {x,y,z} = camera.position;
        setAttributes({
            initialPosition: {x,y,z}
          },
        );
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

    {isDeviceMotion && device !== "desktop" && (
        <button className="motionBtn" onClick={handleDeviceMotionToggle}>
          {isDeviceMotionActive ? "Stop Device Motion" : "Start Device Motion"}
        </button>
      )}
    <div
      ref={imageContainerRef}
      className="bpgbPanorama"
      key={`${url}-${autoRotate}-${rotateSpeed}-${autoRotateInactivityDelay}-${initialView}-${initialPosition}-${hideControl}-${isDeviceMotion}`}
    >
     
      {isButton && initialView && (
        <button
          ref={buttonRef}
          onClick={handleSetInitialView}
          className="setInitialViewButton"
        >
          Set as Initial View
        </button>
      )}
    </div>
   </>
  );
};

export default ViewerOfImage;
