import { SelectControl } from '@wordpress/components';

const SceneSelect = ({ scenes, popupData, setPopupData, hotspotData, setAttributes }) => {
    return (
        <div className='sceneWrapChild'>
            <label htmlFor="hotspotText" className='label'>Scene : </label>
            <div>
                <SelectControl
                    className="sceneSlBtn"
                    value={popupData.sceneId || ''}
                    onChange={(val) => {
                        setPopupData({
                            ...popupData,
                            sceneId: val,
                            type: 'scene'
                        });
                        const updatedHotspotData = hotspotData.map(spot => {
                            if (spot === popupData.targetHotspot) {
                                return {
                                    ...spot,
                                    sceneId: val,
                                    type: 'scene'
                                };
                            }
                            return spot;
                        });
                        setAttributes({ hotspotData: updatedHotspotData });
                    }}
                    options={scenes.map(scene => {
                        const title = typeof scene.title === 'string' ? scene.title.trim() : '';
                        // Show the scene title; the ID only when there is no title or two scenes share it.
                        const isShared = title && scenes.filter(other => (typeof other.title === 'string' ? other.title.trim() : '') === title).length > 1;
                        return {
                            label: !title ? scene.tour_id : (isShared ? `${title} (${scene.tour_id})` : title),
                            value: scene.tour_id
                        };
                    })}
                />
                <p className="dropdown-label">Choose the Scene</p>
            </div>
        </div>
    );
};

export default SceneSelect;