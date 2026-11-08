import { sanitizeStyleAttributes } from '../../../../utils/sanitize';
import { isEmbedFrame } from '../../../../utils/embed';

const Style = ({ attributes: rawAttributes, id, device = "desktop" }) => {
  const attributes = sanitizeStyleAttributes(rawAttributes);
  let { alignSl, width, height} = attributes.layout || {};

   if (isEmbedFrame()) {
    height = {
      ...height,
      desktop: window.innerHeight + 'px',
      tablet: window.innerHeight + 'px',
    }
   }

  const mainSl = `#${id}`;
  const blockSl = `${mainSl} .bBlocksVideoViewer`;
  const videoSl = `${blockSl} .panoramaVideoViewer`;
  // Panolens control bar (it has no classes): pinned to the bottom of the viewer, the play
  // button and a progress bar that fills the free space on the left, buttons on the right.
  const barSl = `${videoSl} > div[style*="translateY(-100%)"]`;
  const groupSl = `${barSl} > span:not([style*="cursor"]):not([style*="position: fixed"])`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

		${blockSl}{
			align-items: ${alignSl[device]};
		}

		${videoSl}{
			width: ${width[device]};
			height: ${height[device]};
		}

		${videoSl}{
			position: relative;
			overflow: hidden;
		}

		${barSl}{
			position: absolute !important;
			left: 0;
			bottom: 0;
			float: none !important;
			transform: translateY(0) !important; /* keeps the settings menu (position: fixed) inside the bar */
			display: flex !important;
			flex-direction: row-reverse; /* the buttons keep Panolens' order: fullscreen on the far right */
			align-items: center;
			height: 48px !important;
			padding: 0 6px;
			box-sizing: border-box;
			background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)) !important;
		}

		${barSl} > span[style]:not([style*="position: fixed"]){
			float: none !important;
			flex: none;
			height: 100% !important;
		}

		${groupSl}{
			order: 99;
			display: flex;
			align-items: center;
			flex: 1 1 auto;
			min-width: 0;
			height: 100%;
		}

		${groupSl} > span{
			float: none !important;
			flex: none;
		}

		${videoSl} .bppiv-video-volume{
			display: flex;
			align-items: center;
			flex: none;
			height: 100%;
			margin-right: 6px;
			pointer-events: auto;
		}

		${videoSl} .bppiv-video-volume__button{
			display: flex !important;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 100%;
			margin: 0 !important;
			padding: 0 !important;
			border: 0 !important;
			background: transparent !important;
			box-shadow: none !important;
			color: #fff !important;
			cursor: pointer;
		}

		${videoSl} .bppiv-video-volume__button:focus,
		${videoSl} .bppiv-video-volume__slider:focus{
			outline: none !important;
		}

		${videoSl} .bppiv-video-volume__button:focus-visible,
		${videoSl} .bppiv-video-volume__slider:focus-visible{
			outline: 2px solid #fff !important;
			outline-offset: 2px;
		}

		${videoSl} .bppiv-video-volume__slider{
			-webkit-appearance: none;
			appearance: none;
			width: 72px;
			height: 4px;
			margin: 0 !important;
			padding: 0;
			border: 0;
			border-radius: 2px;
			background: linear-gradient(to right, #fff var(--bppiv-volume, 100%), rgba(255, 255, 255, 0.35) var(--bppiv-volume, 100%));
			cursor: pointer;
			outline: none;
		}

		${videoSl} .bppiv-video-volume__slider::-webkit-slider-thumb{
			-webkit-appearance: none;
			width: 12px;
			height: 12px;
			border: 0;
			border-radius: 50%;
			background: #fff;
		}

		${videoSl} .bppiv-video-volume__slider::-moz-range-thumb{
			width: 12px;
			height: 12px;
			border: 0;
			border-radius: 50%;
			background: #fff;
		}

		${groupSl} > span:nth-child(2){
			flex: 1 1 auto;
			width: auto !important;
			margin: 0 16px 0 4px !important;
			background-color: rgba(255, 255, 255, 0.35) !important;
		}

		@media only screen and (min-width:641px) and (max-width: 1024px){
			${blockSl}{
				align-items: ${alignSl.tablet};
			}

			${videoSl}{
				width: ${width.tablet};
				height: ${height.tablet};
				
			}
		}

		@media only screen and (max-width:640px){
			${blockSl}{
				align-items: ${alignSl.mobile};
			}

			${videoSl}{
				width: ${width.mobile};
				height: ${height.mobile};
			}
		}
	`,
      }}
    />
  );
};
export default Style;

