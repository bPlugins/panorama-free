
const SaveCancelButtons = ({ onSave, onCancel, popupData }) => {

    return (
        <div className='saveAndCancelWrap'>
            {popupData.type && (
                <button onClick={onSave} className="saveBtn" >
                    {popupData.type === 'scene' ? 'Save Scene' : popupData.type === 'info' ? 'Save Info' : popupData.type === 'link' ? 'Save Link' : popupData.type === 'video' ? 'Save Video' : popupData.type === 'image' ? 'Save Image' : popupData.type === 'product' ? 'Save Product' : popupData.type === 'default-view' ? 'Save Default View' : 'Save'}
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