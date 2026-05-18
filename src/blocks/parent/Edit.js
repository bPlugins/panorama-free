const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { useSelect, dispatch } = wp.data;
const { useEffect } = wp.element;

const Edit = (props) => {
  const blockProps = useBlockProps();

  const { clientId, isSelected } = props;
  const innerBlocks = useSelect(
    (select) => select("core/block-editor").getBlock(clientId).innerBlocks
  );

  useEffect(() => {
    if (isSelected) {
      wp.data.dispatch("core/edit-post").openGeneralSidebar("edit-post/block");
    }
  }, [isSelected]);

  dispatch("core/block-editor").setTemplateValidity(true);

  const insertBlockType = (type) => {
    const block = wp.blocks.createBlock(type === "bpgb/panorama" ? "bpgb/panorama" : `panorama/${type}`);
    return dispatch("core/block-editor").insertBlock(block, 0, clientId);
  };

  const appenderToUse = () => {
    if (innerBlocks.length === 0) {
      return <InnerBlocks.ButtonBlockAppender />;
    } else {
      return false;
    }
  };

  if (!innerBlocks?.length) {
    return (
      <div {...blockProps}>
        <div className="bpl-panorama-editor">
          <h2 className="panorama-title">Choose a viewer </h2>
          <div className="panorama-buttons">
            <button
              className="panorama-button image-3d"
              onClick={() => {
                insertBlockType("image-3d");
              }}
            >
              <span className="icon">🧊</span>
              <span className="text">Image 3D</span>
            </button>
            <button
              className="panorama-button image-360"
              onClick={() => {
                insertBlockType("image-360");
              }}
            >
              <span className="icon">🌐</span>
              <span className="text">Image 360°</span>
            </button>

            <button
              className="panorama-button video"
              onClick={() => {
                insertBlockType("video");
              }}
            >
              <span className="icon">🎥</span>
              <span className="text">Video</span>
            </button>
            <button
              className="panorama-button video-360"
              onClick={() => {
                insertBlockType("video-360");
              }}
            >
              <span className="icon">🎬</span>
              <span className="text"> Video 360°</span>
            </button>
            <button
              className="panorama-button gallery"
              onClick={() => {
                insertBlockType("gallery");
              }}
            >
              <span className="icon">🖼️</span>
              <span className="text">Gallery</span>
            </button>
            <button
              className="panorama-button tour"
              onClick={() => {
                insertBlockType("tour");
              }}
            >
              <span className="icon">🏛️</span>
              <span className="text">Tour 360°</span>
            </button>
            <button
              className="panorama-button google-street"
              onClick={() => {
                insertBlockType("google-street");
              }}
            >
              <span className="icon">🗺️</span>
              <span className="text">Google Street</span>
            </button>
            <button
              className="panorama-button gutenberg-block"
              onClick={() => {
                insertBlockType("bpgb/panorama");
              }}
            >
              <span className="icon">🌄</span>
              <span className="text">Panorama Gutenberg block</span>
            </button>
          </div>
          <InnerBlocks
            templateLock={false}
            allowedBlocks={[
              "panorama/image-360",
              "panorama/image-3d",
              "panorama/video",
              "panorama/video-360",
              "panorama/google-street",
              "panorama/gallery",
              "panorama/tour",
              "panorama/virtual-tour",
              "bpgb/panorama"
            ]}
            renderAppender={() => false}
          />
        </div>
      </div>
    );
  }

  return (
    <div {...blockProps}>
      <InnerBlocks
        templateLock={false}
        allowedBlocks={[
          "panorama/image-360",
          "panorama/image-3d",
          "panorama/video",
          "panorama/video-360",
          "panorama/google-street",
          "panorama/gallery",
          "panorama/tour",
          "bpgb/panorama",
        ]}
        renderAppender={() => appenderToUse()}
      />
    </div>
  );
};
export default Edit;
