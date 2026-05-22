import { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";
import Settings from "./Settings/Settings";
import ViewerOfVideo from "../Common/ViewerOfVideo";
import ViewerOfImage from "../Common/ViewerOfImage";
import Style from "../Common/Style";
import { MediaPlaceholder } from "../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../bpl-tools/utils/functions";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected, device } = props;
  const { panoType, panoImage, panoVideo } = attributes;

  const isButton = true;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId]);

  const blockProps = useBlockProps({
    id: `block-${clientId}`,
  });

  return (
    <>
      <Settings {...{ attributes, setAttributes }} />

      <div {...blockProps}>
        {!isSelected && <div className="panoramaEditorAbsolute"></div>}

        <Style attributes={attributes} id={`block-${clientId}`} />

        <div className="bBlocksViewer">
          {panoType === "image" ? (
            panoImage?.url ? (
              <ViewerOfImage {...{ attributes, setAttributes, isButton, device, isBackend: true, isSelected }} />
            ) : (
              <MediaPlaceholder
                type="image"
                placeholder={__("Paste or type an image URL", "panorama-block")}
                onChange={({ url }) => setAttributes({ panoImage: updateData(panoImage, url, 'url') })}
              />
            )
          ) : panoType === "video" ? (
            panoVideo?.url ? (
              <ViewerOfVideo {...{ attributes, setAttributes, isButton, isBackend: true, isSelected }} />
            ) : (
              <MediaPlaceholder
                type="video"
                placeholder={__("Paste or type a video URL", "panorama-block")}
                onChange={({ url }) => setAttributes({ panoVideo: updateData(panoVideo, url, 'url') })}
              />
            )
          ) : null}
        </div>
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
