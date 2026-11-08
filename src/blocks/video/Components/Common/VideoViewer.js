import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGutenbergDragFix from "../../../../hooks/useGutenbergDragFix";
import { addVolumeControl } from "../../utils/volume";

const VideoViewer = ({ attributes, setAttributes, isButton = true, isBackend = false, isSelected = false }) => {
  const { videoUrl, options = {} } = attributes;

  const {
    autoplay,
    loop,
    muted,
    controlBar,
    fullscreen,
    setting,
    video,
    volume = true,
    defaultVolume = 100,
    initialView,
    initialPosition = {}
  } = options;

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

    const panorama = new PANOLENS.VideoPanorama(videoUrl, {
      autoplay,
      loop,
      muted,
    });

    viewerRef.current = new PANOLENS.Viewer({
      container: videoRef.current,
      controlBar,
      controlButtons,
    });

    viewerRef.current.add(panorama);

    const videoElement = panorama.getVideoElement && panorama.getVideoElement();
    if (videoElement) {
      const level = Number(defaultVolume);
      videoElement.volume = (Number.isFinite(level) ? Math.min(100, Math.max(0, level)) : 100) / 100;
    }
    const removeVolumeControl = controlBar && volume ? addVolumeControl(videoRef.current, videoElement) : () => { };

    if (initialPosition) {
      const { x, y, z } = initialPosition;
      viewerRef.current.camera.position.set(x, y, z);
    }


    if (buttonRef.current && videoRef.current) {
      videoRef.current.appendChild(buttonRef.current);
    }

    return () => {
      removeVolumeControl();
      if (viewerRef.current) {
        viewerRef.current.dispose();
      }
    };

  }, [
    videoUrl,
    autoplay,
    loop,
    muted,
    controlBar,
    setting,
    fullscreen,
    video,
    volume,
    defaultVolume,
    initialView,
  ]);

  useGutenbergDragFix(videoRef, videoRef, isBackend, isSelected);

  const handleSetInitialView = () => {

    try {
      if (viewerRef.current && viewerRef.current.camera) {
        const camera = viewerRef.current.camera;
        const { x, y, z } = camera.position;

        setAttributes({
          options: {
            ...options,
            initialPosition: { x, y, z }
          },
        });
        toast.success("Initial view set successfully", { position: "bottom-center" });
      } else {
        toast.error("VR view not initialized!", { position: "bottom-center" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to set initial view ⚠️", { position: "bottom-center" });
    }
  };

  return (
    <div
      ref={videoRef}
      className="panoramaVideoViewer"
      key={`${videoUrl}-${autoplay}-${loop}-${initialView}-${initialPosition}-${muted}-${controlBar}-${setting}-${fullscreen}-${video}-${volume}-${defaultVolume}`}
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

export default VideoViewer;
