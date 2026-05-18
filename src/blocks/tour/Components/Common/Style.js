const Style = ({ attributes, id, device = "desktop" }) => {
  let { alignSl, width, height } = attributes.layout || {};

  if (window.location !== window.parent.location) {
    height = {
      ...height,
      desktop: window.innerHeight + 'px',
      tablet: window.innerHeight + 'px',
      mobile: window.innerHeight + 'px',
    }
  }

  const mainSl = `#${id}`;
  const blockSl = `${mainSl} .bBlocksTourViewer`;
  const tourContainerSl = `${blockSl} .tourContainer`;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `

          ${blockSl} { align-items: ${alignSl[device]}; }
          ${tourContainerSl} { width: ${width[device]}; height: ${height[device]}; }
      
          @media only screen and (min-width:641px) and (max-width: 1024px) {
            ${blockSl} { align-items: ${alignSl.tablet}; }
            ${tourContainerSl} { width: ${width.tablet}; height: ${height.tablet}; }
          }
      
          @media only screen and (max-width:640px) {
            ${blockSl} { align-items: ${alignSl.mobile}; }
            ${tourContainerSl} { width: ${width.mobile}; height: ${height.mobile}; }
          }
            
		    `,
      }}
    />
  );
};

export default Style;
