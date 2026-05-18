import { produce } from "immer";

export const createModifiedHotspots = (scenes, currentScene, spot, isBackend, index, setPopupData, setAttributes, isLabel) => ({
    ...spot,
    createTooltipFunc: (hotSpotDiv) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'hotspot-title-tooltip';
        tooltip.innerHTML = spot.text || (spot.type === 'scene' ? 'Scene' : 'Info');
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
    clickHandlerFunc: () => {
        if (spot.type === 'scene' && spot.lookAt) {
            window?.viewer.lookAt(spot.lookAt.pitch, spot.lookAt.yaw);
        } else {
            window?.viewer.lookAt(spot.pitch, spot.yaw);
        }
    },
});

export const initializePannellumViewer = (panoRef, modifiedScenes, options = {}) => {
    const { hideDefaultCtrl, isRotate, autoRotateSpeed, autoRotateInactivityDelay, compass, mouseZoom, draggable, disableKeyboardCtrl, doubleClickZoom } = options;

    const viewer = window.pannellum.viewer(panoRef.current, {
        autoLoad: true,
        showFullscreenCtrl: !hideDefaultCtrl,
        showZoomCtrl: !hideDefaultCtrl,
        autoRotate: isRotate ? autoRotateSpeed : 0,
        autoRotateInactivityDelay,
        compass,
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

    if (!isPremium && currentSceneHotspots.length >= 3) {
        setIsHotspotModalViewerOpen(true);
        return;
    }

    const newHotspot = {
        pitch: popupData.pitch,
        yaw: popupData.yaw,
        sceneId: popupData.sceneId,
        text: popupData.text,
        type: popupData.type,
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
    const { panorama } = currentScene || {};

    { panorama && viewer?.removeHotSpot("temp-hotspot"); }

    {
        panorama && viewer?.addHotSpot({
            id: "temp-hotspot",
            pitch: hotspot.pitch,
            yaw: hotspot.yaw,
            type: "custom",
            cssClass: "add-hotspot-icon",
            createTooltipFunc: (hotSpotDiv) => {
                hotSpotDiv.innerHTML = "+";
                hotSpotDiv.style.cursor = "move";

                let startX, startY;
                let startPitch, startYaw;

                const handleMouseDown = (e) => {
                    e.stopPropagation();
                    isDraggingRef.current = false;
                    startX = e.clientX;
                    startY = e.clientY;
                    startPitch = hotspot.pitch;
                    startYaw = hotspot.yaw;
                    setIsDraggingHotspot(false);
                };

                const handleMouseMove = (e) => {
                    const dx = Math.abs(e.clientX - startX);
                    const dy = Math.abs(e.clientY - startY);

                    if (dx > 5 || dy > 5) {
                        isDraggingRef.current = true;
                        setIsDraggingHotspot(true);

                        const sensitivity = 0.3;
                        const moveX = (e.clientX - startX) * sensitivity;
                        const moveY = (startY - e.clientY) * sensitivity;

                        const newPitch = Math.max(-90, Math.min(90, startPitch + moveY));
                        const newYaw = (startYaw + moveX) % 360;

                        setTempHotspot({ pitch: newPitch, yaw: newYaw });
                    }
                };

                const handleMouseUp = () => {
                    if (!isDraggingRef.current) {
                        setPopupData({
                            pitch: hotspot.pitch,
                            yaw: hotspot.yaw,
                            text: "",
                        });
                    }
                    isDraggingRef.current = false;
                    setIsDraggingHotspot(false);
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                };

                hotSpotDiv.addEventListener("mousedown", (e) => {
                    handleMouseDown(e);
                    document.addEventListener("mousemove", handleMouseMove);
                    document.addEventListener("mouseup", handleMouseUp);
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

    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Edit clicked');
        setPopupData({
            pitch: spot.pitch,
            yaw: spot.yaw,
            text: spot.text,
            type: spot.type,
            targetHotspot: spot.lookAt,
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

export const handleMouseDownEvent = (event, popupData, isDraggingHotspot, clickStartCoords) => {
    if (popupData || isDraggingHotspot) return;

    clickStartCoords.current = {
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
    };
};

export const handleMouseUpEvent = (event, viewer, clickStartCoords, popupData, isDraggingHotspot, setTempHotspot) => {
    if (!clickStartCoords.current || popupData || isDraggingHotspot) return;

    const isClick =
        Math.abs(event.clientX - clickStartCoords.current.x) < 5 &&
        Math.abs(event.clientY - clickStartCoords.current.y) < 5 &&
        Date.now() - clickStartCoords.current.time < 200;

    if (isClick) {
        const coords = viewer.mouseEventToCoords(event);
        setTempHotspot({
            pitch: coords[0],
            yaw: coords[1],
        });
    }

    clickStartCoords.current = null;
};