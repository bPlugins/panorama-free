import { PanelBody, RangeControl, SelectControl, TabPanel, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "react";
import CustomItemsPanel from "../../../CustomItemsPanel/CustomItemsPanel";
import Item from "../Panel/Item";
import { Notice } from "../../../../../../../../bpl-tools/Components";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import defaultImage from './../../../../../../default_panorama_image.png';
import CustomModal from "../../../Common/CustomModal";

const General = ({ attributes, setAttributes, setCurrentScene, siteLocation }) => {
  const { scenes = [], options = {} } = attributes;
  const [isSceneModalOpen, setIsSceneModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isLabel, tabSl, isShowSceneHotspot, showSceneListAlign, isRotate, autoRotateSpeed, autoRotateInactivityDelay, hideDefaultCtrl, draggable } = options || {};

  useEffect(() => {
    setTimeout(() => {
      scenes[activeIndex] && setCurrentScene({ ...scenes[activeIndex], panorama: defaultImage });
    }, 100);
  }, [activeIndex])

  const getNextSceneId = () => {
    if (!scenes || scenes.length === 0) return 'scene_1';
    const maxId = scenes.reduce((max, scene) => {
      const id = parseInt(scene.tour_id.split('_')[1]);
      return id > max ? id : max;
    }, 0);
    return `scene_${maxId + 1}`;
  };

  return (
    <>
      <PanelBody className="bPlPanelBody" title={__("Tours", "panorama")}>
        <CustomItemsPanel
          {...{ attributes, setAttributes, activeIndex, setActiveIndex, siteLocation }}
          arrKey="scenes"
          newItem={{
            "tour_id": getNextSceneId(),
            "isTitleAuthor": true,
            "title": `${getNextSceneId()} title`,
            "author": `${getNextSceneId()} author`,
            "hfov": 110,
            "pitch": -3,
            "yaw": 117,
            "type": "equirectangular",
            "panorama": "",
            "hotSpots": []
          }}
          ItemSettings={Item}
          itemLabel="Scene"
          title="tour_id"
          design="sortable"
          setIsSceneModalOpen={setIsSceneModalOpen}
        />
      </PanelBody>

      <PanelBody className="bPlPanelBody" title={__("Options", "panorama")}>
        <ToggleControl
          className="mt10"
          label={__("Always Show Label", "panorama")}
          checked={isLabel}
          onChange={(v) =>
            setAttributes({ options: updateData(options, v, "isLabel") })
          }
        />

        <ToggleControl
          className="mt10"
          label={__("Show Scene and Hotspot Lists", "panorama")}
          checked={isShowSceneHotspot}
          onChange={(v) =>
            setAttributes({ options: updateData(options, v, "isShowSceneHotspot") })
          }
        />

        {isShowSceneHotspot && <TabPanel
          className="bPlTabPanel small mt15"
          activeClass="activeTab"
          initialTabName={tabSl}
          tabs={[
            { name: "index", title: __("Index", "panorama") },
            { name: "hamMenu", title: __("Hamberger Menu", "panorama") },
          ]}
          onSelect={(tab) => setAttributes({ options: updateData(options, tab, "tabSl") })}
        >
          {(tab) => (
            <>
              {"index" === tab.name && <SelectControl
                className="mt15"
                label={__("Scene List Align:", "services-section")}
                labelPosition="left"
                value={showSceneListAlign}
                onChange={(v) => setAttributes({ options: updateData(options, v, "showSceneListAlign") })}
                options={[{ value: "right", label: "Right" }, { value: "left", label: "Left" }]}
              />
              }
            </>
          )}
        </TabPanel>}

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
            {autoRotateSpeed !== 0 && (
              <RangeControl
                className="mt20"
                label={__("Auto Rotate Inactivity Delay", "panorama")}
                value={autoRotateInactivityDelay}
                allowReset
                onChange={(v) =>
                  setAttributes({
                    options: updateData(options, v, "autoRotateInactivityDelay"),
                  })
                }
                min={1000}
                max={60000}
                step={1000}
              />
            )}
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
          checked={draggable}
          label={__("Draggable", "panorama")}
          onChange={(v) =>
            setAttributes({
              options: updateData(options, v, "draggable"),
            })
          }
        />

        <Notice status='premium' isIcon={true}>
          {__('Compass, Mouse Zoom, Disable Keyboard Control & Double Click Zoom are available in the Pro version.', 'panorama')}
        </Notice>
      </PanelBody>

      {isSceneModalOpen && (
        <CustomModal
          title="Maximum Scenes Limit"
          des="You can only add up to 2 scenes in the free version. Please upgrade to premium for unlimited scenes."
          setFn={setIsSceneModalOpen}
          link={siteLocation}
        />
      )}
    </>
  );
};
export default General;
