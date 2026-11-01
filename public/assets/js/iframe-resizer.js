window.addEventListener("message", function(event) {
  var data = event.data;
  // Only resize our own embed iframes, and only from the iframe itself.
  if (!data || typeof data !== "object" || !/^panorama_\d+$/.test(String(data.panoramaId))) {
    return;
  }
  var frame = document.getElementById(data.panoramaId);
  if (!frame || frame.contentWindow !== event.source) {
    return;
  }
  var height = parseInt(data.iframeHeight, 10);
  if (height > 0) {
    frame.style.height = height + "px";
  }
});
