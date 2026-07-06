import { __ } from '@wordpress/i18n';

const TypeSelectionButtons = ({ popupData, setPopupData, isPremium, setIsProFeatureModalOpen }) => {
    const handleProClick = (type) => {
        if (isPremium) {
            setPopupData({ ...popupData, type });
        } else {
            setIsProFeatureModalOpen(true);
        }
    };

    return (
        <div className='infoAndSceneBtnWrap' style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'info' })}
                style={{ background: popupData.type === 'info' ? '#1e90ff' : '#2a4e6f' }}
                className='infoBtn'
            >
                <span> i </span> {__('Info', 'panorama')}
            </button>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'scene' })}
                className='sceneBtn'
                style={{ background: popupData.type === 'scene' ? '#1e90ff' : '#2a4e6f' }}
            >
                <span> ↑ </span> {__('Scene', 'panorama')}
            </button>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'link' })}
                className='sceneBtn'
                style={{ background: popupData.type === 'link' ? '#1e90ff' : '#2a4e6f' }}
            >
                <span> 🔗 </span> {__('Link', 'panorama')}
            </button>
            <button
                onClick={() => handleProClick('video')}
                className='sceneBtn'
                style={{ background: popupData.type === 'video' ? '#1e90ff' : '#2a4e6f' }}
            >
                <span> 🎥 </span> {__('Video', 'panorama')} {!isPremium && '🔒'}
            </button>
            <button
                onClick={() => handleProClick('image')}
                className='sceneBtn'
                style={{ background: popupData.type === 'image' ? '#1e90ff' : '#2a4e6f' }}
            >
                <span> 🖼️ </span> {__('Image', 'panorama')} {!isPremium && '🔒'}
            </button>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'default-view' })}
                className='sceneBtn'
                style={{ background: popupData.type === 'default-view' ? '#1e90ff' : '#2a4e6f', width: '100%', flex: 'none' }}
            >
              <span>⚑</span>  {__('Set Default View', 'panorama')}
            </button>
        </div>
    );
};

export default TypeSelectionButtons;