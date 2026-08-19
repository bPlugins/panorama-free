import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { MediaPlaceholder } from "../../../../../../bpl-tools/Components/MediaControl/MediaControl";
import ImageViewer from "../Common/ImageViewer";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import { updateData } from "../../../../../../bpl-tools/utils/functions";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected } = props;
  const { imageUrl, panoramaFormat = "equirectangular", cubeMap = {} } = attributes;

  const isCubemap = panoramaFormat === "cubemap";
  const isAllFacesUploaded = Boolean(
    cubeMap?.front &&
    cubeMap?.right &&
    cubeMap?.back &&
    cubeMap?.left &&
    cubeMap?.up &&
    cubeMap?.down
  );

  const uploadedFacesCount = [
    cubeMap?.front,
    cubeMap?.right,
    cubeMap?.back,
    cubeMap?.left,
    cubeMap?.up,
    cubeMap?.down
  ].filter(Boolean).length;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device }} />

      <div {...useBlockProps({ draggable: false })}>
        <Style
          attributes={attributes}
          id={`block-${clientId}`}
          device={device}
        />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        {isCubemap ? (
          isAllFacesUploaded ? (
            <div className="bBlocksImageViewer">
              <ImageViewer
                attributes={attributes}
                setAttributes={setAttributes}
                isButton={true}
                isBackend={true}
                isSelected={isSelected}
              />
            </div>
          ) : (
            <div style={{
              border: "2px dashed #3b82f6",
              borderRadius: "8px",
              padding: "40px 24px",
              textAlign: "center",
              background: "#f0f7ff",
              color: "#1e3a8a"
            }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📦</div>
              <p style={{ margin: "0 0 6px 0", fontWeight: "700", fontSize: "15px", color: "#1e40af" }}>
                {__("Cubemap (6 Cube Faces) Mode", "panorama")}
              </p>
              <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "#3b82f6" }}>
                {uploadedFacesCount > 0
                  ? __(`Uploaded ${uploadedFacesCount} of 6 cube faces. Please upload all 6 faces in the sidebar.`, "panorama")
                  : __("Please upload all 6 square cube faces (Front, Right, Back, Left, Up, Down) in the right sidebar settings.", "panorama")}
              </p>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "6px", fontSize: "11px", fontWeight: "600" }}>
                {[
                  { name: "Front (f)", key: "front" },
                  { name: "Right (r)", key: "right" },
                  { name: "Back (b)", key: "back" },
                  { name: "Left (l)", key: "left" },
                  { name: "Up (u)", key: "up" },
                  { name: "Down (d)", key: "down" },
                ].map(({ name, key }) => {
                  const isDone = Boolean(cubeMap?.[key]);
                  return (
                    <span key={key} style={{
                      padding: "4px 10px",
                      borderRadius: "4px",
                      background: isDone ? "#10b981" : "#ffffff",
                      color: isDone ? "#ffffff" : "#64748b",
                      border: isDone ? "1px solid #059669" : "1px solid #cbd5e1",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                    }}>
                      {isDone ? `✓ ${name}` : name}
                    </span>
                  );
                })}
              </div>
            </div>
          )
        ) : imageUrl ? (
          <div className="bBlocksImageViewer">
            <ImageViewer
              attributes={attributes}
              setAttributes={setAttributes}
              isButton={true}
              isBackend={true}
              isSelected={isSelected}
            />
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
