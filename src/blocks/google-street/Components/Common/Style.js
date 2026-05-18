
const Style = ({ attributes, id, device = "desktop" }) => {
  let { alignSl, width, height} = attributes.layout || {};

   if (window.location !== window.parent.location) {
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

