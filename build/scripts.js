/******/ (() => { // webpackBootstrap
/*!*****************************!*\
  !*** ./src/view/scripts.js ***!
  \*****************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function ($) {
  $(document).ready(function () {
    var panoContainer = document.querySelectorAll(".bppiv_panorama");
    Object.values(panoContainer).map(function (item) {
      var settings = $(item).data("settings");
      $(item).removeAttr("data-settings");
      var bppiv_type = settings.bppiv_type,
        bppiv_image_src = settings.bppiv_image_src,
        bppiv_video_src = settings.bppiv_video_src,
        bppiv_auto_play = settings.bppiv_auto_play,
        bppiv_video_mute = settings.bppiv_video_mute,
        bppiv_video_loop = settings.bppiv_video_loop,
        image_src_360 = settings.image_src_360,
        bppiv_auto_rotate = settings.bppiv_auto_rotate,
        bppiv_speed = settings.bppiv_speed,
        bppiv_auto_load = settings.bppiv_auto_load,
        control_show_hide = settings.control_show_hide,
        draggable_360 = settings.draggable_360,
        compass_360 = settings.compass_360,
        title_author = settings.title_author,
        title_360 = settings.title_360,
        author_360 = settings.author_360,
        initial_view = settings.initial_view,
        viewProperty = settings.initial_view_property;

      //Video options
      if (bppiv_type === "video") {
        var videoeSource = bppiv_video_src ? bppiv_video_src.url : [];
        var isAutoPlay = Boolean(parseInt(bppiv_auto_play));
        var isVideoMute = Boolean(parseInt(bppiv_video_mute));
        var isVideoLoop = Boolean(parseInt(bppiv_video_loop));
        var isHideControl = Boolean(parseInt(bppiv_video_loop)) !== true;
        var panoramaVideo = new PANOLENS.VideoPanorama(videoeSource, {
          autoplay: isAutoPlay,
          loop: isVideoLoop,
          muted: isVideoMute
        });
        var panoramaViewer = new PANOLENS.Viewer({
          container: item,
          controlBar: isHideControl
        });
        panoramaViewer.add(panoramaVideo);

        //Image360 options
      } else if (bppiv_type === "image360") {
        var image360 = image_src_360 !== null && image_src_360 !== void 0 ? image_src_360 : "";
        var isAutoRotate = Boolean(parseInt(bppiv_auto_rotate));
        var rotateSpeed = isAutoRotate ? bppiv_speed : 0;
        var autoLoad = Boolean(parseInt(bppiv_auto_load));
        var _isHideControl = Boolean(parseInt(control_show_hide)) != true;
        var isDraggable = Boolean(parseInt(draggable_360));
        var titleAuthor = title_author !== null && title_author !== void 0 ? title_author : 0;
        var compass360 = Boolean(parseInt(compass_360));
        var initialView = Boolean(parseInt(initial_view)) && {
          pitch: parseFloat(viewProperty.top),
          yaw: parseFloat(viewProperty.right),
          hfov: parseFloat(viewProperty.bottom)
        } || {};

        // default value of viewProperty
        //  'top'    => 2.3,
        // 'right'  => -360.4,
        // 'bottom' => 100,

        // container id
        var panoId = $(item).attr("id");
        var titleAuthorOptions = titleAuthor === "1" ? {
          title: title_360,
          author: author_360
        } : {};
        pannellum.viewer(panoId, _objectSpread(_objectSpread({
          type: "equirectangular",
          panorama: image360,
          preview: image360,
          autoLoad: autoLoad,
          autoRotate: rotateSpeed,
          draggable: isDraggable,
          showControls: _isHideControl,
          compass: compass360,
          //northOffset: -160.5,
          orientationOnByDefault: true
        }, titleAuthorOptions), initialView));
      } else {
        var imageSource = bppiv_image_src ? bppiv_image_src.url : [];
        var _isAutoRotate = Boolean(parseInt(bppiv_auto_rotate));
        var autoRotateSpeed = bppiv_speed ? bppiv_speed : 2;
        var _isHideControl2 = Boolean(parseInt(control_show_hide)) != true;
        var panorama = new PANOLENS.ImagePanorama(imageSource);
        var viewer = new PANOLENS.Viewer({
          container: item,
          autoRotate: _isAutoRotate,
          autoRotateSpeed: parseFloat(autoRotateSpeed),
          controlBar: _isHideControl2
        });
        viewer.add(panorama);
      }
    });
  });
})(jQuery);
/******/ })()
;
//# sourceMappingURL=scripts.js.map