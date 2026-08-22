import { PanelBody, RangeControl, ToggleControl, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";
import CubeMapUpload from "../../../../../../components/CubeMapUpload/CubeMapUpload";

const General = ({ attributes, setAttributes }) => {
  const { imageUrl, panoramaFormat = "equirectangular", haov = 360, vaov = 180, vOffset = 0, cubeMap = {}, options = {} } = attributes || {};
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
      <div style={{ marginBottom: "14px" }}>
        <SelectControl
          label={
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              {__("Panorama Format", "panorama")}
              <span style={{
                background: "#146ef5",
                color: "#ffffff",
                fontSize: "9px",
                fontWeight: "700",
                padding: "2px 6px",
                borderRadius: "4px",
                textTransform: "uppercase",
                lineHeight: "1.2",
                display: "inline-block",
                verticalAlign: "middle",
                letterSpacing: "0.5px"
              }}>
                {__("NEW", "panorama")}
              </span>
            </span>
          }
          value={panoramaFormat || "equirectangular"}
          options={[
            { label: __("Equirectangular (Default)", "panorama"), value: "equirectangular" },
            { label: __("Cubemap (6 Cube Faces)", "panorama"), value: "cubemap" },
            { label: __("Cylindrical (Smartphone Pano)", "panorama"), value: "cylindrical" },
          ]}
          help={__(
            "Choose 'Equirectangular' for standard 360° panoramic images, 'Cubemap' to upload 6 cube face images, or 'Cylindrical' for smartphone panoramas.",
            "panorama"
          )}
          onChange={(val) => setAttributes({ panoramaFormat: val })}
        />
      </div>

      {panoramaFormat === "cylindrical" && (
        <>
          <RangeControl
            className="mt15"
            label={__("Horizontal Angle of View (HAOV)", "panorama")}
            value={haov}
            min={60}
            max={360}
            step={1}
            allowReset
            resetFallbackValue={360}
            help={__("Degree of horizontal coverage (default 360°).", "panorama")}
            onChange={(v) => setAttributes({ haov: v })}
          />
          <RangeControl
            className="mt20"
            label={__("Vertical Angle of View (VAOV)", "panorama")}
            value={vaov}
            min={20}
            max={180}
            step={1}
            allowReset
            resetFallbackValue={180}
            help={__("Degree of vertical coverage (default 180°).", "panorama")}
            onChange={(v) => setAttributes({ vaov: v })}
          />
          <RangeControl
            className="mt20 mb15"
            label={__("Vertical Offset (vOffset)", "panorama")}
            value={vOffset}
            min={-30}
            max={30}
            step={1}
            allowReset
            resetFallbackValue={0}
            help={__("Vertical offset in degrees (default 0°).", "panorama")}
            onChange={(v) => setAttributes({ vOffset: v })}
          />
        </>
      )}

      {panoramaFormat === "cubemap" ? (
        <CubeMapUpload
          value={cubeMap}
          onChange={(v) => setAttributes({ cubeMap: v })}
        />
      ) : (
        <InlineMediaUpload
          className="mt15"
          label={__("Image URL", "panorama")}
          placeholder={__("Enter or upload image URL", "panorama")}
          value={imageUrl}
          onChange={(v) => {
            setAttributes({ imageUrl: updateData(imageUrl, v) });
          }}
        />
      )}

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
            <span style={{
              background: "#146ef5",
              color: "#ffffff",
              fontSize: "9px",
              fontWeight: "700",
              padding: "2px 6px",
              borderRadius: "4px",
              textTransform: "uppercase",
              lineHeight: "1.2",
              display: "inline-block",
              verticalAlign: "middle",
              letterSpacing: "0.5px"
            }}>
              {__("NEW", "panorama")}
            </span>
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
