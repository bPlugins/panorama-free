import React, { useEffect, useRef, useState } from "react";

const HotspotList = ({ scenes, viewerRef, setIsHamMenuOpen, tabSl, currentScene }) => {
    const [selectedSceneId, setSelectedSceneId] = useState(null);
    const [activeHotspotKey, setActiveHotspotKey] = useState(null);
    const hotspotRefs = useRef({});

    useEffect(() => {
        if (currentScene) {
            setSelectedSceneId(currentScene.tour_id);
        }
    }, [currentScene]);

    const handleSceneClick = (sceneId) => {
        setSelectedSceneId(sceneId);
        viewerRef.current?.loadScene(sceneId);
    };

    const handleHotspotClick = (spot) => {
        viewerRef.current?.lookAt(spot.pitch, spot.yaw);
    };

    return (
        <div className="hotspot-container">
           { tabSl !== "index" && <button className="crossBtn" onClick={() => setIsHamMenuOpen(false)}>X</button> } 
            <div className="hotspot-scroll">
                {scenes?.map((scene) => {
                    const isSelected = selectedSceneId === scene.tour_id;

                    return (
                        <div key={scene.tour_id} className="hotspot-scene">
                            <div
                                className={`hotspot-scene-title ${isSelected ? "active" : ""}`}
                                onClick={() => handleSceneClick(scene.tour_id)}
                            >
                                {scene.title === "" ? "Untitled" : scene.title}
                            </div>

                            {isSelected && (
                                <div className="hotspot-list">
                                    {scene.hotSpots?.length > 0 ? (
                                        scene.hotSpots.map((spot, i) => {
                                            const key = `${scene.tour_id}-${i}`;
                                            return (
                                                <div
                                                    key={key}
                                                    ref={(el) => (hotspotRefs.current[key] = el)}
                                                    onClick={() => {
                                                        setActiveHotspotKey(key);
                                                        handleHotspotClick(spot);
                                                    }}
                                                    className={`hotspot-item ${
                                                        activeHotspotKey === key ? "active" : ""
                                                    }`}
                                                >
                                                    <span className={`hotspot-icon ${spot.type === 'scene' ? 'scene' : 'info'}`}>
                                                        {spot.type === 'scene' ? '↑' : 'i'}
                                                    </span>
                                                    {spot.text}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="hotspot-empty">No hotspots found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HotspotList;
