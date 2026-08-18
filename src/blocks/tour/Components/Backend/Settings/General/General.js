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
    initialView = false,
  } = options || {};

  return (
    <>
      <PanelBody className="bPlPanelBody" title={<>
        {__('Tour', 'panorama')}
        <PremiumBadge />
      </>}>
        <div style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fa 100%)',
          border: '1px solid #cce3f9',
          borderLeft: '4px solid #146ef5',
          borderRadius: '8px',
          padding: '14px 16px',
          marginBottom: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '16px' }}>🌟</span>
            <strong style={{ fontSize: '13px', color: '#0d3d84', fontWeight: 700 }}>
              {__('Experience Our Modern Virtual Tour', 'panorama')}
            </strong>
            <span style={{
              background: '#146ef5',
              color: '#fff',
              fontSize: '9px',
              fontWeight: 'bold',
              padding: '2px 5px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              {__('New & Recommended', 'panorama')}
            </span>
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#334e68', margin: '0 0 10px 0' }}>
            {__("Create stunning virtual tours with modern scene index lists, responsive hamburger menus, custom multimedia hotspots, and get up to 6 scenes completely FREE!", "panorama")}
          </p>
          <a
            href="edit.php?post_type=virtual_tour"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#146ef5',
              color: '#fff',
              textDecoration: 'none',
              padding: '5px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(20, 110, 245, 0.2)'
            }}
          >
            {__('Try Modern Virtual Tour (Free)', 'panorama')} &rarr;
          </a>
        </div>

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

        <ToggleControl
          className="mt10"
          checked={initialView}
          label={__("Set As Initial View Button", "panorama")}
          help={__(
            "Shows a button on the viewer that lets you save the current camera angle as the initial view.",
            "panorama"
          )}
          onChange={(v) =>
            setAttributes({
              options: updateData(options, v, "initialView"),
            })
          }
        />

        <Notice status='premium' isIcon={true}>
          {__('Auto Rotate Inactivity Delay, Autoload, Draggable, Compass, Mouse Zoom, Disable Keyboard Control & Double Click Zoom are available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>
    </>
  );
};

export default General;
