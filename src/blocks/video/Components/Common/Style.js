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

