import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";

const General = ({ attributes, setAttributes }) => {
  const { videoUrl, options } = attributes;
  const {
    autoplay,
    loop,
    muted,
    controlBar,
  } = options;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("View Adjustment Controls", "panorama")}
    >
      <InlineMediaUpload
        className="mt10"
        label={__("Video URL", "panorama")}
        placeholder={__("Enter or upload video URL", "panorama")}
        types={["video"]}
        value={videoUrl}
        onChange={(v) => {
          setAttributes({ videoUrl: updateData(videoUrl, v) });
        }}
      />

      <ToggleControl
        className="mt10"
        checked={autoplay}
        label={__("Auto Play", "panorama")}
        help={__("To enable autoplay, please make sure 'Muted' is also turned on.", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "autoplay"),
          })
        }
      />

      <ToggleControl
        className="mt10"
        checked={muted}
        label={__("Muted", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "muted"),
          })
        }
      />

      <ToggleControl
        className="mt10"
        checked={loop}
        label={__("Loop", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "loop"),
          })
        }
      />

      <ToggleControl
        className="mt10"
        checked={controlBar}
        label={__("Control Bar", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "controlBar"),
          })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Set Initial View, Setting Control, Range & Play/Pause Control & Full-Screen Control are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
