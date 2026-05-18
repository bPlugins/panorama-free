import { __ } from '@wordpress/i18n';
import { useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { withSelect } from "@wordpress/data";
import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import Theme from "../Common/theme";
import DraggableHotspot from "./DraggableHotspot/DraggableHotspot";
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { MediaPlaceholder } from '../Panels/MediaPlaceholder';
import ClipBoard from '../../../../components/ClipBoard/ClipBoard';


const Edit = (props) => {
  const { attributes, setAttributes, clientId, device, currentPostId, CPTType, siteUrl } = props;
  const { img = {} } = attributes || {};

  const isPremium = false;

  const [isSpotModalOpen, setIsSpotModalOpen] = useState(false);

  const settingprops = {
    attributes,
    setAttributes,
    device,
    clientId,
    isSpotModalOpen,
    setIsSpotModalOpen,
    isPremium
  }

  const shortcode = `[product_spot id=${currentPostId}]`;

  const iframeUrl = `${siteUrl}/?p=${currentPostId}`;

  const embedCode = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" loading="lazy" allowfullscreen></iframe>`;



  return (
    <>
      {img?.url && <Settings {...settingprops} />}

      {CPTType === "product_spot" && <ClipBoard {...{ shortcode, embedCode, title: 'Product Spot' }} />}

      <div {...useBlockProps({ draggable: false })}>
        <Style {...{ attributes, id: `block-${clientId}`, device }} />

        <div className="productSpotWrapper">
          {
            img?.url ? <div className="productSpot">
              <Theme {...{ attributes, setAttributes, isPremium, setIsSpotModalOpen, Hotspot: DraggableHotspot }} />
            </div> : <MediaPlaceholder
              placeholder={__("Paste or type a image URL", "product-spot")}
              onChange={(v) =>
                setAttributes({ img: updateData(img, v) })
              }
            />
          }
        </div>
      </div>
    </>
  );
};


export default withSelect((select) => {
  const { getDeviceType } = select("core/editor") || { getDeviceType: () => { return 'desktop'; } };
  const currentPostId = select('core/editor').getCurrentPostId();
  const CPTType = select('core/editor').getCurrentPostType?.();
  const siteUrl = select('core').getSite()?.url;
  return {
    device: getDeviceType()?.toLowerCase() || 'desktop',
    currentPostId,
    CPTType,
    siteUrl
  };
})(Edit);