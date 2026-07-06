
const SaveCancelButtons = ({onSave, onCancel, popupData }) => {
    
    return (
        <div className='saveAndCancelWrap'>
            {popupData.type && (
                <button onClick={onSave} className="saveBtn" >
                    {popupData.type === 'scene' ? 'Save Scene' : popupData.type === 'info' ?  'Save Info' : popupData.type === 'link' ? 'Save Link' : popupData.type === 'video' ? 'Save Video' : popupData.type === 'image' ? 'Save Image' : 'Save Default View'}
                </button>
            )}
            <button
                className="closeBtn"
                onClick={onCancel}
            >
              Cancel
            </button>
        </div>
    );
};

export default SaveCancelButtons;