/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/view/videojs-init.js ***!
  \**********************************/
document.addEventListener("DOMContentLoaded", function () {
  var videos = document.querySelectorAll(".bppiv_panorama_video2");
  videos.forEach(function (item) {
    var video = item.querySelector("video");
    var id = video.getAttribute("id");
    var attributes = {};
    try {
      attributes = JSON.parse(item.getAttribute("data-attributes"));
    } catch (error) {
      attributes = {};
    }
    var _attributes = attributes,
      enabledInitialView = _attributes.enabledInitialView,
      initialView = _attributes.initialView;
    var player = window.videojs(id, {
      width: getComputedStyle(item).width || "640",
      controls: true,
      autoplay: false,
      html5: {
        nativeControlsForTouch: false
      }
    });
    player.mediainfo = player.mediainfo || {};
    player.mediainfo.projection = "equirectangular";
    window.player = player;
    var vr = player.vr({
      projection: "AUTO",
      debug: true,
      forceCardboard: false,
      antialias: false
    });
    window.vr = vr;
    player.on("ready", function () {
      if (vr.camera && enabledInitialView === "1") {
        vr.camera.position.setX(initialView.top || 0);
        vr.camera.position.setY(initialView.right || 0);
        vr.camera.position.setZ(initialView.bottom || 1);
      }
    });

    // add a button to get current position of the camera for admin
    var isAdmin = document.getElementById("wp-admin-bar-edit");
    if (isAdmin) {
      var div = document.createElement("div");
      div.classList.add("camera_position_wrapper");
      item.appendChild(div);
      var btn = document.createElement("button");
      btn.innerText = "Get Camera Position";
      div.appendChild(btn);
      var p = document.createElement("p");
      btn.addEventListener("click", function () {
        div.appendChild(p);
        p.innerHTML = "" + JSON.stringify(vr.camera.position) + " <br /> this is only for admin. user can't see this";
        div.appendChild(closeBtn);
      });
      var closeBtn = document.createElement("button");
      closeBtn.classList.add("close");
      closeBtn.innerText = "x";
      closeBtn.addEventListener("click", function () {
        div.removeChild(p);
        div.removeChild(closeBtn);
      });
    }
  });
});
/******/ })()
;
//# sourceMappingURL=videojs-init.js.map