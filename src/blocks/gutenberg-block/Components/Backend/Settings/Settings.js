import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  AlignmentToolbar,
  BlockControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalUnitControl as UnitControl,
  SelectControl,
  PanelRow,
  RangeControl,
  ToggleControl,
} from "@wordpress/components";
import {
  Label,
  InlineDetailMediaUpload,
  Notice
} from "../../../../../../../bpl-tools/Components";
import { AdvertiseCard } from "../../../../../../../bpl-tools/ProControls";
import { panoTypes } from "../../../utils/options";
import { perUnit, pxUnit } from "../../../../../../../bpl-tools/utils/options";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const Settings = ({ attributes, setAttributes, siteUrl }) => {
  const {
    panoType,
    panoImage,
    panoVideo,
    autoRotate,
    rotateSpeed,
    hideControl,
    autoPlay,
    videoMute,
    videoLoop,
    width,
    height,
    alignment,
  } = attributes;

  const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

  return (
    <>
      <InspectorControls>

        <PanelBody
          className="bPlPanelBody"
          title={__("Panorama Settings", "panorama")}
        >
          <PanelRow>
            <Label className="">{__("Panorama Type:", "panorama")}</Label>

            <SelectControl
              value={panoType}
              onChange={(val) => setAttributes({ panoType: val })}
              options={panoTypes}
            />
          </PanelRow>

          {((panoType === "image" && panoImage?.url) || (panoType === "video" && panoVideo?.url)) && <Label>{__('Panorama Source:', 'panorama')}</Label>}

          {('image' === panoType && panoImage?.url) && <InlineDetailMediaUpload value={panoImage} types={['image']} onChange={val => setAttributes({ panoImage: val })} placeholder={__('Enter Image URL', 'panorama')} />}

          {('video' === panoType && panoVideo?.url) && <InlineDetailMediaUpload value={panoVideo} types={['video']} onChange={val => setAttributes({ panoVideo: val })} placeholder={__('Enter Video URL', 'panorama')} />}

          {(panoType === "image" && panoImage?.url) ||
            (panoType === "video" && panoVideo?.url) ? (
            <>
              <UnitControl
                className="mt20"
                label={__("Width:", "panorama")}
                labelPosition="left"
                value={width}
                onChange={(val) => setAttributes({ width: val })}
                units={[pxUnit(), perUnit()]}
              />

              <UnitControl
                className="mt20"
                label={__("height:", "panorama")}
                labelPosition="left"
                value={height}
                onChange={(val) => setAttributes({ height: val })}
                units={[pxUnit(), perUnit()]}
              />
              {"video" === panoType && (
                <>
                  <ToggleControl
                    className="mt20"
                    label="Auto Play"
                    checked={autoPlay}
                    onChange={(val) => setAttributes({ autoPlay: val })}
                  />

                  <ToggleControl
                    className="mt10"
                    label="Video Mute"
                    checked={videoMute}
                    onChange={(val) => setAttributes({ videoMute: val })}
                  />

                  <ToggleControl
                    className="mt10"
                    label="Video Loop"
                    checked={videoLoop}
                    onChange={(val) => setAttributes({ videoLoop: val })}
                  />
                </>
              )}

              <ToggleControl
                className={panoType === "video" ? "mt10" : "mt20"}
                label="Show/Hide Control Bar"
                checked={hideControl}
                onChange={(val) => setAttributes({ hideControl: val })}
              />

              {"image" === panoType && (
                <>
                  <ToggleControl
                    className="mt10"
                    label="Auto Rotate"
                    checked={autoRotate}
                    onChange={(val) => setAttributes({ autoRotate: val })}
                  />

                  {autoRotate && (
                    <>
                      <Label>{__("Auto Rotate Speed", "panorama")}</Label>
                      <RangeControl
                        value={rotateSpeed}
                        onChange={(val) => setAttributes({ rotateSpeed: val })}
                        min={-100}
                        max={100}
                        step={0.1}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : null}

          <Notice status='premium' isIcon={true}>
            {"video" === panoType
              ? __(
                "Set Initial View, Setting Control, Range & Play/Pause Control, and Fullscreen Control are available in the Pro version.",
                "panorama"
              )
              : __(
                "Set Initial View, Device Motion Button & Inactivity Delay are available in the Pro version.",
                "panorama"
              )}
          </Notice>
        </PanelBody>
        <AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/panorama/pricing'} />

      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          value={alignment}
          onChange={(val) => setAttributes({ alignment: val })}
          describedBy={__("Panorama Alignment")}
          alignmentControls={[
            {
              title: __("Panorama in left", "panorama"),
              align: "start",
              icon: "align-left",
            },
            {
              title: __("Panorama in center", "panorama"),
              align: "center",
              icon: "align-center",
            },
            {
              title: __("Panorama in right", "panorama"),
              align: "end",
              icon: "align-right",
            },
          ]}
        />
      </BlockControls>
    </>
  );
};

export default compose(
  withSelect((select) => {
    return {
      siteUrl: select('core').getSite()?.url,
    };
  })
)(Settings);
