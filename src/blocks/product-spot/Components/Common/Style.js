import { getBorderBoxCSS, getColorsCSS, getTypoCSS } from '../../../../../../bpl-tools/utils/getCSS';
import { mobileBreakpoint, tabBreakpoint } from '../../../../../../bpl-tools/utils/data';


const Style = ({ attributes, id, device = "desktop" }) => {
	const { alignment, styles } = attributes || {};
	const { width, imgRadius, hotspot = {}, info={}, title = {}, desc = {}, btnGroup } = styles || {};
	const { column, gap, index = {}, activeIndex={} } = btnGroup || {};

	const mainSl = `#${id}`;
	const productSpotWrapperSl = `${mainSl} .productSpotWrapper`;
	const productSpotSl = `${productSpotWrapperSl} .productSpot`;
	const imageSl = `${productSpotSl} .image`;
	const hotspotSl = `${productSpotSl} .hotspot`;
	const simpleInfoSl = `${productSpotSl} .simpleInfo`;
	const infoSl = `${productSpotSl} .info`;
	const tippyInfoSl = `${productSpotSl} .tippy-box[data-theme~='hotspot']`;
	const titleSl = `${productSpotSl} .title`;
	const descSl = `${productSpotSl} .desc`;
	const btnGroupSl = `${productSpotSl} .btnGroup`;
	const iconSl = `${productSpotSl} .icon svg`;


	return <style dangerouslySetInnerHTML={{
		__html: `

		${getTypoCSS('', title.typo )?.googleFontLink}
		${getTypoCSS('', desc.typo )?.googleFontLink}

		${getTypoCSS(titleSl, title.typo )?.styles}
		${getTypoCSS(descSl, desc.typo )?.styles}

		
		${productSpotWrapperSl} {
			justify-content: ${alignment};
		}

		${productSpotSl} {
			width: ${width[device]};
		}

		${imageSl} {
			border-radius: ${imgRadius};
		}

		${hotspotSl} {
			width: ${hotspot.width[device]};
			height: ${hotspot.height[device]};
			padding: ${hotspot.padding};
			background-color: ${hotspot.colors.bg};
			border-radius: ${hotspot.border.radius};
			${getBorderBoxCSS(hotspot.border || {})}
		}

		${iconSl} {
			width: ${hotspot.iconWidth};
			height: ${hotspot.iconHeight};
			fill: ${hotspot.colors.color};
		}

		${simpleInfoSl}, ${infoSl}, ${tippyInfoSl} {
			background-color: ${info.bg};
			border-radius: ${info.radius};
			padding: ${info.padding};
		}

		${titleSl} {
			color: ${title.color};
			${getTypoCSS(title.typo || {})}
		}

		${descSl} {
			color: ${desc.color};
			${getTypoCSS(desc.typo || {})}
		}

		${btnGroupSl} {
			  grid-template-columns: ${`repeat(${column}, minmax(30px, 55px))`};
			  gap: ${gap};

			  .indexBtn {
				border-radius: ${index.radius};
				${getColorsCSS(index.colors)}

					&:hover{
						${getColorsCSS(index.hoverColors)}
					}
					&.activeIdx{
						${getColorsCSS(activeIndex.colors)}
					}
			   }
		}
		


		${tabBreakpoint}{
			${productSpotSl} {
				width: ${width.tablet};
			}
			
			${hotspotSl} {
				width: ${hotspot.width.tablet};
				height: ${hotspot.height.tablet};
			}
		}


		${mobileBreakpoint}{
			${productSpotSl} {
				width: ${width.mobile};
			}

			${hotspotSl} {
				width: ${hotspot.width.mobile};
				height: ${hotspot.height.mobile};
			}
		}
		

	`}} />;
}
export default Style;