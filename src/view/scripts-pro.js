(function ($) {
  $(document).ready(function () {
    const panoContainer = document.querySelectorAll(".bppiv_panorama");
    Object.values(panoContainer).map((item) => {
      const settings = $(item).data("settings");
      const bppivType = settings.bppiv_type;
      const {
        bppiv_type,
        bppiv_image_src,
        bppiv_video_src,
        bppiv_auto_play,
        bppiv_video_mute,
        bppiv_video_loop,
        control_show_hide_video,
        image_src_360,
        bppiv_auto_rotate,
        bppiv_speed,
        bppiv_auto_load,
        control_show_hide,
        draggable_360,
        compass_360,
        title_author,
        title_360,
        author_360,
        initial_view,
        initial_view_property: viewProperty,
        custom_control,
        initial_view_video_property,
        tour_360,
      } = settings;
      // All Type options
      if (bppivType === "video") {
        const videoeSource = bppiv_video_src ? bppiv_video_src.url : [];
        const isAutoPlay = Boolean(parseInt(bppiv_auto_play));
        const isVideoMute = Boolean(parseInt(bppiv_video_mute));
        const isVideoLoop = Boolean(parseInt(bppiv_video_loop));
        const isHideControl = Boolean(parseInt(control_show_hide_video)) != true;

        const panoramaVideo = new PANOLENS.VideoPanorama(videoeSource, {
          autoplay: isAutoPlay,
          loop: isVideoLoop,
          muted: isVideoMute, 
        });

        const panoramaViewer = new PANOLENS.Viewer({
          container: item,
          controlBar: isHideControl,
          initialLookAt: new THREE.Vector3(2, 2, -Number.MAX_SAFE_INTEGER),
        });

        panoramaViewer.add(panoramaVideo);
        window.panoramaViewer = panoramaViewer;
        window.panoramaVideo = panoramaVideo;

        panoramaVideo.addEventListener("enter", function () {
          panoramaViewer.camera.position.setX(initial_view_video_property?.top || 0);
          panoramaViewer.camera.position.setY(initial_view_video_property?.right || 0);
          panoramaViewer.camera.position.setZ(initial_view_video_property?.bottom || 1);
        });

        getCameraPositionDom(panoramaVideo.container, panoramaViewer);

      }
      // Gallery
      else if (bppivType === "gallery") {
        var galleryContainer, photo, panoramaContainer, mainContainer, closeButton, viewer, panorama, progress, badge;
        let limit = parseInt(settings?.bppiv_gallery_limit);
        let loadMore = 3;
        let gallery_src_arr = settings.bppiv_pan_gallery;
        let items = gallery_src_arr.slice(0, limit);


        galleryContainer = document.getElementById("gallery-container");
        panoramaContainer = document.getElementById("panorama-container");
        mainContainer = document.getElementById("bppiv-main-container");
        let progressBar = document.getElementById("bppiv-progress-bar");
        closeButton = panoramaContainer.querySelector(".close");

        const buildGallery = (items) => {
          items.map(function (val) {
            let url = val?.panoramic_img?.url;

            photo = document.createElement("div");
            badge = document.createElement("span");
            photo.style.backgroundImage = "url(" + url + ")";

            photo.classList.add("photo");
            badge.classList.add("item-badge");
            badge.innerHTML = "Video";
            
            if (val?.gal_type_cheek === "1") {
              photo.appendChild(badge);
              photo.url = val?.gal_type_video?.url;
              photo.type = "video";
            } else {
              photo.url = url;
              photo.type = "image";
            }

            photo.initialView = Boolean(parseInt(val?.initial_view));
            photo.initialPosition = val?.initial_view_image_property;

            photo.addEventListener(
              "click",
              function () {
              
                if (panorama) {
                  return;
                }
                
                if (this.type === "image") {
                  panorama = new PANOLENS.ImagePanorama(this.url);
                } else if (this.type === "video") {
                  panorama = new PANOLENS.VideoPanorama(this.url, {
                    autoplay: true,
                  });
                } else {
                  return;
                }

                panorama.addEventListener("progress", function (event) {
                  progress = (event.progress.loaded / event.progress.total) * 100;

                  progressBar.style.width = progress + "%";

                  if (progress === 100) {
                    progressBar.style.opacity = 0;
                  }
                });
                viewer.add(panorama);

                if (this.initialView && this.initialPosition) {
                  panorama.addEventListener("enter", () => {
                    viewer.camera.position.set(
                      parseFloat(this.initialPosition.top || 0),
                      parseFloat(this.initialPosition.right || 0),
                      parseFloat(this.initialPosition.bottom || 0)
                    );
                  });
                }

                panoramaContainer.classList.add("open");
              },
              false
            );

            galleryContainer.appendChild(photo);
          });
          galleryContainer.classList.add('bppiv_panorama')
        };

       
        $(".pan_loadMore").on("click", function () {
          items = gallery_src_arr.slice(limit, limit + loadMore);
          limit += loadMore;
          
          buildGallery(items);
          
          if (limit >= gallery_src_arr.length) {
            this.style.display = "none";
          }
        });

        const setupPanolens = () => {
          viewer = new PANOLENS.Viewer({ container: mainContainer });
        };

        const disposePanorama = () => {
          panorama.dispose();
          viewer.remove(panorama);
          panorama = null;
        };

        const init = () => {
          buildGallery(items);

          setupPanolens();
          
          closeButton.addEventListener("click",function () {
              disposePanorama();

              progressBar.style.width = 0;
              progressBar.style.opacity = 1;

              panoramaContainer.classList.remove("open");
            },
            false
          );
        };

        init();
      } else if (bppivType === "gstreet") {
        panorama = new PANOLENS.GoogleStreetviewPanorama(`${settings.bppiv_pano_id}`);

        viewer = new PANOLENS.Viewer({
          container: item,
          initialLookAt: new THREE.Vector3(2953.93, 1891.55, 5213.46),
        });
        viewer.add(panorama);

        // Specific target (panorama) to be updated every frame
        viewer.addUpdateCallback(function () {
          panorama.rotation.y += 0.005;
        });
      } else if (bppiv_type === "image360") {
        const image360 = image_src_360 ?? "";
        const isAutoRotate = Boolean(parseInt(bppiv_auto_rotate));
        const rotateSpeed = isAutoRotate ? bppiv_speed : 0;
        const autoLoad = Boolean(parseInt(bppiv_auto_load));
        const isHideControl = Boolean(parseInt(control_show_hide)) != true;
        const isDraggable = Boolean(parseInt(draggable_360));
        const titleAuthor = title_author ?? 0;
        const compass360 = Boolean(parseInt(compass_360));
        const initialView =
          (Boolean(parseInt(initial_view)) && {
            pitch: parseFloat(viewProperty.top),
            yaw: parseFloat(viewProperty.right),
            hfov: parseFloat(200),
          }) ||
          {};

        // console.log(viewProperty);

        // container id
        const panoId = $(item).attr("id");

        const titleAuthorOptions = titleAuthor === "1" ? { title: title_360, author: author_360 } : {};
        viewer = pannellum.viewer(panoId, {
          type: "equirectangular",
          panorama: image360,
          preview: image360,
          autoLoad,
          autoRotate: rotateSpeed,
          draggable: isDraggable,
          showControls: isHideControl,
          compass: compass360,
          //northOffset: -160.5,
          orientationOnByDefault: false,
          ...titleAuthorOptions,
          ...initialView,
        });

        // Make buttons work
        Boolean(parseInt(custom_control)) &&
          (document.getElementById("pan-up").addEventListener("click", function () {
            viewer.setPitch(viewer.getPitch() + 10);
          }),
          document.getElementById("pan-down").addEventListener("click", function () {
            viewer.setPitch(viewer.getPitch() - 10);
          }),
          document.getElementById("pan-left").addEventListener("click", function () {
            viewer.setYaw(viewer.getYaw() - 10);
          }),
          document.getElementById("pan-right").addEventListener("click", function () {
            viewer.setYaw(viewer.getYaw() + 10);
          }),
          document.getElementById("zoom-in").addEventListener("click", function () {
            viewer.setHfov(viewer.getHfov() - 10);
          }),
          document.getElementById("zoom-out").addEventListener("click", function () {
            viewer.setHfov(viewer.getHfov() + 10);
          }),
          document.getElementById("fullscreen").addEventListener("click", function () {
            viewer.toggleFullscreen();
          }));
      } else if (bppiv_type === "tour360") {
        // container id
        const tourId = $(item).attr("id");
        let tour360Scenes = {};
        let defaultData = null;

        for (let i = 0; i < tour_360.length; i++) {
          let titleAuthor =
            (tour_360[i]?.tourTitleAuthor === "1" && {
              title: tour_360[i].title,
              author: tour_360[i].author,
            }) ||
            {};

          let hotSpots =
            (tour_360[i]?.tour_hotSpot === "1" && {
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
          if (tour_360[i]?.default_data === "1") {
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
        pannellum.viewer(tourId, {
          autoLoad: true,
          default: {
            firstScene: defaultData?.tour_id,
            sceneFadeDuration: 1000,
          },
          scenes: tour360Scenes,
        });
      } else {
        const imageSource = bppiv_image_src ? bppiv_image_src.url : [];
        const isAutoRotate = Boolean(parseInt(bppiv_auto_rotate));
        const autoRotateSpeed = bppiv_speed ? bppiv_speed : 2;
        const isHideControl = Boolean(parseInt(control_show_hide)) != true;

        const panorama = new PANOLENS.ImagePanorama(imageSource);
        const viewer = new PANOLENS.Viewer({
          container: item,
          autoRotate: isAutoRotate,
          autoRotateSpeed: parseFloat(autoRotateSpeed),
          controlBar: isHideControl,
        });
        viewer.add(panorama);
      }
    });
  });
})(jQuery);

function getCameraPositionDom(video, vr) {
  // add a button to get current position of the camera for admin
  const isAdmin = document.getElementById("wp-admin-bar-edit");

  console.log("hiii");

  // console.log(first);
  // window.position = position;
  // window.modifiedPosition = modifiedPosition;
  if (isAdmin) {
    const div = document.createElement("div");
    div.classList.add("camera_position_wrapper");
    video.appendChild(div);
    const btn = document.createElement("button");
    btn.innerText = "Get Camera Position";
    div.appendChild(btn);
    const p = document.createElement("p");
    btn.addEventListener("click", function () {
      const modifiedPosition = {
        x: vr.camera.position.x.toFixed(2),
        y: vr.camera.position.y.toFixed(2),
        z: vr.camera.position.z.toFixed(2),
      };
      div.appendChild(p);
      p.innerHTML = "" + JSON.stringify(modifiedPosition) + " <br /> <b>this is only for admin. user can't see this</b>";
      div.appendChild(closeBtn);
    });

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("camera_close");
    closeBtn.innerText = "x";
    closeBtn.addEventListener("click", () => {
      div.removeChild(p);
      div.removeChild(closeBtn);
    });
  }
}