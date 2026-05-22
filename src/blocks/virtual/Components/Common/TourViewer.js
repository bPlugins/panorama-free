import React, { useState, useEffect, useRef } from 'react';
import { addTempHotspot, createModifiedHotspots, handleMouseDownEvent, handleMouseUpEvent, initializePannellumViewer, saveHotspot } from '../../utils/functions';
import PopupWrapper from './PopupWrapper';
import defaultImage from './../../../../default_panorama_image.png'
import UploadImage from './UploadImage';
import HotspotList from './HotspotList';
import { hambergerMenu } from '../../utils/icons';
import CustomModal from './CustomModal';
import useGutenbergDragFix from '../../../../hooks/useGutenbergDragFix';

const TourViewer = ({ attributes, setAttributes, isBackend = false, isSelected = false, currentScene, setCurrentScene, selectBlock, clientId, isPremium, siteLocation }) => {
  const { scenes, options = {} } = attributes;
  const { tabSl, isShowSceneHotspot } = options;
  const { hotSpots: hotspotData = [] } = currentScene || {};
  const panoRef = useRef(null);
  const tourWrapperRef = useRef(null);
  const [tempHotspot, setTempHotspot] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [isDraggingHotspot, setIsDraggingHotspot] = useState(false);
  const viewerRef = useRef(null);
  const clickStartCoords = useRef(null);
  const isDraggingRef = useRef(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);
  const [isHotspotModalViewerOpen, setIsHotspotModalViewerOpen] = useState(false);

  const scenesStr = JSON.stringify(scenes);
  const optionsStr = JSON.stringify(options);

  const popupDataRef = useRef(popupData);
  const isDraggingHotspotRef = useRef(isDraggingHotspot);

  useEffect(() => {
    popupDataRef.current = popupData;
  }, [popupData]);

  useEffect(() => {
    isDraggingHotspotRef.current = isDraggingHotspot;
  }, [isDraggingHotspot]);

  useEffect(() => {
    if (currentScene && viewerRef.current) {
      viewerRef.current.loadScene(currentScene.tour_id);
    }
    if (currentScene) {
      setLoaded(true);
    }
  }, [currentScene]);

  useEffect(() => {
    if (!window.pannellum || !panoRef.current) return;

    const prevViewer = panoRef.current.viewerInstance;
    let currentPitch = 0;
    let currentYaw = 0;
    let currentHfov = 100;

    if (prevViewer) {
      currentPitch = prevViewer.getPitch();
      currentYaw = prevViewer.getYaw();
      currentHfov = prevViewer.getHfov();
      prevViewer.destroy();
    }

    const modifiedScenes = {};

    scenes.map((scene) => {
      let sceneWithTitleAuthor = { ...scene };
      if (!scene.isTitleAuthor) {
        delete sceneWithTitleAuthor.title;
        delete sceneWithTitleAuthor.author;
      }
      modifiedScenes[scene.tour_id] = {
        ...sceneWithTitleAuthor,
        panorama: scene.panorama || defaultImage,
        hotSpots: scene.hotSpots.map((spot, index) =>
          createModifiedHotspots(scenes, scene, spot, isBackend, index, setPopupData, setAttributes, options?.isLabel)
        )
      };
    });

    const viewer = initializePannellumViewer(panoRef, modifiedScenes, options);
    window.viewer = viewer;

    {
      isBackend && viewer.on('scenechange', (sceneId) => {
        setCurrentScene(scenes.find((scene) => scene.tour_id === sceneId))
      })
    }

    viewerRef.current = viewer;

    if (currentScene && viewerRef.current) {
      viewerRef.current.loadScene(currentScene.tour_id);
    }
    viewer.lookAt(currentPitch, currentYaw, currentHfov);
    panoRef.current.viewerInstance = viewer;

    if (tempHotspot) {
      addTempHotspot(currentScene, viewerRef.current, tempHotspot, isDraggingRef, setIsDraggingHotspot, setPopupData, setTempHotspot);
    }

    const targetEl = panoRef.current?.querySelector('.pnlm-dragfix') || panoRef.current;

    const onMouseDown = (event) => {
      handleMouseDownEvent(event, popupDataRef, isDraggingHotspotRef, clickStartCoords);
    };

    const onMouseUp = (event) => {
      handleMouseUpEvent(event, viewer, clickStartCoords, popupDataRef, isDraggingHotspotRef, setTempHotspot);
    };

    if (targetEl) {
      targetEl.addEventListener("mousedown", onMouseDown);
      targetEl.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (targetEl) {
        targetEl.removeEventListener("mousedown", onMouseDown);
        targetEl.removeEventListener("mouseup", onMouseUp);
      }
      if (viewer) viewer.destroy();
    };
  }, [scenesStr, loaded, optionsStr]);

  useEffect(() => {
    if (isBackend && tempHotspot && viewerRef.current) {
      addTempHotspot(currentScene, viewerRef.current, tempHotspot, isDraggingRef, setIsDraggingHotspot, setPopupData, setTempHotspot);
    }
  }, [tempHotspot]);

  useGutenbergDragFix(tourWrapperRef, panoRef, isBackend, isSelected);


  const handleSaveHotspot = () => {
    saveHotspot(popupData, scenes, currentScene, setAttributes, setPopupData, setTempHotspot, isPremium, setIsHotspotModalViewerOpen);
  }

  return (
    <div ref={tourWrapperRef} className="bpgb-virtual-tour-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
      {tabSl === "index" ? <>
        <div className='tourBody'>
          <div className='tourViewerWrapper'>
            <div className='tourViewer'>

              {isBackend && !currentScene?.panorama && <UploadImage {...{ currentScene, scenes, setAttributes, selectBlock, clientId }} />}

              <div ref={panoRef} />

              {currentScene?.panorama && popupData && isBackend && <PopupWrapper {...{ scenes, setAttributes, currentScene, hotspotData, popupData, setPopupData, isDropdownOpen, setIsDropdownOpen, setTempHotspot, handleSaveHotspot }} />}

            </div>
          </div>
          {isShowSceneHotspot && <HotspotList {...{ scenes, viewerRef, tabSl, currentScene }} />}
        </div>
      </>
        :
        <div className='tourViewerWrapper'>
          <div className='tourViewer'>

            {isBackend && !currentScene?.panorama && <UploadImage {...{ currentScene, scenes, setAttributes, selectBlock, clientId }} />}

            <div ref={panoRef} />

            {currentScene?.panorama && popupData && isBackend && <PopupWrapper {...{ scenes, setAttributes, currentScene, hotspotData, popupData, setPopupData, isDropdownOpen, setIsDropdownOpen, setTempHotspot, handleSaveHotspot }} />}

            {isShowSceneHotspot && <div className='hambergerMenu' onClick={() => setIsHamMenuOpen(!isHamMenuOpen)}>{hambergerMenu}</div>}

            {(isShowSceneHotspot && isHamMenuOpen) && <HotspotList {...{ scenes, viewerRef, setIsHamMenuOpen, currentScene }} />}

          </div>
        </div>

      }

      {isBackend && isHotspotModalViewerOpen &&
        <CustomModal
          title="Maximum Hotspots Limit"
          des="You can only add up to 3 hotspots in the free version. Please upgrade to premium for unlimited hotspots."
          setFn={setIsHotspotModalViewerOpen}
          link={siteLocation}
        />
      }

    </div>
  );
};

export default TourViewer;


