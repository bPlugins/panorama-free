const Style = ({ attributes, id, device = "desktop" }) => {
	const { showSceneListAlign, tabSl } = attributes.options;
	const { alignSl, width, height } = attributes.layout;

	const mainSl = `#${id}`;
	const tourBodySl = `${mainSl} .tourBody`;
	const tourViewerWrapperSl = `${mainSl} .tourViewerWrapper`;
	const tourViewerSl = `${tourViewerWrapperSl} .tourViewer`;
	const hotspotContainerSl = `${mainSl} .hotspot-container`;

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `

					${tourViewerWrapperSl} { justify-content: ${alignSl[device]}; }
					${tourViewerSl} { width: ${width[device]}; height: ${height[device]}; }
					${hotspotContainerSl} { 
						height: ${height[device] };
						${tabSl !== "index" ? `
							position: absolute;
							top: 0;
							right: 0;
						` : ""}
				    }
					${tourBodySl}{ flex-direction: ${showSceneListAlign === "left" ? "row-reverse" : "row"} }
			
					@media only screen and (min-width:641px) and (max-width: 1024px) {
						${tourViewerWrapperSl} { justify-content: ${alignSl.tablet}; }
						${tourViewerSl} { width: ${width.tablet}; height: ${height.tablet}; }
						${hotspotContainerSl} { height: ${height.tablet }}
					}
			
					@media only screen and (max-width:640px) {
						${tourViewerWrapperSl} { justify-content: ${alignSl.mobile}; }
						${tourViewerSl} { width: ${width.mobile}; height: ${height.mobile}; }
						${hotspotContainerSl} { height: ${height.mobile }}
					}
		  		`,
			}}
		/>
	);
};

export default Style;
