import { __ } from "@wordpress/i18n";
import { PanelBody, __experimentalUnitControl as UnitControl, PanelRow } from "@wordpress/components";
import { pxUnit, perUnit } from "../../../../../../../../bpl-tools/utils/options";
import { ColorControl, ColorsControl, Device, Label, Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";

const Style = ({ attributes, setAttributes, device }) => {
  const { themeSl, hotspots = [], styles, options } = attributes;
  const { width, hotspot, info = {}, title = {}, desc = {}, btnGroup } = styles || {};
  const { colors = {}, iconWidth, iconHeight } = hotspot || {};
  const { isTitle, isDesc } = options || {};
  const { index = {}, activeIndex = {} } = btnGroup || {};

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Product Wrapper', 'panorama')} initialOpen={false}>
        <PanelRow>
          <Label className="">{__("Width", "panorama")}</Label>
          <Device />
        </PanelRow>
        <UnitControl
          value={width[device]}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "width", device) })
          }}
          units={[pxUnit(), perUnit()]}
        />

        <Notice status='premium' isIcon={true}>
          {__('Image Radius is available in the Pro version.', 'panorama')}
        </Notice>

      </PanelBody>

      {hotspots?.length > 0 && <>
        <PanelBody className='bPlPanelBody' title={__('Hotspot', 'panorama')} initialOpen={false}>
          <UnitControl
            value={hotspot.width[device]}
            label={__("Width:", "panorama")}
            labelPosition="left"
            onChange={(v) => {
              setAttributes({ styles: updateData(styles, v, "hotspot", "width", device) })
            }}
            units={[pxUnit()]}
          />

          <UnitControl
            className="mt10"
            value={hotspot.height[device]}
            label={__("Height:", "panorama")}
            labelPosition="left"
            onChange={(v) => {
              setAttributes({ styles: updateData(styles, v, "hotspot", "height", device) })
            }}
            units={[pxUnit()]}
          />

          <Notice status='premium' isIcon={true}>
            {__('Border & Padding are available in the Pro version.', 'panorama')}
          </Notice>
        </PanelBody>

        <PanelBody className='bPlPanelBody' title={__('Icon', 'panorama')} initialOpen={false}>
          <UnitControl
            value={iconWidth}
            label={__("Width:", "panorama")}
            labelPosition="left"
            onChange={(v) => {
              setAttributes({ styles: updateData(styles, v, "hotspot", "iconWidth") })
            }}
            units={[pxUnit()]}
          />

          <UnitControl
            className="mt10"
            value={iconHeight}
            label={__("Height:", "panorama")}
            labelPosition="left"
            onChange={(v) => {
              setAttributes({ styles: updateData(styles, v, "hotspot", "iconHeight") })
            }}
            units={[pxUnit()]}
          />

          <ColorsControl
            label={__("Colors:", "panorama")}
            value={colors}
            onChange={(v) => {
              setAttributes({ styles: updateData(styles, v, "hotspot", "colors") })
            }}
          />
        </PanelBody>
      </>
      }

      {(isTitle || isDesc) && <PanelBody className='bPlPanelBody' title={__('info Box', 'panorama')} initialOpen={false}>
        <ColorControl
          label={__("Background:", "panorama")}
          value={info.bg}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "info", "bg") })
          }}
        />

        <Notice status='premium' isIcon={true}>
          {__('Radius & Padding are available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>}

      {hotspots?.length > 0 && <>  {isTitle && <PanelBody className='bPlPanelBody' title={__('Title', 'panorama')} initialOpen={false}>
        <ColorControl
          label={__("Color:", "panorama")}
          value={title.color}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "title", "color") })
          }}
        />

        <Notice status='premium' isIcon={true}>
          {__('Typography is available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>} </>
      }

      {hotspots?.length > 0 && <>{isDesc && <PanelBody className='bPlPanelBody' title={__('Description', 'panorama')} initialOpen={false}>
        <ColorControl
          label={__("Color:", "panorama")}
          value={desc.color}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "desc", "color") })
          }}
        />

        <Notice status='premium' isIcon={true}>
          {__('Typography is available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>} </>
      }

      {hotspots?.length > 0 && <> {themeSl === "sidepanel" && <PanelBody className='bPlPanelBody' title={__('Info Index Group', 'panorama')} initialOpen={false}>

        <ColorsControl
          className="mt20"
          label={__("Colors:", "panorama")}
          value={index.colors}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "btnGroup", "index", "colors") })
          }}
        />

        <ColorsControl
          label={__("Hover Colors:", "panorama")}
          value={index.hoverColors}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "btnGroup", "index", "hoverColors") })
          }}
        />

        <ColorsControl
          label={__("Active Colors:", "panorama")}
          value={activeIndex.hoverColors}
          onChange={(v) => {
            setAttributes({ styles: updateData(styles, v, "btnGroup", "activeIndex", "colors") })
          }}
        />

        <Notice status='premium' isIcon={true}>
          {__('Radius is available in the Pro version.', 'panorama')}
        </Notice>

      </PanelBody>} </>
      }

    </>
  )
}

export default Style