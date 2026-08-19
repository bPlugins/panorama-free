import { produce } from "immer";

export const updateData = (attr, value, ...props) => {
    if (props.length === 0) {
        return value;
    }
    const [currentProp, ...remainingProps] = props;
    if (remainingProps.length === 0) {
        return produce(attr, draft => {
            draft[currentProp] = value;
        });
    }
    return produce(attr, draft => {
        if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
            draft[currentProp] = {};
        }
        draft[currentProp] = updateData(draft[currentProp], value, ...remainingProps);
    });
};

export const createModifiedHotspots = (scenes, currentScene, spot, isBackend, index, setPopupData, setAttributes, isLabel, setActivePopupHotspot) => ({
    ...spot,
    cssClass: ['link', 'video', 'image'].includes(spot.type) ? `pnlm-hotspot pnlm-${spot.type}` : undefined,
    createTooltipFunc: (hotSpotDiv) => {
        if (['link', 'video', 'image'].includes(spot.type)) {
            const innerIcon = document.createElement('div');
            innerIcon.className = 'hotspot-inner-icon';
            hotSpotDiv.appendChild(innerIcon);
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'hotspot-title-tooltip';
        tooltip.innerHTML = spot.text || (spot.type === 'scene' ? 'Scene' : spot.type === 'link' ? 'Link' : spot.type === 'video' ? 'Video' : spot.type === 'image' ? 'Image' : 'Info');
        hotSpotDiv.appendChild(tooltip);

        if (!isLabel) {
            hotSpotDiv.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });
            hotSpotDiv.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        } else {
            tooltip.style.display = 'block';
        }

        isBackend && editAndDeleteTooltipFunc(scenes, currentScene, hotSpotDiv, spot, index, setPopupData, setAttributes);
    },
    clickHandlerFunc: (event) => {
        if (event && event.target && (event.target.closest('.edit-btn') || event.target.closest('.delete-btn') || event.target.closest('.action-buttons'))) {
            return;
        }
        if (spot.type === 'scene' && spot.lookAt) {
            window?.viewer.lookAt(spot.lookAt.pitch, spot.lookAt.yaw);
        } else if (spot.type === 'link') {
            if (spot.linkUrl) {
                if (spot.linkTarget === '_self') {
                    window.location.href = spot.linkUrl;
                } else {
                    window.open(spot.linkUrl, spot.linkTarget || '_blank');
                }
            }
        } else if (spot.type === 'video' || spot.type === 'image') {
            if (setActivePopupHotspot) {
                setActivePopupHotspot(spot);
            }
        } else {
            window?.viewer.lookAt(spot.pitch, spot.yaw);
        }
    },
});

export const initializePannellumViewer = (panoRef, modifiedScenes, options = {}, isBackend = false, firstSceneId = null) => {
    const { hideDefaultCtrl, isRotate, autoRotateSpeed, autoRotateInactivityDelay, compass, orientation = false, mouseZoom, draggable, disableKeyboardCtrl, doubleClickZoom } = options;

    const firstScene = firstSceneId || Object.keys(modifiedScenes)[0] || "";

    const viewer = window.pannellum.viewer(panoRef.current, {
        default: {
            firstScene,
        },
        autoLoad: true,
        showFullscreenCtrl: !hideDefaultCtrl,
        showZoomCtrl: !hideDefaultCtrl,
        autoRotate: isRotate ? autoRotateSpeed : 0,
        autoRotateInactivityDelay,
        compass,
        orientationOnByDefault: !isBackend && Boolean(orientation),
        mouseZoom,
        draggable,
        disableKeyboardCtrl,
        doubleClickZoom,
        scenes: modifiedScenes,
    });

    return viewer;
};

export const saveHotspot = (popupData, scenes, currentScene, setAttributes, setPopupData, setTempHotspot, isPremium, setIsHotspotModalViewerOpen) => {
    if (!popupData.type) return;

    if (popupData.type === 'default-view') {
        const newScenes = produce(scenes, (draft) => {
            draft.map((scene) => {
                if (scene.tour_id === currentScene.tour_id) {
                    scene.pitch = window.viewer.getPitch();
                    scene.yaw = window.viewer.getYaw();
                    scene.hfov = window.viewer.getHfov();
                }
            })
        })
        setAttributes({ scenes: newScenes });
        setPopupData(null);
        setTempHotspot(null);
        return;
    }

    const currentSceneHotspots = currentScene.hotSpots || [];

    if (!isPremium && currentSceneHotspots.length >= 6) {
        setIsHotspotModalViewerOpen(true);
        return;
    }

    const newHotspot = {
        pitch: popupData.pitch,
        yaw: popupData.yaw,
        sceneId: popupData.sceneId,
        text: popupData.text,
        type: popupData.type,
        linkUrl: popupData.linkUrl,
        linkTarget: popupData.linkTarget || '_blank',
        videoSource: popupData.videoSource,
        videoUrl: popupData.videoUrl,
        imageUrl: popupData.imageUrl,
        ...(popupData.type === 'scene' && popupData.targetHotspot && {
            lookAt: {
                pitch: popupData.targetHotspot.pitch,
                yaw: popupData.targetHotspot.yaw,
            },
            targetPitch: popupData.targetHotspot.pitch,
            targetYaw: popupData.targetHotspot.yaw,
        })
    };

    const newScenes = produce(scenes, (draft) => {
        draft.map((scene) => {
            if (scene.tour_id === currentScene.tour_id) {
                if (popupData.index !== undefined) {
                    scene.hotSpots[popupData.index] = newHotspot;
                } else {
                    scene.hotSpots?.push(newHotspot);
                }
            }
        })
    });

    setAttributes({ scenes: newScenes });
    setPopupData(null);
    setTempHotspot(null);

    setTimeout(() => {
        if (window?.viewer) {
            window.viewer.lookAt(newHotspot.pitch, newHotspot.yaw, window.viewer.getHfov());
        }
    }, 100);
};

export const addTempHotspot = (currentScene, viewer, hotspot, isDraggingRef, setIsDraggingHotspot, setPopupData, setTempHotspot) => {
    const isCubemap = currentScene?.panoramaFormat === 'cubemap';
    const isAllFacesUploaded = Boolean(
        currentScene?.cubeMap?.front &&
        currentScene?.cubeMap?.right &&
        currentScene?.cubeMap?.back &&
        currentScene?.cubeMap?.left &&
        currentScene?.cubeMap?.up &&
        currentScene?.cubeMap?.down
    );
    const hasImage = Boolean(currentScene?.panorama || (isCubemap && isAllFacesUploaded));

    if (hasImage && viewer) {
        try {
            viewer.removeHotSpot("temp-hotspot");
        } catch (e) {
            // Hotspot might not exist yet
        }

        viewer.addHotSpot({
            id: "temp-hotspot",
            pitch: hotspot.pitch,
            yaw: hotspot.yaw,
            type: "custom",
            cssClass: "add-hotspot-icon",
            createTooltipFunc: (hotSpotDiv) => {
                hotSpotDiv.innerHTML = "+";
                hotSpotDiv.style.cursor = "move";

                let startX, startY;

                const handleMouseDown = (e) => {
                    e.stopPropagation();
                    isDraggingRef.current = false;
                    startX = e.clientX;
                    startY = e.clientY;
                    setIsDraggingHotspot(false);
                };

                const handleMouseMove = (e) => {
                    if ((e.buttons & 1) === 0) {
                        handleMouseUp(e);
                        return;
                    }

                    const dx = Math.abs(e.clientX - startX);
                    const dy = Math.abs(e.clientY - startY);

                    if (dx > 10 || dy > 10) {
                        isDraggingRef.current = true;
                        setIsDraggingHotspot(true);

                        const coords = viewer.mouseEventToCoords(e);
                        if (coords) {
                            const config = viewer.getConfig();
                            if (config && config.hotSpots) {
                                const hs = config.hotSpots.find(h => h.id === "temp-hotspot");
                                if (hs) {
                                    hs.pitch = coords[0];
                                    hs.yaw = coords[1];
                                }
                            }
                            viewer.resize();
                        }
                    }
                };

                const handleMouseUp = (e) => {
                    if (!isDraggingRef.current) {
                        setPopupData({
                            pitch: hotspot.pitch,
                            yaw: hotspot.yaw,
                            text: "",
                        });
                    } else if (e) {
                        const coords = viewer.mouseEventToCoords(e);
                        if (coords) {
                            setTempHotspot({ pitch: coords[0], yaw: coords[1] });
                            if (setPopupData) {
                                setPopupData((prev) => {
                                    if (prev) {
                                        return {
                                            ...prev,
                                            pitch: coords[0],
                                            yaw: coords[1]
                                        };
                                    }
                                    return prev;
                                });
                            }
                        }
                    }
                    isDraggingRef.current = false;
                    setIsDraggingHotspot(false);
                    document.removeEventListener("mousemove", handleMouseMove, { capture: true });
                    document.removeEventListener("mouseup", handleMouseUp, { capture: true });
                };

                hotSpotDiv.addEventListener("mousedown", (e) => {
                    handleMouseDown(e);
                    document.addEventListener("mousemove", handleMouseMove, { capture: true });
                    document.addEventListener("mouseup", handleMouseUp, { capture: true });
                });
            },
            clickHandlerFunc: (event) => {
                event.stopPropagation();
            },
        });
    }
};

export const editAndDeleteTooltipFunc = (scenes, currentScene, hotSpotDiv, spot, index, setPopupData, setAttributes) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'hotspot-tooltip';

    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '📝';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '❌';

    actionButtons.appendChild(editBtn);
    actionButtons.appendChild(deleteBtn);
    wrapper.appendChild(actionButtons);

    const blockPropagation = (e) => e.stopPropagation();
    editBtn.addEventListener('mousedown', blockPropagation);
    editBtn.addEventListener('mouseup', blockPropagation);
    deleteBtn.addEventListener('mousedown', blockPropagation);
    deleteBtn.addEventListener('mouseup', blockPropagation);

    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setPopupData({
            pitch: spot.pitch,
            yaw: spot.yaw,
            text: spot.text,
            type: spot.type,
            sceneId: spot.sceneId,
            targetHotspot: spot.lookAt || (spot.targetPitch !== undefined ? { pitch: spot.targetPitch, yaw: spot.targetYaw } : undefined),
            linkUrl: spot.linkUrl,
            linkTarget: spot.linkTarget,
            videoSource: spot.videoSource,
            videoUrl: spot.videoUrl,
            imageUrl: spot.imageUrl,
            index
        });
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (hotSpotDiv && hotSpotDiv.parentNode) {
            hotSpotDiv.parentNode.removeChild(hotSpotDiv);
        }

        const updatedScenes = produce(scenes, (draft) => {
            draft.map((scene) => {
                if (scene?.tour_id === currentScene?.tour_id) {
                    scene.hotSpots = scene.hotSpots.filter((_, i) => i !== index);
                }
            });
        });

        setAttributes({ scenes: updatedScenes });
    });

    hotSpotDiv.appendChild(wrapper);
};

export const handleMouseDownEvent = (event, popupDataRef, isDraggingHotspotRef, clickStartCoords) => {
    if (popupDataRef?.current || isDraggingHotspotRef?.current) {
        return;
    }

    clickStartCoords.current = {
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
    };
};

export const handleMouseUpEvent = (event, viewer, clickStartCoords, popupDataRef, isDraggingHotspotRef, setTempHotspot, setPopupData) => {
    if (!clickStartCoords.current || popupDataRef?.current || isDraggingHotspotRef?.current) {
        return;
    }

    const dx = Math.abs(event.clientX - clickStartCoords.current.x);
    const dy = Math.abs(event.clientY - clickStartCoords.current.y);
    const dt = Date.now() - clickStartCoords.current.time;
    const isClick = dx < 10 && dy < 10 && dt < 350;

    if (isClick) {
        const coords = viewer.mouseEventToCoords(event);
        if (coords) {
            setTempHotspot({
                pitch: coords[0],
                yaw: coords[1],
            });
            if (setPopupData) {
                setPopupData({
                    pitch: coords[0],
                    yaw: coords[1],
                    text: "",
                });
            }
        }
    }

    clickStartCoords.current = null;
};