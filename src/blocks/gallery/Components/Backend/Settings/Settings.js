import { TabPanel } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { generalStyleTabs } from "../../../utils/options";
import { tabController } from "../../../../../../../bpl-tools/utils/functions";
import General from "./General/General";
import Style from "./Style/Style";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const Settings = ({ attributes, setAttributes, siteUrl }) => {
  const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

  const props = { attributes, setAttributes, pricingURL };

  return (
    <InspectorControls>

      <TabPanel
        className="bPlTabPanel wp-block-panorama-image-360"
        activeClass="activeTab"
        tabs={generalStyleTabs}
        onSelect={tabController}
      >
        {(tab) => (
          <>
            {"general" === tab.name && <General {...props} />}

            {"style" === tab.name && <Style {...{ pricingURL }} />}
          </>
        )}
      </TabPanel>

      <AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/panorama/pricing'} />
    </InspectorControls>
  );
};

export default compose(
  withSelect((select) => {
    return {
      siteUrl: select('core').getSite()?.url,
    };
  })
)(Settings);
