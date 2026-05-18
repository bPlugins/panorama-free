export const config = (attributes, containerEl) => {
  const {
    panoType,
    panoImage,
    panoVideo,
    autoRotate,
    rotateSpeed,
    autoRotateInactivityDelay,
    hideControl,
    autoPlay,
    videoMute,
    videoLoop,
    fullscreen,
    setting,
    video,
  } = attributes;

  let viewer;

  if (panoType === "video") {
    const videoSource = panoVideo.url || "";

    const controlButtons = [
      ...(fullscreen ? ["fullscreen"] : []),
      ...(setting ? ["setting"] : []),
      ...(video ? ["video"] : []),
    ];

    const panoramaVideo = new PANOLENS.VideoPanorama(videoSource, {
      autoplay: autoPlay,
      loop: videoLoop,
      muted: videoMute,
    });

    viewer = new PANOLENS.Viewer({
      container: containerEl,
      controlBar: hideControl,
      controlButtons,
    });

    viewer.add(panoramaVideo);
  } else {
    const imageSource = panoImage.url || [];
    const panorama = new PANOLENS.ImagePanorama(imageSource);

    viewer = new PANOLENS.Viewer({
      container: containerEl,
      autoRotate,
      autoRotateSpeed: rotateSpeed,
      autoRotateActivationDuration: autoRotateInactivityDelay,
      controlBar: hideControl,
    });

    viewer.add(panorama);
  }

  return viewer;
};
