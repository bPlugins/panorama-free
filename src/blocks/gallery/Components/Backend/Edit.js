import { useBlockProps } from "@wordpress/block-editor";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import GalleryViewer from "../Common/GalleryViewer";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected } = props;

  return (
    <>
      <Settings {...{ attributes, setAttributes }} />

      <div {...useBlockProps()}>
        <Style attributes={attributes} id={`block-${clientId}`} />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        <div className="bBlocksGalleryViewer" >
          <GalleryViewer attributes={attributes} setAttributes={setAttributes} isButton={true} />
        </div>

      </div>
    </>
  );
};
export default Edit;
