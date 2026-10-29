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
  const blockSl = `${mainSl} .bBlocksGoogleStreetViewer`;
  const googleStreetSl = `${blockSl} .panoramaGoogleStreetViewer`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

		${blockSl}{
			align-items: ${alignSl[device]};
		}

		${googleStreetSl}{
			width: ${width[device]};
			height: ${height[device]};
		}


		@media only screen and (min-width:641px) and (max-width: 1024px){
			${blockSl}{
				align-items: ${alignSl.tablet};
			}

			${googleStreetSl}{
				width: ${width.tablet};
				height: ${height.tablet};
			}
		}

		@media only screen and (max-width:640px){
			${blockSl}{
				align-items: ${alignSl.mobile};
			}

			${googleStreetSl}{
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

