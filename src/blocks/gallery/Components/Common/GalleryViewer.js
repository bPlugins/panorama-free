import { useEffect, useRef, useState } from "react";
import { closeIcon } from "../../utils/icons";
import "./../../../../../public/assets/css/style.css";
import { produce } from "immer";
import { __ } from "@wordpress/i18n";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GalleryViewer = ({ attributes, setAttributes, isButton = false }) => {
  const galleryContainerRef = useRef(null);
  const panoramaContainerRef = useRef(null);
  const mainContainerRef = useRef(null);

  const viewerRef = useRef(null);
  const panoramaRef = useRef(null);

  const { galleries = [], galleryLimit = 2, gap, loadMoreBtn = {} } = attributes || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  const totalPages = Math.ceil(galleries.length / galleryLimit);
  const currentItems = galleries.slice(0, currentPage * galleryLimit);

  // Open Panorama (Image / Video)
  const openPanorama = (item, index) => {
    const { PANOLENS } = window;
    if (!PANOLENS || !mainContainerRef.current) return;

    setCurrentItemIndex(index);

    // Clean previous viewer
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
      panoramaRef.current = null;
      mainContainerRef.current.innerHTML = "";
    }

    viewerRef.current = new PANOLENS.Viewer({
      container: mainContainerRef.current,
    });

    panoramaRef.current = item.isSetVideo
      ? new PANOLENS.VideoPanorama(item.video, { autoplay: true, muted: false })
      : new PANOLENS.ImagePanorama(item.img);

    viewerRef.current.add(panoramaRef.current);

    // Apply initial view and zoom
    const zoomLevel = item.fov || item.initialPosition?.fov || 85;
    viewerRef.current.camera.fov = zoomLevel;
    viewerRef.current.camera.updateProjectionMatrix();

    if (item.initialPosition) {
      const { x, y, z } = item.initialPosition;
      viewerRef.current.camera.position.set(x, y, z);
    }

    panoramaContainerRef.current.classList.add("open");
  };

  // Sync FOV changes from slider in real-time
  useEffect(() => {
    if (viewerRef.current && viewerRef.current.camera && currentItemIndex !== null && galleries[currentItemIndex]) {
      const currentFov = galleries[currentItemIndex].fov || 85;
      if (viewerRef.current.camera.fov !== currentFov) {
        viewerRef.current.camera.fov = currentFov;
        viewerRef.current.camera.updateProjectionMatrix();
      }
    }
  }, [galleries, currentItemIndex]);

  // Close Panorama
  const closePanorama = () => {
    panoramaContainerRef.current.classList.remove("open");
    setCurrentItemIndex(null);

    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
      panoramaRef.current = null;
      mainContainerRef.current.innerHTML = "";
    }
  };

  const handleSetInitialView = () => {
    if (viewerRef.current && viewerRef.current.camera && currentItemIndex !== null) {
      const camera = viewerRef.current.camera;
      const { x, y, z } = camera.position;
      const fov = camera.fov;

      const newGalleries = produce(galleries, (draft) => {
        draft[currentItemIndex].initialPosition = { x, y, z, fov };
        draft[currentItemIndex].fov = fov; // Update the slider attribute too
      });

      setAttributes({ galleries: newGalleries });
      toast.success("Initial view and zoom set successfully for this gallery item!", { position: "bottom-center" });
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Gallery Grid */}
      <div
        ref={galleryContainerRef}
        id="gallery-container"
        className="galleryCon"
        style={{ display: "grid", gap }}
      >
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="photo"
            style={{ backgroundImage: `url(${item.img})` }}
            onClick={() => openPanorama(item, (currentPage - 1) * galleryLimit + index)}
          >
            {item.isSetVideo && (
              <span className="item-badge">Video</span>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      {galleries.length > currentPage * galleryLimit && (
        <div className="pagination-controls">
          <button
            className="pan_loadMore"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {loadMoreBtn?.text || "Load More"}
          </button>
        </div>
      )}

      {/* Panorama Popup */}
      <div
        ref={panoramaContainerRef}
        id="panorama-container"
        className="bppiv_panorama"
        style={{ width: "100%" }}
      >
        <div className="close">
          {isButton && galleries[currentItemIndex]?.initialView && (
            <button
              style={{
                position: "absolute",
                top: "5px",
                right: "60px",
                padding: "5px 10px",
                background: "#007cba",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "16px",
                width: "150px",
                textAlign: "center",

              }}
              onClick={handleSetInitialView}
            >
              {__("Set as Initial View", "panorama")}
            </button>
          )}
          <p className="close-icon" onClick={closePanorama}>
            {closeIcon}
          </p>
        </div>

        <div id="bppiv-main-container" ref={mainContainerRef} />
      </div>
    </>
  );
};

export default GalleryViewer;
