import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { MediaPlaceholder } from "../../../../../../bpl-tools/Components/MediaControl/MediaControl";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import { updateData } from "../../../../../../bpl-tools/utils/functions";
import Video360Viewer from "../Common/Video360Viewer";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected } = props;
  const { videoUrl } = attributes;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device }} />

      <div {...useBlockProps()}>
        <Style
          attributes={attributes}
          id={`block-${clientId}`}
          device={device}
        />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        {videoUrl ? (
          <div className="bBlocksVideo360Viewer">
            <Video360Viewer {...{ attributes, setAttributes }} />
          </div>
        ) : (
          <MediaPlaceholder
            icon="format-video"
            type="video"
            placeholder={__("Paste or type a video URL", "panorama")}
            onChange={({ url }) =>
              setAttributes({ videoUrl: updateData(videoUrl, url) })
            }
          />
        )}
      </div>
    </>
  );
};
export default withSelect((select) => {
  return {
    device: select("core/edit-post")
      .__experimentalGetPreviewDeviceType()
      ?.toLowerCase(),
  };
})(Edit);
