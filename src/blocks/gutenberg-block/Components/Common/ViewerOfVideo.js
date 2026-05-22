import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGutenbergDragFix from "../../../../hooks/useGutenbergDragFix";

const ViewerOfVideo = ({ attributes, setAttributes, isButton = false, isBackend = false, isSelected = false }) => {
  const { panoVideo, hideControl, initialView, initialPosition = {}, autoPlay, videoMute, videoLoop, fullscreen, setting, video } = attributes;

  const { url } = panoVideo || {};

  const videoRef = useRef(null);
  const viewerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const { PANOLENS, THREE } = window;

    if (!PANOLENS || !THREE) return;

    const controlButtons = [
      ...(fullscreen ? ["fullscreen"] : []),
      ...(setting ? ["setting"] : []),
      ...(video ? ["video"] : []),
    ];

    const panorama = new PANOLENS.VideoPanorama(url,
      {
        autoplay: autoPlay,
        loop: videoLoop,
        muted: videoMute,
      }
    );

    viewerRef.current = new PANOLENS.Viewer({
      container: videoRef.current,
      controlBar: hideControl,
      controlButtons,
    });

    viewerRef.current.add(panorama);

    if (initialPosition) {
      const { x, y, z } = initialPosition;
      viewerRef.current.camera.position.set(x, y, z);
    }

    if (buttonRef.current && videoRef.current) {
      videoRef.current.appendChild(buttonRef.current);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.dispose();
      }
    };
  }, [
    url,
    hideControl,
    initialView,
    initialPosition,
    autoPlay,
    videoMute,
    videoLoop,
    fullscreen,
    setting,
    video,
  ]);

  useGutenbergDragFix(videoRef, videoRef, isBackend, isSelected);

  const handleSetInitialView = () => {
    try {
      if (viewerRef.current && viewerRef.current.camera) {
        const camera = viewerRef.current.camera;
        const { x, y, z } = camera.position;

        setAttributes({
          initialPosition: { x, y, z }
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
    <div
      ref={videoRef}
      className="bpgbPanorama"
      key={`${url}-${autoPlay}-${videoLoop}-${initialView}-${initialPosition}-${videoMute}-${hideControl}-${setting}-${fullscreen}-${video}`}
    >
      <ToastContainer />

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
  );
};

export default ViewerOfVideo;
