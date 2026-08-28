import React, { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
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
    const [isProFeatureModalOpen, setIsProFeatureModalOpen] = useState(false);
    const [activePopupHotspot, setActivePopupHotspot] = useState(null);

    const activeScene = scenes.find((s) => s.tour_id === currentScene?.tour_id) || currentScene || scenes[0];
    const isCurrentSceneCubemap = activeScene?.panoramaFormat === 'cubemap';
    const isCurrentSceneAllFacesUploaded = Boolean(
        activeScene?.cubeMap?.front &&
        activeScene?.cubeMap?.right &&
        activeScene?.cubeMap?.back &&
        activeScene?.cubeMap?.left &&
        activeScene?.cubeMap?.up &&
        activeScene?.cubeMap?.down
    );
    const uploadedFacesCount = isCurrentSceneCubemap
        ? ['front', 'right', 'back', 'left', 'up', 'down'].filter(k => Boolean(activeScene?.cubeMap?.[k])).length
        : 0;

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
        const latestScene = scenes.find((s) => s.tour_id === currentScene?.tour_id) || scenes[0];
        if (latestScene && latestScene !== currentScene) {
            setCurrentScene(latestScene);
        }
    }, [scenesStr]);

    useEffect(() => {
        if (!currentScene) {
            setCurrentScene(scenes[0]);
        }
    }, [currentScene]);

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
            panoRef.current.viewerInstance = null;
        }

        if (isBackend && isCurrentSceneCubemap && !isCurrentSceneAllFacesUploaded) {
            return;
        }

        const modifiedScenes = {};

        scenes.map((scene) => {
            let sceneWithTitleAuthor = { ...scene };
            if (!scene.isTitleAuthor) {
                delete sceneWithTitleAuthor.title;
                delete sceneWithTitleAuthor.author;
            }

            const isCubemap = scene.panoramaFormat === 'cubemap';
            const isAllFacesUploaded = Boolean(
                scene.cubeMap?.front &&
                scene.cubeMap?.right &&
                scene.cubeMap?.back &&
                scene.cubeMap?.left &&
                scene.cubeMap?.up &&
                scene.cubeMap?.down
            );

            let scenePanoramaConfig = {};
            if (isCubemap && isAllFacesUploaded) {
                scenePanoramaConfig = {
                    type: "cubemap",
                    cubeMap: [
                        scene.cubeMap.front,
                        scene.cubeMap.right,
                        scene.cubeMap.back,
                        scene.cubeMap.left,
                        scene.cubeMap.up,
                        scene.cubeMap.down
                    ]
                };
            } else {
                scenePanoramaConfig = {
                    type: "equirectangular",
                    panorama: scene.panorama || defaultImage
                };
            }

            modifiedScenes[scene.tour_id] = {
                ...sceneWithTitleAuthor,
                ...scenePanoramaConfig,
                hotSpots: scene.hotSpots.map((spot, index) =>
                    createModifiedHotspots(scenes, scene, spot, isBackend, index, setPopupData, setAttributes, options?.isLabel, setActivePopupHotspot)
                )
            };
        });

        const viewer = initializePannellumViewer(panoRef, modifiedScenes, options, isBackend, currentScene?.tour_id);
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
            handleMouseUpEvent(event, viewer, clickStartCoords, popupDataRef, isDraggingHotspotRef, setTempHotspot, setPopupData);
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
    }, [scenesStr, loaded, optionsStr, currentScene]);

    useGutenbergDragFix(tourWrapperRef, panoRef, isBackend, isSelected);

    useEffect(() => {
        if (isBackend && tempHotspot && viewerRef.current) {
            addTempHotspot(currentScene, viewerRef.current, tempHotspot, isDraggingRef, setIsDraggingHotspot, setPopupData, setTempHotspot);
        }
    }, [tempHotspot]);

    const handleSaveHotspot = () => {
        saveHotspot(popupData, scenes, currentScene, setAttributes, setPopupData, setTempHotspot, isPremium, setIsHotspotModalViewerOpen);
    }

    const renderSceneViewer = () => {
        if (isBackend && isCurrentSceneCubemap && !isCurrentSceneAllFacesUploaded) {
            return (
                <div style={{
                    border: "2px dashed #3b82f6",
                    borderRadius: "8px",
                    padding: "40px 24px",
                    textAlign: "center",
                    background: "#f0f7ff",
                    color: "#1e3a8a",
                    margin: "20px auto",
                    maxWidth: "580px",
                    boxSizing: "border-box"
                }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>📦</div>
                    <p style={{ margin: "0 0 6px 0", fontWeight: "700", fontSize: "16px", color: "#1e40af" }}>
                        {__("Cubemap (6 Cube Faces) Mode", "panorama")}
                    </p>
                    <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#3b82f6" }}>
                        {uploadedFacesCount > 0
                            ? __(`Uploaded ${uploadedFacesCount} of 6 cube faces. Please upload all 6 faces in the right sidebar settings.`, "panorama")
                            : __("Please upload all 6 square cube faces (Front, Right, Back, Left, Up, Down) in the right sidebar settings.", "panorama")}
                    </p>
                    <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "6px", fontSize: "11px", fontWeight: "600" }}>
                        {[
                            { name: "Front (f)", key: "front" },
                            { name: "Right (r)", key: "right" },
                            { name: "Back (b)", key: "back" },
                            { name: "Left (l)", key: "left" },
                            { name: "Up (u)", key: "up" },
                            { name: "Down (d)", key: "down" },
                        ].map(({ name, key }) => {
                            const isDone = Boolean(activeScene?.cubeMap?.[key]);
                            return (
                                <span key={key} style={{
                                    padding: "5px 12px",
                                    borderRadius: "4px",
                                    background: isDone ? "#10b981" : "#ffffff",
                                    color: isDone ? "#ffffff" : "#64748b",
                                    border: isDone ? "1px solid #059669" : "1px solid #cbd5e1",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                }}>
                                    {isDone ? `✓ ${name}` : name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <>
                {isBackend && !activeScene?.panorama && activeScene?.panoramaFormat !== 'cubemap' && <UploadImage {...{ currentScene: activeScene, scenes, setAttributes, selectBlock, clientId }} />}

                <div ref={panoRef} />

                {(activeScene?.panorama || (isCurrentSceneCubemap && isCurrentSceneAllFacesUploaded)) && popupData && isBackend && <PopupWrapper {...{ scenes, setAttributes, currentScene: activeScene, hotspotData, popupData, setPopupData, isDropdownOpen, setIsDropdownOpen, setTempHotspot, handleSaveHotspot, isPremium, setIsProFeatureModalOpen }} />}
            </>
        );
    };

    return (
        <div ref={tourWrapperRef} className="bpgb-virtual-tour-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {tabSl === "index" ? <>
                <div className='tourBody'>
                    <div className='tourViewerWrapper'>
                        <div className='tourViewer'>
                            {renderSceneViewer()}
                        </div>
                    </div>
                    {isShowSceneHotspot && <HotspotList {...{ scenes, viewerRef, tabSl, currentScene }} />}
                </div>
            </>
                :
                <div className='tourViewerWrapper'>
                    <div className='tourViewer'>
                        {renderSceneViewer()}
                        {isShowSceneHotspot && <div className='hambergerMenu' onClick={() => setIsHamMenuOpen(!isHamMenuOpen)}>{hambergerMenu}</div>}
                        {(isShowSceneHotspot && isHamMenuOpen) && <HotspotList {...{ scenes, viewerRef, setIsHamMenuOpen, currentScene }} />}
                    </div>
                </div>

            }

            {isBackend && isHotspotModalViewerOpen &&
                <CustomModal
                    title="Maximum Hotspots Limit"
                    des="You can only add up to 6 hotspots in the free version. Please upgrade to premium for unlimited hotspots."
                    setFn={setIsHotspotModalViewerOpen}
                    link={siteLocation}
                />
            }

            {isBackend && isProFeatureModalOpen &&
                <CustomModal
                    title="Premium Feature"
                    des="Video, Image, and WooCommerce Product hotspots are premium features. Please upgrade to premium to use them."
                    setFn={setIsProFeatureModalOpen}
                    link={siteLocation}
                />
            }

            {activePopupHotspot && (
                <div className="rich-hotspot-modal-overlay" onClick={() => setActivePopupHotspot(null)}>
                    <div className={`rich-hotspot-modal-content modal-${activePopupHotspot.type}`} onClick={(e) => e.stopPropagation()}>
                        <div className="rich-hotspot-modal-header">
                            <h3>{activePopupHotspot.text || (activePopupHotspot.type === 'video' ? 'Video' : 'Image')}</h3>
                            <button className="rich-hotspot-modal-close" onClick={() => setActivePopupHotspot(null)}>&times;</button>
                        </div>
                        <div className="rich-hotspot-modal-body">
                            {activePopupHotspot.type === 'video' && (
                                <div className="video-container-wrapper">
                                    {activePopupHotspot.videoSource === 'self-hosted' ? (
                                        <video src={activePopupHotspot.videoUrl} controls autoPlay />
                                    ) : (
                                        <iframe
                                            src={getEmbedUrl(activePopupHotspot.videoSource, activePopupHotspot.videoUrl)}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            )}
                            {activePopupHotspot.type === 'image' && (
                                <div className="image-container-wrapper">
                                    <img src={activePopupHotspot.imageUrl} alt={activePopupHotspot.text || 'Hotspot Preview'} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const getEmbedUrl = (source, urlOrId) => {
    if (!urlOrId) return '';
    if (source === 'youtube') {
        let videoId = urlOrId;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = urlOrId.match(regExp);
        if (match && match[2].length === 11) {
            videoId = match[2];
        }
        return `https://www.youtube.com/embed/${videoId}`;
    }
    if (source === 'vimeo') {
        let videoId = urlOrId;
        const match = urlOrId.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/posts\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]*)/);
        if (match) {
            videoId = match[1];
        }
        return `https://player.vimeo.com/video/${videoId}`;
    }
    return urlOrId;
};

export default TourViewer;
