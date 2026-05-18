import { getColorsCSS,
} from "../../../../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, id, device = "desktop" }) => {
  let { alignSl, width, height, buttonColors, buttonHoverColors } = attributes.layout || {};

   if (window.location !== window.parent.location) {
    height = {
      ...height,
      desktop: window.innerHeight + 'px',
      tablet: window.innerHeight + 'px',
    }
   }

  const mainSl = `#${id}`;
  const blockSl = `${mainSl} .bBlocksImg3dViewer`;
  const imageSl = `${blockSl} .panoramaImg3dViewer`;
  const buttonSl = `${blockSl} .motionBtn`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

		${blockSl}{align-items: ${alignSl[device]}}

		${imageSl}{width: ${width[device]};height: ${height[device]}}

    ${buttonSl}{${getColorsCSS(buttonColors)}}
    ${buttonSl}:hover{${getColorsCSS(buttonHoverColors)}}

		@media only screen and (min-width:641px) and (max-width: 1024px){
			${blockSl}{align-items: ${alignSl.tablet}}
			${imageSl}{width: ${width.tablet}; height: ${height.tablet}}
		}

		@media only screen and (max-width:640px){
			${blockSl}{align-items: ${alignSl.mobile}}
			${imageSl}{width: ${width.mobile}; height: ${height.mobile}}
		}

	`,
      }}
    />
  );
};
export default Style;

