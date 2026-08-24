document.addEventListener("DOMContentLoaded", async () => {
  const panoramas = document.querySelectorAll("#bppiv_product_panorama");


  panoramas.forEach((container) => {
    // get elements
    const summeryElem = document.querySelector(".summary.entry-summary"); // product summery
    if (summeryElem && container.parentElement.classList.contains("woocommerce-product-gallery")) {
      container.style.height = container.offsetWidth > summeryElem.offsetHeight ? `${summeryElem.offsetHeight}px` : `${container.offsetWidth}px`; //`600px`;
    } else {
      container.style.height = `${container.offsetWidth * 0.5}px`;
    }

    const settings = jsonParse(container.dataset.settings) || {};
    const {
      image_src,
      panorama_format_360,
      haov_360,
      vaov_360,
      voffset_360,
      cubemap_front_360,
      cubemap_right_360,
      cubemap_back_360,
      cubemap_left_360,
      cubemap_up_360,
      cubemap_down_360,
      initialView,
      autoRotate,
      title,
      author,
      showControls,
      video_src,
      type,
      video360,
      video_show_controls,
      video_autoplay,
      video_mute,
      video_loop
    } = settings;
    container.removeAttribute("data-settings");

    if (type === "video" && Boolean(parseInt(video360))) {
      const videoeSource = video_src || [];

      const panoramaVideo = new PANOLENS.VideoPanorama(videoeSource, {
        autoplay: Boolean(parseInt(video_autoplay)),
        loop: Boolean(parseInt(video_loop)),
        muted: Boolean(parseInt(video_mute)),
      });

      const panoramaViewer = new PANOLENS.Viewer({
        container,
        controlBar: Boolean(parseInt(video_show_controls)),
      });
      panoramaViewer.add(panoramaVideo);
    } else if (type === "image") {
      const isCubemap = panorama_format_360 === "cubemap";
      const isAllFacesUploaded = Boolean(
        cubemap_front_360 &&
        cubemap_right_360 &&
        cubemap_back_360 &&
        cubemap_left_360 &&
        cubemap_up_360 &&
        cubemap_down_360
      );

      const options = {
        autoLoad: true,
        autoRotate: Boolean(parseInt(autoRotate)),
        pitch: parseInt(initialView?.top || 0),
        yaw: parseInt(initialView?.right || 0),
        hfov: parseInt(initialView?.bottom || 100),
        showControls: Boolean(parseInt(showControls)),
      };

      if (isCubemap && isAllFacesUploaded) {
        options.type = "cubemap";
        options.cubeMap = [
          cubemap_front_360,
          cubemap_right_360,
          cubemap_back_360,
          cubemap_left_360,
          cubemap_up_360,
          cubemap_down_360,
        ];
      } else if (panorama_format_360 === "cylindrical") {
        const currentHaov = parseFloat(haov_360 ?? 360);
        const currentVaov = parseFloat(vaov_360 ?? 180);
        const currentVOffset = parseFloat(voffset_360 ?? 0);
        options.type = "equirectangular";
        options.panorama = image_src;
        options.haov = currentHaov;
        options.vaov = currentVaov;
        options.vOffset = currentVOffset;
        if (currentVaov < 180) {
          options.maxPitch = currentVaov / 2;
          options.minPitch = -currentVaov / 2;
        }
        if (currentHaov < 360) {
          options.maxYaw = currentHaov / 2;
          options.minYaw = -currentHaov / 2;
        }
      } else {
        options.type = "equirectangular";
        options.panorama = image_src;
      }

      if (title) {
        options.title = title;
      }
      if (author) {
        options.author = author;
      }

      const pViewer = pannellum.viewer(container, options);

      const tabBtn = document.querySelector("#tab-title-bppiv_panorama_tab a, .bppiv_panorama_tab_tab a");
      if (tabBtn) {
        tabBtn.addEventListener("click", () => {
          setTimeout(() => {
            if (container.offsetWidth > 0) {
              container.style.height = `${container.offsetWidth * 0.55}px`;
            }
            if (pViewer && typeof pViewer.resize === "function") {
              pViewer.resize();
            }
            window.dispatchEvent(new Event("resize"));
          }, 150);
        });
      }
    }
  });
});

function jsonParse(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.warn(error.message);
  }
}

const getMeta = (url, cb) => {
  const img = new Image();
  img.onload = () => cb(null, img);
  img.onerror = (err) => cb(err);
  img.src = url;
};
