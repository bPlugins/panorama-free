import TypeSelectionButtons from './TypeSelectionButtons';
import InfoHotspotInput from './InfoHotspotInput';
import SceneHotspotInput from './SceneHotspotInput';
import LinkHotspotInput from './LinkHotspotInput';
import VideoHotspotInput from './VideoHotspotInput';
import ImageHotspotInput from './ImageHotspotInput';
import SaveCancelButtons from './SaveCancelButtons';

const PopupWrapper = ({ scenes, setAttributes, currentScene, popupData, setPopupData, hotspotData, isDropdownOpen, setIsDropdownOpen, setTempHotspot, handleSaveHotspot, isPremium, setIsProFeatureModalOpen }) => {
    return (
        <div className="popupWrapper">
            <div className='selectSceneOrInfo'> What do you want to add at this point? </div>
            <TypeSelectionButtons {...{ popupData, setPopupData, isPremium, setIsProFeatureModalOpen }} />

            {popupData.type === 'info' && <InfoHotspotInput {...{ popupData, setPopupData }} />}

            {popupData.type === 'scene' && (<SceneHotspotInput {...{ scenes, setAttributes, currentScene, popupData, setPopupData, hotspotData, isDropdownOpen, setIsDropdownOpen, setTempHotspot }} />)}

            {popupData.type === 'link' && <LinkHotspotInput {...{ popupData, setPopupData }} />}

            {popupData.type === 'video' && <VideoHotspotInput {...{ popupData, setPopupData }} />}

            {popupData.type === 'image' && <ImageHotspotInput {...{ popupData, setPopupData }} />}

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