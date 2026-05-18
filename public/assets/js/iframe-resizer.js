window.addEventListener("message", function(event) {
  if (event.data.panoramaId) {
    document.getElementById(event.data.panoramaId).style.height = event.data.iframeHeight + "px";
  }
});