import { PanelBody, ToggleControl, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ItemsPanel, Notice } from "../../../../../../../../bpl-tools/Components";
import Item from "../Panel/Item";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import { PremiumBadge } from '../../../../../../../../bpl-tools/ProControls';

const General = ({ attributes, setAttributes }) => {
  const { options } = attributes;
  const {
    isRotate,
    autoRotateSpeed,
    hideDefaultCtrl,
  } = options || {};

  return (
    <>
      <PanelBody className="bPlPanelBody" title={<>
        {__('Tour', 'panorama')}
        <PremiumBadge />
      </>}>
        <Notice status='premium' isIcon={true}>
          {__('Preview Image & Load Button Text are available in the Pro version.', 'panorama')}
        </Notice>
        <ItemsPanel
          {...{ attributes, setAttributes }}
          arrKey="tour_360"
          newItem={{
            tour_id: "house",
            tour_img: "",
            tourTitleAuthor: true,
            title: "Spring House or Dairy",
            author: "bPlugins",
            tour_hotSpot: true,
            hotSpot_txt: "Spring House",
            target_id: "",
            default_data: false,
          }}
          ItemSettings={Item}
          itemLabel="Scene"
          design="sortable"
        />
      </PanelBody>

      <PanelBody className="bPlPanelBody" title={__("Options", "panorama")}>
        <ToggleControl
          className="mt10"
          label={__("Auto Rotate", "panorama")}
          checked={isRotate}
          onChange={(v) =>
            setAttributes({ options: updateData(options, v, "isRotate") })
          }
        />

        {isRotate && (
          <>
            <RangeControl
              className="mt20"
              label={__("Auto Rotate Speed", "panorama")}
              value={autoRotateSpeed}
              allowReset
              onChange={(v) =>
                setAttributes({
                  options: updateData(options, v, "autoRotateSpeed"),
                })
              }
              min={-100}
              max={100}
              step={0.1}
            />
          </>
        )}

        <ToggleControl
          className={isRotate ? "mt15" : "mt10"}
          checked={hideDefaultCtrl}
          label={__("Hide Default Control", "panorama")}
          onChange={(v) =>
            setAttributes({
              options: updateData(options, v, "hideDefaultCtrl"),
            })
          }
        />

        <Notice status='premium' isIcon={true}>
          {__('Auto Rotate Inactivity Delay, Set Initial View, Autoload, Draggable, Compass, Mouse Zoom, Disable Keyboard Control & Double Click Zoom are available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>
    </>
  );
};

export default General;
