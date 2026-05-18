import {
  PanelBody,
  PanelRow,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
  Label,
  Device,
} from "../../../../../../../../bpl-tools/Components";
import {
  pxUnit,
  perUnit,
} from "../../../../../../../../bpl-tools/utils/options";
import { PremiumBadge, PremiumPanel } from "../../../../../../../../bpl-tools/ProControls";
import { updateData } from '../../../../../../../../bpl-tools/utils/functions';

const Style = ({ attributes, setAttributes, device, pricingURL }) => {
  const { layout } = attributes;
  const { width, height } = layout;

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Image Viewer Style", "panorama")}
      >
        <PanelRow>
          <Label>{__("Width", "panorama")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={width[device]}
          units={[pxUnit(), perUnit()]}
          onChange={(v) =>
            setAttributes({
              layout: updateData(layout, v, "width", device),
            })
          }
        />
        <PanelRow>
          <Label>{__("Height", "panorama")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={height[device]}
          units={[pxUnit()]}
          onChange={(v) =>
            setAttributes({
              layout: updateData(layout, v, "height", device),
            })
          }
        />

      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        initialOpen={false}
        title={<>
          {__('Button Style', 'panorama')}
          <PremiumBadge />
        </>}
      >
        <PremiumPanel
          title={__('Device Motion Button Style', 'panorama')}
          description={__('Device Motion Button Colors & Hover Colors are available in the Pro version.', 'panorama')}
          pricingUrl={pricingURL}
        />
      </PanelBody>
    </>
  );
};

export default Style;
