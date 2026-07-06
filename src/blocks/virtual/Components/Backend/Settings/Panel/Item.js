import { TextControl, __experimentalNumberControl as NumberControl, Button, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import { useState } from "react";
import { InlineMediaUpload } from "../../../../../../../../bpl-tools/Components";
import { PanelRepeater } from "./PanelRepeater/PanelRepeater";
import { updateData } from "../../../../../../../../bpl-tools/utils/functions";
import CustomModal from "../../../Common/CustomModal";

const Item = ({ attributes, setAttributes, premiumProps, arrKey, index, setActiveIndex = false, siteLocation }) => {
  const { scenes } = attributes;
  const items = attributes[arrKey][index];
  const hotspots = items.hotSpots;
  const [isHotspotModalOpen, setIsHotspotModalOpen] = useState(false);
  const [isProFeatureModalOpen, setIsProFeatureModalOpen] = useState(false);

  const updateHotspots = (val, ...props) => {
    setAttributes({ scenes: updateData(scenes, val, index, 'hotSpots', ...props) });
  };

  const handleDelete = (idx) => {
    const newItems = produce(scenes, (draft) => {
      draft[index].hotSpots.splice(idx, 1);
    });

    setAttributes({ scenes: newItems });
  };

  const handleCopy = (idx) => {
    const newItems = produce(scenes, (draft) => {
      draft[index].hotSpots.push(draft[index].hotSpots[idx]);
    });
    setAttributes({ scenes: newItems });
  };

  const addNewHotspot = () => {
    if ( !premiumProps?.isPremium && hotspots?.length >= 3) {
      setIsHotspotModalOpen(true);
      return;
    }
    const newItems = produce(scenes, (draft) => {
      const tour_id = draft[index]?.tour_id;
      draft[index].hotSpots.push({
        pitch: 0,
        yaw: 0,
        type: "scene",
        text: `${tour_id} House-${draft[index].hotSpots.length + 1}`,
        sceneId: ""
      });
    });

    setAttributes({ scenes: newItems });
  }

  const updateTour = (property, val, childProperty = null) => {
    const newItems = produce(attributes[arrKey], (draft) => {
      if (property === "default_data") {
        draft.forEach((item) => {
          item.default_data = false;
        });
      }

      if (null !== childProperty) {
        draft[index][property][childProperty] = val;
      } else {
        draft[index][property] = val;
      }
    });

    setAttributes({ [arrKey]: newItems });
    setActiveIndex && setActiveIndex(index);
  };

  return (
    <>
      <TextControl
        disabled
        label={__("Scene ID", "panorama")}
        value={items.tour_id}
        onChange={(v) => updateTour("tour_id", v)}
      />

      <ToggleControl
        className="mt20"
        label={__("Show Title & Author", "panorama")}
        checked={items?.isTitleAuthor}
        onChange={(v) => updateTour("isTitleAuthor", v)}
      />

      {items?.isTitleAuthor && (
        <>
          <TextControl
            className="mt15"
            label={__("Title", "panorama")}
            value={items.title}
            onChange={(v) => updateTour("title", v)}
          />
          <TextControl
            className="mt10"
            label={__("Author", "panorama")}
            value={items?.author}
            onChange={(v) => updateTour("author", v)}
          />
        </>
      )}

      <NumberControl
        className="mt15"
        value={items.hfov}
        label={__("Hfov : ", "panorama")}
        labelPosition="left"
        min={-1000}
        max={1000}
        onChange={(v) => updateTour("hfov", parseFloat(v))}
      />

      <NumberControl
        className="mt15"
        value={items.pitch}
        label={__("Pitch : ", "panorama")}
        labelPosition="left"
        min={-1000}
        max={1000}
        onChange={(v) => updateTour("pitch", parseFloat(v))}
      />

      <NumberControl
        className="mt15"
        value={items.yaw}
        label={__("Yaw : ", "panorama")}
        labelPosition="left"
        min={-1000}
        max={1000}
        onChange={(v) => updateTour("yaw", parseFloat(v))}
      />

      <InlineMediaUpload
        className="mt15"
        label={__("Enter or upload image URL", "panorama")}
        placeholder={__("Enter or upload image URL", "panorama")}
        value={items.panorama}
        onChange={(v) => updateTour("panorama", v)}
      />

      <div style={{ marginTop: '10px' }}>
        <label>HotSpots</label>
        {hotspots?.map((val, i) =>
          <PanelRepeater
            className="mt10"
            title={`HotSpot - ${i + 1}`}
            index={i}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
            key={i}
          >

            <NumberControl
              value={val?.pitch}
              label={__("Pitch : ", "panorama")}
              labelPosition="left"
              onChange={(value) => updateHotspots(parseFloat(value), i, 'pitch')}
              min={-1000}
              max={1000}
            />

            <NumberControl
              className="mt10"
              value={val?.yaw}
              label={__("Yaw : ", "panorama")}
              labelPosition="left"
              onChange={(value) => updateHotspots(parseFloat(value), i, 'yaw')}
              min={-1000}
              max={1000}
            />

            <TextControl
              className="mt10"
              label={__("Text", "panorama")}
              value={val?.text}
              onChange={(value) => updateHotspots(value, i, 'text')}
            />

            <SelectControl
              className="mt20"
              label={__("Type :", "panorama")}
              labelPosition="left"
              value={val?.type}
              onChange={(value) => {
                if ((value === 'video' || value === 'image') && !premiumProps?.isPremium) {
                  setIsProFeatureModalOpen(true);
                  return;
                }
                updateHotspots(value, i, 'type');
              }}
              options={[
                { value: "scene", label: "Scene" },
                { value: "info", label: "Info" },
                { value: "link", label: "Link" },
                { value: "video", label: "Video" },
                { value: "image", label: "Image" },
              ]}
            />

            {val?.type === 'scene' && <TextControl
              className="mt10"
              label={__("Target ID", "panorama")}
              value={val?.sceneId}
              onChange={(value) => updateHotspots(value, i, 'sceneId')}
            />}

            {val?.type === 'link' && (
              <>
                <TextControl
                  className="mt10"
                  label={__("Link URL", "panorama")}
                  value={val?.linkUrl || ''}
                  onChange={(value) => updateHotspots(value, i, 'linkUrl')}
                />
                <SelectControl
                  className="mt10"
                  label={__("Target :", "panorama")}
                  labelPosition="left"
                  value={val?.linkTarget || '_blank'}
                  onChange={(value) => updateHotspots(value, i, 'linkTarget')}
                  options={[
                    { value: "_blank", label: "New Tab" },
                    { value: "_self", label: "Same Tab" },
                  ]}
                />
              </>
            )}

            {val?.type === 'video' && (
              <>
                <SelectControl
                  className="mt10"
                  label={__("Video Source :", "panorama")}
                  labelPosition="left"
                  value={val?.videoSource || 'youtube'}
                  onChange={(value) => {
                    updateHotspots(value, i, 'videoSource');
                    updateHotspots('', i, 'videoUrl');
                  }}
                  options={[
                    { value: "youtube", label: "YouTube" },
                    { value: "vimeo", label: "Vimeo" },
                    { value: "self-hosted", label: "Self Hosted" },
                  ]}
                />
                {(val?.videoSource || 'youtube') === 'self-hosted' ? (
                  <InlineMediaUpload
                    className="mt10"
                    label={__("Select Video", "panorama")}
                    placeholder={__("Enter or upload video URL", "panorama")}
                    value={val?.videoUrl || ''}
                    onChange={(value) => updateHotspots(value, i, 'videoUrl')}
                  />
                ) : (
                  <TextControl
                    className="mt10"
                    label={__("Video URL / ID", "panorama")}
                    value={val?.videoUrl || ''}
                    onChange={(value) => updateHotspots(value, i, 'videoUrl')}
                  />
                )}
              </>
            )}

            {val?.type === 'image' && (
              <InlineMediaUpload
                className="mt10"
                label={__("Select Image", "panorama")}
                placeholder={__("Enter or upload image URL", "panorama")}
                value={val?.imageUrl || ''}
                onChange={(value) => updateHotspots(value, i, 'imageUrl')}
              />
            )}

          </PanelRepeater>
        )}
        <Button
          style={{
            marginTop: hotspots?.length === 0 ? "10px" : undefined,
            background: "#363294",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          onClick={addNewHotspot}
        > Add New Hotspot</Button>
      </div>

      {isHotspotModalOpen && (
        <CustomModal
          title="Maximum Hotspots Limit"
          des="You can only add up to 3 hotspots in the free version. Please upgrade to premium for unlimited hotspots."
          setFn={setIsHotspotModalOpen}
          link={siteLocation}
      />
      )}

      {isProFeatureModalOpen && (
        <CustomModal
          title="Premium Feature"
          des="Video and Image hotspots are premium features. Please upgrade to premium to use them."
          setFn={setIsProFeatureModalOpen}
          link={siteLocation}
        />
      )}

    </>
  );
};

export default Item;
