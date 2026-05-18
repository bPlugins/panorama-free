import { useState } from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { compose } from "@wordpress/compose";
import { withDispatch, withSelect } from "@wordpress/data";
import Style from "../Common/Style";
import Settings from "./Settings/Settings";
import TourViewer from "../Common/TourViewer";
import ClipBoard from '../../../../components/ClipBoard/ClipBoard';

const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, isSelected, currentPostId, selectBlock, CTPType, siteUrl } = props;

  const isPremium = false;

  const siteLocation = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

  const [currentScene, setCurrentScene] = useState(attributes.scenes[0] || null);

  const shortcode = `[virtual-tour id=${currentPostId}]`;
  const iframeUrl = `${siteUrl}/?p=${currentPostId}`;
  const embedCode = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" loading="lazy" allowfullscreen></iframe>`;

  return (
    <>
      <Settings {...{ attributes, setAttributes, device, setCurrentScene, siteLocation }} />

      {CTPType === "virtual_tour" && <ClipBoard {...{ shortcode, embedCode, title: 'Virtual Tour' }} />}

      <div {...useBlockProps({ draggable: false })}>

        <Style {...{ attributes, device, id: `block-${clientId}` }} />

        {!isSelected && <div className="bPlBlockBeforeSelect"></div>}

        <TourViewer {...{ attributes, setAttributes, isBackend: true, currentScene, setCurrentScene, selectBlock, clientId, isPremium, siteLocation }} />

      </div>

    </>
  )
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
