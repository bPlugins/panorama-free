import { useState } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import TourViewer from "../Common/TourViewer";
import ClipBoard from '../../../../components/ClipBoard/ClipBoard';

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected, currentPostId, selectBlock, CTPType, siteUrl } = props;
  const { scenes = [] } = attributes;

  const isPremium = false;

  const siteLocation = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

  const [currentScene, setCurrentScene] = useState(scenes[0] || null);

  const activeScene = scenes.find((s) => s.tour_id === currentScene?.tour_id) || currentScene || scenes[0];
  const isCubemap = activeScene?.panoramaFormat === 'cubemap';
  const isAllFacesUploaded = Boolean(
    activeScene?.cubeMap?.front &&
    activeScene?.cubeMap?.right &&
    activeScene?.cubeMap?.back &&
    activeScene?.cubeMap?.left &&
    activeScene?.cubeMap?.up &&
    activeScene?.cubeMap?.down
  );
  const uploadedFacesCount = isCubemap
    ? ['front', 'right', 'back', 'left', 'up', 'down'].filter((k) => Boolean(activeScene?.cubeMap?.[k])).length
    : 0;

  const shortcode = `[virtual-tour id=${currentPostId}]`;
  const iframeUrl = `${siteUrl}/?p=${currentPostId}`;
  const embedCode = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" loading="lazy" allow="accelerometer; gyroscope; magnetometer; fullscreen; xr-spatial-tracking" allowfullscreen></iframe>`;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device, isPremium, setCurrentScene, siteLocation }} />

      {CTPType === "virtual_tour" && <ClipBoard {...{ shortcode, embedCode, title: 'Virtual Tour' }} />}

      <div {...useBlockProps({ draggable: false })}>

        <Style {...{ attributes, device, id: `block-${clientId}` }} />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        {isCubemap && !isAllFacesUploaded ? (
          <div style={{
            border: "2px dashed #3b82f6",
            borderRadius: "8px",
            padding: "40px 24px",
            textAlign: "center",
            background: "#f0f7ff",
            color: "#1e3a8a",
            margin: "15px 0"
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
                const isDone = Boolean(activeScene?.cubeMap?.[key]);
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
        ) : (
          <TourViewer {...{ attributes, setAttributes, isBackend: true, isSelected, currentScene: activeScene, setCurrentScene, selectBlock, clientId, isPremium, siteLocation }} />
        )}

      </div>

    </>
  );
};

export default compose(
  withSelect((select) => {
    const { getDeviceType } = select('core/editor');
    const currentPostId = select('core/editor').getCurrentPostId();
    const CTPType = select('core/editor').getCurrentPostType?.();
    const siteUrl = select('core').getSite()?.url;

    return {
      device: getDeviceType()?.toLowerCase() || 'desktop',
      currentPostId,
      CTPType,
      siteUrl
    };
  }),
  withDispatch((dispatch, ownProps) => {
    return {
      selectBlock: () => {
        dispatch('core/block-editor').selectBlock(ownProps.clientId);
      }
    };
  })
)(Edit)
