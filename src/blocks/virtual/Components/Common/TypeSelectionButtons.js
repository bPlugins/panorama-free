
const TypeSelectionButtons = ({ popupData, setPopupData }) => {
    return (
        <div className='infoAndSceneBtnWrap'>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'info' })}
                style={{ background: popupData.type === 'info' ? '#1e90ff' : '#2a4e6f' }}
                className='infoBtn'
            >
                <span> i </span> Info
            </button>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'scene' })}
                className='sceneBtn'
                style={{ background: popupData.type === 'scene' ? '#1e90ff' : '#2a4e6f' }}
            >
                <span> ↑ </span> Scene
            </button>
            <button
                onClick={() => setPopupData({ ...popupData, type: 'default-view' })}
                className='sceneBtn'
                style={{ background: popupData.type === 'default-view' ? '#1e90ff' : '#2a4e6f' }}
            >
              <span>⚑</span>  Set Default View
            </button>
        </div>
    );
};

export default TypeSelectionButtons;