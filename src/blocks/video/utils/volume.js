import { __ } from "@wordpress/i18n";

const icon = (paths) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>${paths}</svg>`;
const ICONS = {
  muted: icon('<line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>'),
  low: icon('<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>'),
  high: icon('<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>'),
};

// Panolens has no volume control: a mute button and a slider, added to its control bar
// next to the progress bar (or at the end of the bar when that is hidden).
export const addVolumeControl = (container, video) => {
  const bar = container && container.querySelector('div[style*="translateY(-100%)"]');
  if (!bar || !video) {
    return () => { };
  }
  const group = bar.querySelector(':scope > span:not([style*="cursor"]):not([style*="position: fixed"])');

  const wrap = document.createElement("span");
  wrap.className = "bppiv-video-volume";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "bppiv-video-volume__button";

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "1";
  slider.step = "0.05";
  slider.className = "bppiv-video-volume__slider";
  slider.setAttribute("aria-label", __("Volume", "panorama"));

  let lastVolume = video.volume || 1;

  const sync = () => {
    const level = video.muted ? 0 : video.volume;
    slider.value = String(level);
    slider.style.setProperty("--bppiv-volume", `${Math.round(level * 100)}%`);
    button.innerHTML = 0 === level ? ICONS.muted : level < 0.5 ? ICONS.low : ICONS.high;
    button.setAttribute("aria-label", 0 === level ? __("Unmute", "panorama") : __("Mute", "panorama"));
  };

  button.addEventListener("click", () => {
    if (video.muted || 0 === video.volume) {
      video.muted = false;
      video.volume = lastVolume || 1;
    } else {
      lastVolume = video.volume;
      video.muted = true;
    }
  });

  slider.addEventListener("input", () => {
    const level = parseFloat(slider.value);
    video.volume = level;
    video.muted = 0 === level;
    if (level > 0) {
      lastVolume = level;
    }
  });

  // Keep clicks and drags here from reaching the viewer (camera drag, play/pause on tap).
  ["mousedown", "mouseup", "pointerdown", "pointerup", "touchstart", "touchend", "click", "dblclick", "wheel"].forEach((type) => {
    wrap.addEventListener(type, (event) => event.stopPropagation());
  });

  video.addEventListener("volumechange", sync);
  wrap.append(button, slider);
  (group || bar).appendChild(wrap);
  sync();

  return () => {
    video.removeEventListener("volumechange", sync);
    wrap.remove();
  };
};
