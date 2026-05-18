import { PanelBody } from "@wordpress/components";
import GalleryItemPanel from "../GalleryItemPanel";
import { __ } from "@wordpress/i18n";
import { ItemsPanel } from "../../../../../../../../bpl-tools/Components";
import { PremiumBadge, PremiumPanel } from "../../../../../../../../bpl-tools/ProControls";

const General = ({ attributes, setAttributes, pricingURL }) => {

  return (
    <>
      <PanelBody initialOpen={false} className="bPlPanelBody" title={<>
        {__('Galleries', 'panorama')}
        <PremiumBadge />
      </>} >
        <ItemsPanel
          {...{ attributes, setAttributes }}
          arrKey="galleries"
          newItem={{
            img: "",
            isSetVideo: false,
            video: "",
          }}
          ItemSettings={GalleryItemPanel}
          itemLabel="Gallery"
          design="sortable"
        />
      </PanelBody>

      <PanelBody initialOpen={false} className="bPlPanelBody"
        title={<>
          {__('Layout', 'panorama')}
          <PremiumBadge />
        </>}
      >
        <PremiumPanel
          title={__('Layout', 'panorama')}
          description={__(
            "Unlock advanced gallery layout controls including item limits, multi-column layouts, and customizable column spacing in the Premium version.",
            "panorama"
          )}
          pricingUrl={pricingURL} />
      </PanelBody>

      <PanelBody
        initialOpen={false}
        className="bPlPanelBody"
        title={<>
          {__('Load More Button', 'panorama')}
          <PremiumBadge />
        </>}
      >
        <PremiumPanel
          title={__('Load More Button', 'panorama')}
          description={__('Load more button with customization are available in the Premium version.', 'panorama')}
          pricingUrl={pricingURL} />
      </PanelBody>
    </>
  );
};

export default General;
