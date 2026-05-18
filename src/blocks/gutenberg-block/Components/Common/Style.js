import {
	getColorsCSS,
  } from "../../../../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, id }) => {
  const { panoType, alignment, width, height,buttonColors,buttonHoverColors } = attributes || {};

  const blockSl = `#${id} .bBlocksViewer`;
  const panoramaSl = `${blockSl} .bpgbPanorama`;
  const buttonSl = `${blockSl} .motionBtn`;
  const initialBtnSl = `${panoramaSl} .setInitialViewButton`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

			${blockSl}{
			  align-items: ${alignment};
			}

			${panoramaSl}{
			  width: ${width};
			  height: ${height};
			}

			${buttonSl}{${getColorsCSS(buttonColors)}}
    		${buttonSl}:hover{${getColorsCSS(buttonHoverColors)}}
			  
			${initialBtnSl}{
			  ${panoType === "image" ? "bottom: 0;" : "top: 0;"}
			}
			
		  `,
      }}
    />
  );
};
export default Style;
