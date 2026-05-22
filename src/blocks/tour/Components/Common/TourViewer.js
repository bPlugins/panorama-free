import React, { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourViewer = ({ attributes, setAttributes, isButton = true }) => {
  const tourContainerRef = useRef();
  const viewerInstance = useRef(null);
  const buttonRef = useRef();

  const { tour_360 = [], previewImgUrl = "", loadButtonText = "Click to Load Panorama", options = {} } = attributes || {};
  const {
    hideDefaultCtrl,
    initialView,
    initialViewPosition,
    autoLoad,
    showFullscreenCtrl,
    showZoomCtrl,
    isRotate,
    autoRotateSpeed,
    autoRotateInactivityDelay,
    compass,
    mouseZoom,
    draggable,
    disableKeyboardCtrl,
    doubleClickZoom,
    isByline
  } = options;
  const { pitch, yaw, hfov } = initialViewPosition || {};

  useEffect(() => {
    let tour360Scenes = {};
    let defaultData = null;

    if (!tour_360.length) return;

    for (let i = 0; i < tour_360.length; i++) {
      const title = tour_360[i]?.title;
      const author = tour_360[i]?.author;
      const isTitleAuthor = tour_360[i]?.tourTitleAuthor;

      let titleAuthor = {
        title: isTitleAuthor ? title : "",
        author: isTitleAuthor && author ? author : "",
        strings: {
          bylineLabel: author ? isByline ? `by ${author}` : author : "",
        }
      }

      let hotSpots = (tour_360[i]?.tour_hotSpot && {
        hotSpots: [
          {
            pitch: -0.6,
            yaw: 37.1,
            type: "scene",
            text: tour_360[i].hotSpot_txt,
            sceneId: tour_360[i].target_id,
          },
        ],
      }) ||
        {};

      if (tour_360[i]?.default_data) {
        defaultData = tour_360[i];
      }

      tour360Scenes[tour_360[i].tour_id] = {
        ...titleAuthor,
        hfov: 110,
        yaw: 5,
        type: "equirectangular",
        panorama: tour_360[i].tour_img,

        ...hotSpots,
      };
    }

    defaultData = defaultData || tour_360[0];

    if (!defaultData || !defaultData.tour_id) return;

    if (!window.pannellum || !tourContainerRef.current) return;

    viewerInstance.current = window.pannellum.viewer(tourContainerRef.current, {
      preview: previewImgUrl,
      autoLoad,
      showFullscreenCtrl: !hideDefaultCtrl,
      showZoomCtrl: !hideDefaultCtrl,
      pitch,
      yaw,
      hfov,
      autoRotate: isRotate ? autoRotateSpeed : 0,
      autoRotateInactivityDelay,
      compass,
      mouseZoom,
      draggable,
      disableKeyboardCtrl,
      doubleClickZoom,
      default: {
        firstScene: defaultData.tour_id,
        sceneFadeDuration: 1000,
      },
      scenes: tour360Scenes,
    });

    if (!autoLoad) {
      setTimeout(() => {
        const loadBtn = tourContainerRef.current?.querySelector(".pnlm-load-button p");
        if (loadBtn) loadBtn.innerHTML = loadButtonText.replace(/\n/g, "<br>");
      }, 120);
    }

    if (!defaultData.tourTitleAuthor || (!defaultData.title && !defaultData.author)) {
      const infoBox = document.querySelector(".pnlm-panorama-info");
      if (infoBox) infoBox.remove();
    }

    if (buttonRef.current && tourContainerRef.current) {
      tourContainerRef.current.appendChild(buttonRef.current);
    }
    return () => {
      viewerInstance.current.destroy();
    };
  }, [
    tour_360,
    previewImgUrl,
    loadButtonText,
    hideDefaultCtrl,
    initialView,
    initialViewPosition,
    autoLoad,
    showFullscreenCtrl,
    showZoomCtrl,
    isRotate,
    autoRotateSpeed,
    autoRotateInactivityDelay,
    compass,
    mouseZoom,
    draggable,
    disableKeyboardCtrl,
    doubleClickZoom,
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
        className="tourContainer" ref={tourContainerRef}
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

export default TourViewer;
