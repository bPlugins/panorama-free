import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";
import { IconLibrary, Label, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { getNextId, themeSwitch } from "../../../../utils/functions";
import HotspotItemPanel from "../../itemPanel/HotspotItemPanel";
import { iconModeOptions, themeOptions } from "../../../../utils/options";
import { InlineDetailMediaUpload } from "../../../Panels/InlineDetailMediaUpload";
import { PremiumBadge, PremiumPanel } from "../../../../../../../../bpl-tools/ProControls";
import CustomItemsPanel from "../panel/CustomItemPanel";
import { Modal } from "@wordpress/components";

const General = ({ attributes, setAttributes, isSpotModalOpen, setIsSpotModalOpen, siteLocation }) => {
  const { iconMode, globalIcon, themeSl, img = {}, hotspots = [], activeIndex = 0 } = attributes || {};

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Product Configuration", "panorama")}
        initialOpen={false}
      >
        <SelectControl
          label={__("Select Theme", "panorama")}
          labelPosition="left"
          help={__(
            "Some settings will be change when you will change the theme.",
            "panorama"
          )}
          value={themeSl}
          options={themeOptions}
          onChange={(val) =>
            setAttributes(themeSwitch(val, attributes))
          }
        />

        <Label>{__("Image URL:", "panorama")}</Label>
        <InlineDetailMediaUpload
          types={["image"]}
          value={img}
          onChange={(v) => setAttributes({ img: updateData(img, v) })}
          placeholder={__("Enter Product Image URL", "panorama")}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Product Hotspots", "panorama")}
        initialOpen={false}
      >
        {hotspots?.length > 0 && <>
          <SelectControl
            label={__("Hotspot Icon Mode:", "panorama")}
            labelPosition="left"
            value={iconMode}
            options={iconModeOptions}
            onChange={(val) => setAttributes({ iconMode: val })}
          />
          <Notice status='premium' isIcon={true}>
            {__('Single mode icon is available in the Pro version.', 'panorama')}
          </Notice>

          {iconMode === "global" &&
            <IconLibrary
              className="mt10"
              label={__("Select Icon:", "panorama")}
              labelPosition="left"
              value={globalIcon}
              onChange={(val) => setAttributes({ globalIcon: val })}
            />
          }
        </>}

        <CustomItemsPanel
          className="mt15"
          {...{ attributes, setAttributes, activeIndex, siteLocation }}
          arrKey="hotspots"
          newItem={{
            id: getNextId(hotspots),
            icon: '',
            x: 20,
            y: 30,
            title: `hotspot title ${getNextId(hotspots)}`,
            description: `hotspot description ${getNextId(hotspots)}`
          }}
          ItemSettings={HotspotItemPanel}
          itemLabel="Spot"
          setIsSpotModalOpen={setIsSpotModalOpen}
        />

      </PanelBody>

      {hotspots?.length > 0 && <>
        <PanelBody
          className="bPlPanelBody"
          title={<>
            {__('Options', 'panorama')}
            <PremiumBadge />
          </>}
          initialOpen={false}
        >
          <PremiumPanel title={__('Pro Options', 'panorama')} description={__('Show/Hide Title & Description are available in the Pro version.', 'panorama')} pricingUrl={siteLocation} />
        </PanelBody>

        {themeSl === "sidepanel" && <PanelBody
          className="bPlPanelBody"
          title={<>
            {__('Info Index Group', 'panorama')}
            <PremiumBadge />
          </>}
          initialOpen={false}
        >
          <PremiumPanel title={__('Info Index Group', 'panorama')} description={__('Custom Info Index Group (Column & Gap) are available in the Pro version.', 'panorama')} pricingUrl={siteLocation} />
        </PanelBody>}
      </>}

      {isSpotModalOpen && (
        <Modal
          title={__("Maximum Spot Limit", "panorama")}
          onRequestClose={() => setIsSpotModalOpen(false)}
          className="bpl-modal"
        >
          <p className="psb_hotspotDes"> You can only add up to 3 spot in the free version. Please upgrade to premium for unlimited spots. </p>
          <a
            className='psb_hotspot-modal-button'
            href={siteLocation} target='_blank'
            rel='noreferrer'
            onClick={() => setIsSpotModalOpen(false)}
          >
            Upgrade Now
          </a>
        </Modal>
      )}
    </>
  );
};

export default General;
