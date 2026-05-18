import { useEffect, useRef } from "react";
import { panoDown, panoLeft, panoRight, panoUp } from "../../utils/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ImageViewer = ({ attributes, setAttributes, isButton = true }) => {
  const { imageUrl, previewImgUrl = "", loadButtonText="Click to Load Panorama", options, customControl } = attributes || {};

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
          bylineLabel: author ? isByline? `by ${author}` : author : "",
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

      if (!controlsRef.current) {
        return;
      }

      if (controlsRef.current) {
        controlsRef.current
          .querySelector(".pan-up")
          .addEventListener("click", function () {
            viewerInstance.current.setPitch(
              viewerInstance.current.getPitch() + 10
            );
          });
        controlsRef.current
          .querySelector(".pan-down")
          .addEventListener("click", function () {
            viewerInstance.current.setPitch(
              viewerInstance.current.getPitch() - 10
            );
          }),
          controlsRef.current
            .querySelector(".pan-left")
            .addEventListener("click", function () {
              viewerInstance.current.setYaw(
                viewerInstance.current.getYaw() - 10
              );
            }),
          controlsRef.current
            .querySelector(".pan-right")
            .addEventListener("click", function () {
              viewerInstance.current.setYaw(
                viewerInstance.current.getYaw() + 10
              );
            })
      }

      return () => {
        if (viewerInstance.current) {
          viewerInstance.current.destroy();
        }
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
