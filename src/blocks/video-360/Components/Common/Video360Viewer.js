import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGutenbergDragFix from "../../../../hooks/useGutenbergDragFix";

const isCrossOrigin = (url) => {
  if (!url) return false;
  try {
    const urlObj = new URL(url, window.location.href);
    return urlObj.origin !== window.location.origin;
  } catch (e) {
    return false;
  }
};

const Video360Viewer = ({ attributes, setAttributes, isButton = true, isBackend = false, isSelected = false }) => {
  const { videoUrl, options } = attributes;
  const { autoplay = true, loop, initialView, initialPosition, play, progress, remainingTime, volume, pip, fullscreen, playbackSpeed } = options || {};

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [videojsLoaded, setVideojsLoaded] = useState(!!window.videojs);

  useEffect(() => {
    if (window.videojs) {
      setVideojsLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (window.videojs) {
        setVideojsLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // iframe detect
  useEffect(() => {
    if (window.self !== window.top) {
      const setIframeHeight = () => {
        const el = document.querySelector(".panoramaVideo360Viewer");
        if (el) {
          el.style.height = window.innerHeight + "px";
        }
      };

      setIframeHeight();
      window.addEventListener("resize", setIframeHeight);

      return () => {
        window.removeEventListener("resize", setIframeHeight);
      };
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || !window.videojs) {
      return;
    }

    // Create the video element dynamically to prevent Video.js from permanently removing it on dispose()
    const videoElement = document.createElement("video");
    videoElement.className = "video-js vjs-default-skin";
    if (isCrossOrigin(videoUrl)) {
      videoElement.setAttribute("crossorigin", "anonymous");
    }
    videoElement.setAttribute("playsinline", "true");
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";

    videoRef.current.appendChild(videoElement);

    const controlBarOptions = [
      ...(play ? ["playToggle"] : []),
      ...(remainingTime ? ["remainingTimeDisplay"] : []),
      ...(progress ? ["progressControl"] : []),
      ...(volume ? ["volumePanel"] : []),
      ...(pip ? ["pictureInPictureToggle"] : []),
      ...(fullscreen ? ["fullscreenToggle"] : []),
      ...(playbackSpeed ? ["playbackRateMenuButton"] : []),
    ];

    playerRef.current = window.videojs(videoElement, {
      autoplay,
      loop,
      muted: autoplay ? true : false,
      controls: true,
      controlBar: { children: controlBarOptions },
      fluid: true,
      aspectRatio: "16:9",
      responsive: true,
      playbackRates: playbackSpeed ? [0.5, 1, 1.5, 2] : [],
      sources: [{
        src: videoUrl,
        type: "video/mp4"
      }]
    });

    const player = playerRef.current;

    player.mediainfo = player.mediainfo || {};
    player.mediainfo.projection = "equirectangular";

    if (typeof player.vr === "function") {
      player.vr({
        projection: "AUTO",
        debug: true,
        forceCardboard: false,
        antialias: false,
      });
    }

    player.on("loadedmetadata", function () {
      const videoEl = player.el().querySelector("video");

      if (videoEl) {
        const videoHeight = videoEl.videoHeight;
        const videoWidth = videoEl.videoWidth;

        if (videoHeight && videoWidth) {
          const ratio = videoHeight / videoWidth;

          const container = player.el().closest(".panoramaVideo360Viewer");

          if (container && container.offsetWidth) {
            const containerWidth = container.offsetWidth;
            container.style.height = containerWidth * ratio + "px";
          }
        }
      }
      if (player.vr && typeof player.vr === "function" && player.vr() && player.vr().camera && initialPosition) {
        const { x, y, z } = initialPosition;
        player.vr().camera.position.set(x, y, z);
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      if (videoRef.current) {
        videoRef.current.innerHTML = "";
      }
    };
  }, [
    videojsLoaded,
    autoplay,
    videoUrl,
    initialView,
    loop,
    play,
    progress,
    remainingTime,
    volume,
    pip,
    fullscreen,
    playbackSpeed,
  ]);

  useGutenbergDragFix(videoRef, videoRef, isBackend, isSelected);

  const handleSetInitialView = () => {
    try {
      if (playerRef.current && typeof playerRef.current.vr === "function" && playerRef.current.vr() && playerRef.current.vr().camera) {
        const { x, y, z } = playerRef.current.vr().camera.position;
        setAttributes({
          options: {
            ...options,
            initialPosition: { x, y, z },
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
    <div
      key={`${autoplay}-${videoUrl}-${initialView}-${loop}-${play}-${progress}-${remainingTime}-${volume}-${pip}-${fullscreen}-${playbackSpeed}`}
      className="panoramaVideo360Viewer"
    >
      <ToastContainer />

      {isButton && initialView && (
        <button onClick={handleSetInitialView} className="setInitialViewButton">
          Set as Initial View
        </button>
      )}
      <div
        ref={videoRef}
        className="video-container-wrapper"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Video360Viewer;
