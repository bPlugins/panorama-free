document.addEventListener("DOMContentLoaded", function () {
  const panoramas = document.querySelectorAll(".panorama-lite-wrapper");
  panoramas.forEach((wrapper) => {
    panoramaRenderer(wrapper);
  });
});

function panoramaRenderer(wrapper, params) {
  const modal = wrapper.querySelector(".modal");
  const content = wrapper.querySelector(".content");
  const closeBtn = wrapper.querySelector(".close");
  const nextBtn = wrapper.querySelector(".next svg");
  const prevBtn = wrapper.querySelector(".prev svg");

  const panorama = params?.element || wrapper.querySelector("#panorama");
  const { options, scenes, controls } = params || JSON.parse(wrapper?.dataset?.panorama || "{}");
  wrapper?.removeAttribute("data-panorama");
  options.default.firstScene = options?.default?.firstScene?.toString() || "0";

  const newScenes = Object.keys(scenes).map((key) => {
    scenes[key].hotSpots.map((item) => {
      if (item?.popup && item.type === "info") {
        item["clickHandlerFunc"] = (element, obj) => {
          const { enabled, text } = obj;
          if (enabled) {
            content.innerHTML = text;
            modal.style.display = "block";
            closeBtn.addEventListener("click", () => {
              modal.style.display = "none";
            });
          }
        };
        return item;
      } else {
        return item;
      }
    });
    return scenes[key];
  });

  const viewer = pannellum.viewer(panorama, {
    ...options,
    scenes: newScenes,
  });

  window.viewer = viewer;

  // next prev button
  if (nextBtn && prevBtn) {
    viewer.on("load", function () {
      const currentScene = parseInt(viewer.getScene());
      if (newScenes.length === currentScene + 1) {
        nextBtn.style.opacity = 0.5;
      } else {
        nextBtn.style.opacity = 1;
      }
      if (currentScene === 0) {
        prevBtn.style.opacity = 0.5;
      } else {
        prevBtn.style.opacity = 1;
      }
    });

    nextBtn?.addEventListener("click", function () {
      const currentScene = parseInt(viewer.getScene());
      if (newScenes.length > currentScene + 1) {
        viewer.loadScene(currentScene + 1);
      }
    });

    prevBtn?.addEventListener("click", function () {
      const currentScene = parseInt(viewer.getScene());
      if (currentScene > 0) {
        viewer.loadScene(currentScene - 1);
      }
    });
  }

  const controlsElement = wrapper.querySelector("#controls");
  if (controlsElement) {
    Object.keys(controls).map((key) => {
      if (controls[key]) {
        const div = document.createElement("div");
        div.classList.add("ctrl");
        div.innerHTML = controlIcons[key];
        controlsElement.append(div);
        div.addEventListener("click", function () {
          key === "moveUp" && viewer.setPitch(viewer.getPitch() + 10);
          key === "moveDown" && viewer.setPitch(viewer.getPitch() - 10);
          key === "moveLeft" && viewer.setYaw(viewer.getYaw() - 10);
          key === "moveRight" && viewer.setYaw(viewer.getYaw() + 10);
          key === "zoomIn" && viewer.setHfov(viewer.getHfov() - 10);
          key === "zoomOut" && viewer.setHfov(viewer.getHfov() + 10);
          key === "fullscreen" && viewer.toggleFullscreen();
        });
      }
    });
  }

  return viewer;
}

export const controlIcons = {
  moveUp: "&#9650;",
  moveDown: "&#9660;",
  moveLeft: "&#9664;",
  moveRight: "&#9654;",
  zoomIn: "&plus;",
  zoomOut: "&minus;",
  fullscreen: "&#x2922;",
};

window.panoramaRenderer = panoramaRenderer;
