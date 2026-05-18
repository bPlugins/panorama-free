import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InlineMediaUpload, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";

const General = ({ attributes, setAttributes }) => {
  const { videoUrl, options } = attributes;
  const {
    autoplay,
    loop,
    play,
    progress,
    volume,
  } = options || {};

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
        checked={autoplay}
        label={__("Auto Play", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "autoplay"),
          })
        }
      />

      <ToggleControl
        className="mt15"
        checked={loop}
        label={__("Loop", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "loop"),
          })
        }
      />

      <ToggleControl
        className="mt15"
        checked={play}
        label={__("Play/Pause Control", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "play"),
          })
        }
      />

      <ToggleControl
        className="mt15"
        checked={progress}
        label={__("Progress Bar", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "progress"),
          })
        }
      />

      <ToggleControl
        className="mt15"
        checked={volume}
        label={__("Volume Control", "panorama")}
        onChange={(v) =>
          setAttributes({
            options: updateData(options, v, "volume"),
          })
        }
      />

      <Notice status='premium' isIcon={true}>
        {__('Set Initial View, Remaining Time, Picture in Picture, Fullscreen Control & Playback Speed Control are available in the Pro version.', 'panorama')}
      </Notice>
    </PanelBody>
  );
};

export default General;
