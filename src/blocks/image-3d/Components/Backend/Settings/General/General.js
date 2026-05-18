import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from '../../../../../../../../bpl-tools/utils/functions';

const General = ({ attributes, setAttributes }) => {
  const { imageUrl, options } = attributes;
  const {
    autoRotate,
    autoRotateSpeed,
    hideDefaultCtrl,
  } = options;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("View Adjustment Controls", "panorama")}
    >
      <InlineMediaUpload
        label={__("Image URL", "panorama")}
        placeholder={__("Enter or upload image URL", "panorama")}
        value={imageUrl}
        onChange={(v) => {
          setAttributes({ imageUrl: updateData(imageUrl, v) });
        }}
      />

      <ToggleControl
        className="mt20"
        checked={autoRotate}
        label={__("Auto Rotate", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "autoRotate"),
          })
        }
      />

      {autoRotate && (
        <RangeControl
          className="mt20"
          label={__("Auto Rotate Speed", "panorama")}
          value={autoRotateSpeed}
          allowReset
          onChange={(v) =>
            setAttributes({
              options: updateData(options, v, "autoRotateSpeed"),
            })
          }
          min={-100}
          max={100}
          step={0.1}
        />
      )}

      <ToggleControl
        className={autoRotate ? "mt15" : "mt10"}
        checked={hideDefaultCtrl}
        label={__("Hide Default Control", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "hideDefaultCtrl"),
          })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Set Initial View, Auto Rotate Inactivity Delay & Device Motion Button (with Colors, Hover Colors) are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
