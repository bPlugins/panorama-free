import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { MediaPlaceholder } from "../../../../../../bpl-tools/Components/MediaControl/MediaControl";
import PanoramicImageViewer from "../Common/PanoramicImageViewer";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import { updateData } from '../../../../../../bpl-tools/utils/functions';


const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected } = props;
  const { imageUrl } = attributes;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device }} />

      <div {...useBlockProps({ draggble: false })}>
        <Style
          attributes={attributes}
          id={`block-${clientId}`}
          device={device}
        />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        {imageUrl ? (
          <div className="bBlocksImg3dViewer" >
            <PanoramicImageViewer {...{ attributes, setAttributes, device, isBackend: true, isSelected }} />
          </div>
        ) : (
          <MediaPlaceholder
            placeholder={__("Paste or type a image URL", "panorama")}
            onChange={({ url }) =>
              setAttributes({ imageUrl: updateData(imageUrl, url) })
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
