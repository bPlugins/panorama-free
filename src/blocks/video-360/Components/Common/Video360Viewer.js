import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Video360Viewer = ({ attributes, setAttributes, isButton = true }) => {
  const { videoUrl, options } = attributes;
  const { autoplay = true, loop, initialView, initialPosition, play, progress, remainingTime, volume, pip, fullscreen, playbackSpeed } = options || {};

  const videoRef = useRef(null);
  const playerRef = useRef(null);

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
      console.log("videojs is not loaded");
      return;
    }

    const controlBarOptions = [
      ...(play ? ["playToggle"] : []),
      ...(remainingTime ? ["remainingTimeDisplay"] : []),
      ...(progress ? ["progressControl"] : []),
      ...(volume ? ["volumePanel"] : []),
      ...(pip ? ["pictureInPictureToggle"] : []),
      ...(fullscreen ? ["fullscreenToggle"] : []),
      ...(playbackSpeed ? ["playbackRateMenuButton"] : []),
    ];

    playerRef.current = window.videojs(videoRef.current, {
      autoplay,
      loop,
      muted: autoplay ? true : false,
      initialView,
      controls: true,
      controlBar: { children: controlBarOptions },
      fluid: true,
      aspectRatio: "16:9",
      responsive: true,
      playbackRates: playbackSpeed ? [0.5, 1, 1.5, 2] : [],
      plugins: {
        vr: {
          projection: "360"
        }
      },
    });

    const player = playerRef.current;

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
      if (player.vr && initialPosition) {
        const { x, y, z } = initialPosition;
        player.vr().camera.position.set(x, y, z);
      }
    });


    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [
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

  const handleSetInitialView = () => {
    try {
      if (playerRef.current && playerRef.current.vr) {
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
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        crossOrigin="anonymous"
        playsInline
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video360Viewer;
