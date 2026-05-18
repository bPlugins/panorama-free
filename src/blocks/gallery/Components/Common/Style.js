import { getColorsCSS } from "../../../../../../bpl-tools/utils/getCSS";
const Style = ({ attributes, id }) => {
  const { loadMoreBtn, column } = attributes;
  const { colors, hoverColors } = loadMoreBtn;

  const mainSl = `#${id}`;
  const blockSl = `${mainSl} .bBlocksGalleryViewer`;
  const loadMoreBtnSl = `${blockSl} .pan_loadMore`;
  const galleryConSl = `${blockSl} .galleryCon`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

            ${galleryConSl}{
              grid-template-columns: repeat(${column}, 2fr);
            }
            ${loadMoreBtnSl}{
              ${getColorsCSS(colors)}
            }

            ${loadMoreBtnSl}:hover{
              ${getColorsCSS(hoverColors)}
            }

            @media only screen and (min-width:641px) and (max-width: 1024px){
              ${galleryConSl}{
                grid-template-columns: repeat(2, 2fr);
              }
          }

          @media only screen and (max-width:640px){
            ${galleryConSl}{
              grid-template-columns: repeat(1, 2fr);
            }
          }

	        `,
      }}
    />
  );
};
export default Style;

