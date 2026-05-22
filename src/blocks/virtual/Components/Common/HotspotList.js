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
        <div className={`hotspot-container ${tabSl === "index" ? "is-sidebar" : "is-overlay"}`}>
           { tabSl !== "index" && (
                <div className="hotspot-header">
                    <span className="hotspot-header-title">Tour Navigation</span>
                    <button className="crossBtn" onClick={() => setIsHamMenuOpen(false)}>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
           ) } 
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
