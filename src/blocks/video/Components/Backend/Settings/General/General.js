import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import NewBadge from "../../../../../../components/NewBadge/NewBadge";

const General = ({ attributes, setAttributes }) => {
  const { videoUrl, options } = attributes;
  const {
    autoplay,
    loop,
    muted,
    controlBar,
    volume = true,
    defaultVolume = 100,
    initialView = false,
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
        className="mt15"
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

      {controlBar && (
        <ToggleControl
          className="mt10"
          checked={volume}
          label={<>{__("Volume Control", "panorama")}<NewBadge /></>}
          help={__("A volume button and slider in the control bar, so visitors can turn the sound up or down.", "panorama")}
          onChange={(v) => setAttributes({ options: updateData(options, v, "volume") })}
        />
      )}

      <RangeControl
        className="mt15"
        label={<>{__("Default Volume", "panorama")}<NewBadge /></>}
        help={__("The volume the video starts at, from 0 to 100%.", "panorama")}
        value={defaultVolume}
        min={0}
        max={100}
        step={5}
        onChange={(v) => setAttributes({ options: updateData(options, v ?? 100, "defaultVolume") })}
      />

      <Notice status='premium' isIcon={true}>
        {__('Setting Control, Range & Play/Pause Control & Full-Screen Control are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
