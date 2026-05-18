
const Style = ({ attributes, id, device = "desktop" }) => {
  const { width, alignSl} = attributes.layout;

  const mainSl = `#${id}`;
  const blockSl = `${mainSl} .bBlocksVideo360Viewer`;
  const videoConSl = `${blockSl} .panoramaVideo360Viewer`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

		${blockSl}{
			align-items: ${alignSl[device]};
		}

		${videoConSl}{
			width: ${width[device] ? width[device] : "100%"};
		}
		
		@media only screen and (min-width:641px) and (max-width: 1024px){
			${blockSl}{
				align-items: ${alignSl.tablet};
			}

			${videoConSl}{
				width: ${width.tablet ? width.tablet : "100%"};
			}

		}

		@media only screen and (max-width:640px){
			${blockSl}{
				align-items: ${alignSl.mobile};
			}

			${videoConSl}{
				width: ${width.mobile ? width.mobile : "100%"};
			}

		}
	`,
      }}
    />
  );
};
export default Style;

