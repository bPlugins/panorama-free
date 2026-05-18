import { PanelBody, } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PremiumBadge, PremiumPanel } from '../../../../../../../../bpl-tools/ProControls';

const Style = ({ pricingURL }) => {

  return (
    <PanelBody
      initialOpen={false}
      className="bPlPanelBody"
      title={<>
        {__('Load More Button', 'panorama')}
        <PremiumBadge />
      </>}
    >
      <PremiumPanel
        title={__('Styles', 'panorama')}
        description={__('Load more button styles with customization are available in the Premium version.', 'panorama')}
        pricingUrl={pricingURL} />
    </PanelBody>
  );
};

export default Style;
