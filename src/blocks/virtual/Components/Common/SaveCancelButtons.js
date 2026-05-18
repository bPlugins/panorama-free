
const SaveCancelButtons = ({onSave, onCancel, popupData }) => {
    
    return (
        <div className='saveAndCancelWrap'>
            {popupData.type && (
                <button onClick={onSave} className="saveBtn" >
                    {popupData.type === 'scene' ? 'Save Scene' : popupData.type === 'info' ?  'Save Info' : 'Save default view '}
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