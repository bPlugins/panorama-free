import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { InlineMediaUpload, Notice, Badge } from "../../../../../../../../bpl-tools/Components";

const General = ({ attributes, setAttributes }) => {
  const { imageUrl, options = {} } = attributes || {};
  const {
    hideDefaultCtrl,
    isRotate,
    autoRotateSpeed,
    orientation = false,
    initialView = false,
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

      <ToggleControl
        className="mt10"
        checked={initialView}
        label={__("Set As Initial View Button", "panorama")}
        help={__(
          "Shows a button on the viewer that lets you save the current camera angle as the initial view.",
          "panorama"
        )}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "initialView"),
          })
        }
      />

      <ToggleControl
        className="mt10"
        checked={Boolean(orientation)}
        label={
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            {__("Device Orientation (Gyroscope)", "panorama")}
            <Badge label={__("New", "panorama")} />
          </span>
        }
        help={__(
          "Allow mobile and tablet visitors to look around by tilting and rotating their physical device.",
          "panorama"
        )}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "orientation"),
          })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Auto Rotate Inactivity Delay, Custom Controls, Autoload, Preview Image, Load Button Text, Draggable, Compass, Title & Author, Mouse Zoom, Disable Keyboard Control & Double Click Zoom are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
