import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";

const General = ({ attributes, setAttributes }) => {
  const { imageUrl, options = {} } = attributes || {};
  const {
    hideDefaultCtrl,
    isRotate,
    autoRotateSpeed,
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
        className="mt15"
        checked={isRotate}
        label={__("Auto Rotate", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "isRotate"),
          })
        }
      />

      {isRotate && (
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
        className={isRotate ? "mt15" : "mt10"}
        checked={hideDefaultCtrl}
        label={__("Hide Default Control", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "hideDefaultCtrl"),
          })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Auto Rotate Inactivity Delay, Set Initial View, Custom Controls, Autoload, Preview Image, Load Button Text, Draggable, Compass, Title & Author, Mouse Zoom, Disable Keyboard Control & Double Click Zoom are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
