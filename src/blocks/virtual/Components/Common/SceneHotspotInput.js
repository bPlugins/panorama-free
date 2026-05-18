import React, { useEffect } from "react";

import SceneSelect from "./SceneSelect";
import TargetSelect from "./TargetSelect";

const SceneHotspotInput = ({ scenes, setAttributes,currentScene, popupData, setPopupData, hotspotData, isDropdownOpen, setIsDropdownOpen }) => {
    
    useEffect(() => {
        if(currentScene.tour_id !== scenes[0].tour_id){
        setPopupData({
            ...popupData,
            sceneId: scenes[0].tour_id
        })
        }
    }, [])

    // Get the current scene based on popupData.sceneId
    const currentSelectedScene = scenes.find(scene => scene.tour_id === popupData.sceneId) || scenes[0];
    // Check if current scene has hotspots
    const hasHotspots = currentSelectedScene.hotSpots && currentSelectedScene.hotSpots.length > 0;

    return (
         <div className='sceneWrap'>
                <SceneSelect {...{ scenes, popupData, setPopupData, setAttributes, hotspotData }} />
               
                {hasHotspots && <TargetSelect {...{ scenes,popupData, setPopupData, hotspotData, isDropdownOpen, setIsDropdownOpen }} /> } 

                <div className="input-container">
                    <label htmlFor="hotspotText" className="input-label">Label : </label>
                    <div>
                        <input
                            id="hotspotText"
                            type="text"
                            placeholder="Input type text..."
                            value={popupData.text}
                            onChange={(e) => setPopupData({ ...popupData, text: e.target.value })}
                            className="input-field"
                        />
                        <p className="input-description"> Enter a label </p>
                    </div>
                </div>
                
            </div> 
    );
};

export default SceneHotspotInput;