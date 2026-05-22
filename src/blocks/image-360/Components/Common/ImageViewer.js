import { useEffect, useRef } from "react";
import { panoDown, panoLeft, panoRight, panoUp } from "../../utils/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGutenbergDragFix from "../../../../hooks/useGutenbergDragFix";

const ImageViewer = ({ attributes, setAttributes, isButton = true, isBackend = false, isSelected = false }) => {
  const { imageUrl, previewImgUrl = "", loadButtonText = "Click to Load Panorama", options, customControl } = attributes || {};

  const {
    autoLoad,
    hideDefaultCtrl,
    initialViewPosition,
    draggable,
    mouseZoom,
    initialView,
    disableKeyboardCtrl,
    doubleClickZoom,
    isRotate,
    autoRotateSpeed,
    compass,
    autoRotateInactivityDelay,
    titleAuthor,
    title,
    author,
    isByline,
  } = options || {};

  const { pitch, yaw, hfov } = initialViewPosition || {};

  const panoramaRef = useRef(null);
  const viewerInstance = useRef(null);
  const buttonRef = useRef(null);
  const controlsRef = useRef(null);

  useGutenbergDragFix(panoramaRef, panoramaRef, isBackend, isSelected);

  useEffect(() => {
    const { pannellum } = window || {};

    if (pannellum && panoramaRef.current) {
      viewerInstance.current = pannellum.viewer(panoramaRef.current, {
        type: "equirectangular",
        panorama: imageUrl,
        preview: previewImgUrl,
        autoLoad,
        showZoomCtrl: !hideDefaultCtrl,
        draggable,
        mouseZoom,
        showFullscreenCtrl: !hideDefaultCtrl,
        pitch,
        yaw,
        hfov,
        disableKeyboardCtrl,
        doubleClickZoom,
        autoRotate: isRotate ? autoRotateSpeed : 0,
        compass,
        autoRotateInactivityDelay,
        title: titleAuthor ? title : "",
        author: titleAuthor && author ? author : "",
        strings: {
          bylineLabel: author ? isByline ? `by ${author}` : author : "",
        }
      });

      if (!autoLoad) {
        setTimeout(() => {
          const loadBtn = panoramaRef.current?.querySelector(".pnlm-load-button p");
          if (loadBtn) loadBtn.innerHTML = loadButtonText.replace(/\n/g, "<br>");
        }, 120);
      }


      if (!titleAuthor || (!title && !author)) {
        const infoBox = document.querySelector(".pnlm-panorama-info");
        if (infoBox) infoBox.remove();
      }

      if (buttonRef.current && panoramaRef.current) {
        panoramaRef.current.appendChild(buttonRef.current);
      }

      // Add custom control event listeners if controlsRef exists
      const controlListeners = [];
      if (controlsRef.current) {
        const panUp = controlsRef.current.querySelector(".pan-up");
        const panDown = controlsRef.current.querySelector(".pan-down");
        const panLeft = controlsRef.current.querySelector(".pan-left");
        const panRight = controlsRef.current.querySelector(".pan-right");

        const onPanUp = () => {
          if (viewerInstance.current) {
            viewerInstance.current.setPitch(viewerInstance.current.getPitch() + 10);
          }
        };
        const onPanDown = () => {
          if (viewerInstance.current) {
            viewerInstance.current.setPitch(viewerInstance.current.getPitch() - 10);
          }
        };
        const onPanLeft = () => {
          if (viewerInstance.current) {
            viewerInstance.current.setYaw(viewerInstance.current.getYaw() - 10);
          }
        };
        const onPanRight = () => {
          if (viewerInstance.current) {
            viewerInstance.current.setYaw(viewerInstance.current.getYaw() + 10);
          }
        };

        if (panUp) {
          panUp.addEventListener("click", onPanUp);
          controlListeners.push({ el: panUp, handler: onPanUp });
        }
        if (panDown) {
          panDown.addEventListener("click", onPanDown);
          controlListeners.push({ el: panDown, handler: onPanDown });
        }
        if (panLeft) {
          panLeft.addEventListener("click", onPanLeft);
          controlListeners.push({ el: panLeft, handler: onPanLeft });
        }
        if (panRight) {
          panRight.addEventListener("click", onPanRight);
          controlListeners.push({ el: panRight, handler: onPanRight });
        }
      }

      return () => {
        // Destroy Pannellum viewer
        if (viewerInstance.current) {
          viewerInstance.current.destroy();
        }

        // Clean up control listeners
        controlListeners.forEach(({ el, handler }) => {
          el.removeEventListener("click", handler);
        });
      };
    }
  }, [
    imageUrl,
    previewImgUrl,
    loadButtonText,
    autoLoad,
    hideDefaultCtrl,
    draggable,
    mouseZoom,
    initialView,
    initialViewPosition,
    disableKeyboardCtrl,
    doubleClickZoom,
    isRotate,
    autoRotateSpeed,
    compass,
    autoRotateInactivityDelay,
    titleAuthor,
    title,
    author,
    customControl,
    isByline
  ]);


  const handleSetInitialView = () => {
    try {
      if (viewerInstance.current) {
        setAttributes({
          options: {
            ...options,
            initialViewPosition: {
              pitch: viewerInstance.current.getPitch(),
              yaw: viewerInstance.current.getYaw(),
              hfov: viewerInstance.current.getHfov(),
            },
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

      <div
        key={`${autoLoad}-${title}-${author}-${isByline}-${titleAuthor}-${loadButtonText}-${hideDefaultCtrl}-${compass}-${doubleClickZoom}`}
        ref={panoramaRef}
        className="panoramaImgViewer"
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
        {customControl && (
          <div id="controls" ref={controlsRef}>
            <div className="ctrl pan-left">{panoUp}</div>
            <div className="ctrl pan-right">{panoDown}</div>
            <div className="ctrl pan-up">{panoLeft}</div>
            <div className="ctrl pan-down">{panoRight}</div>
          </div>
        )}
      </div>

    </>
  );
};

export default ImageViewer;