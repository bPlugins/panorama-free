import TypeSelectionButtons from './TypeSelectionButtons';
import InfoHotspotInput from './InfoHotspotInput';
import SceneHotspotInput from './SceneHotspotInput';
import SaveCancelButtons from './SaveCancelButtons';

const PopupWrapper = ({scenes, setAttributes, currentScene, popupData,setPopupData,hotspotData,isDropdownOpen,setIsDropdownOpen,setTempHotspot,handleSaveHotspot}) => {
    return (
        <div className="popupWrapper">
            <div className='selectSceneOrInfo'> What do you want to add in this point? </div>
            <TypeSelectionButtons {...{ popupData,setPopupData }} />
            
            {popupData.type === 'info' &&  <InfoHotspotInput {...{ popupData,setPopupData }} /> }

            {popupData.type === 'scene' && ( <SceneHotspotInput {...{ scenes, setAttributes, currentScene, popupData, setPopupData, hotspotData, isDropdownOpen, setIsDropdownOpen, setTempHotspot }} /> )}

            <SaveCancelButtons
                onSave={handleSaveHotspot}
                onCancel={() => {
                    setPopupData(null);
                    setTempHotspot(null);
                }}
                popupData={popupData}
            />
        </div>
    );
};

export default PopupWrapper;