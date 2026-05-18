import {
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { tabController, updateData } from "../../../../../../../bpl-tools/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import General from "./General/General";
import Style from "./Style/Style";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const Settings = ({ attributes, setAttributes, device, siteUrl }) => {
  const { videoUrl, layout } = attributes;
  const { alignSl } = layout;

  const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

  const props = { attributes, setAttributes, device };

  return (
    <>
      <InspectorControls>

        {videoUrl && (
          <TabPanel
            className="bPlTabPanel wp-block-panorama-video-360"
            activeClass="activeTab"
            tabs={generalStyleTabs}
            onSelect={tabController}
          >
            {(tab) => (
              <>
                {"general" === tab.name && <General {...props} />}

                {"style" === tab.name && <Style {...props} />}
              </>
            )}
          </TabPanel>
        )}

        <AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/panorama/pricing'} />
      </InspectorControls>

      {videoUrl && (
        <BlockControls>
          <AlignmentToolbar
            value={alignSl[device]}
            onChange={(val) =>
              setAttributes({
                layout: updateData(layout, val, "alignSl", device),
              })
            }
            describedBy={__("Panorama Image Viewer Alignment")}
            alignmentControls={[
              {
                title: __("Panorama in left", "panorama"),
                align: "start",
                icon: "align-left",
              },
              {
                title: __("Panorama in center", "panorama"),
                align: "center",
                icon: "align-center",
              },
              {
                title: __("Panorama in right", "panorama"),
                align: "end",
                icon: "align-right",
              },
            ]}
          />
        </BlockControls>
      )}
    </>
  );
};

export default compose(
  withSelect((select) => {
    return {
      siteUrl: select('core').getSite()?.url,
    };
  })
)(Settings);
