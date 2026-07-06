import React from 'react';
import { __ } from '@wordpress/i18n';
import { InlineMediaUpload } from "../../../../../../bpl-tools/Components";

const ImageHotspotInput = ({ popupData, setPopupData }) => {
    return (
        <div className='infoWrap'>
            <h3>{__('Setup Image Hotspot', 'panorama')}</h3>
            <hr />
            <div className='infoChildWrap'>
                <label className='label' htmlFor="hotspotText">{__('Label:', 'panorama')}</label>
                <div>
                    <input
                        id="hotspotText"
                        type="text"
                        placeholder={__('Input text label...', 'panorama')}
                        value={popupData.text || ''}
                        onChange={(e) => setPopupData({ ...popupData, text: e.target.value })}
                        className='infoInput'
                    />
                    <p>{__('Enter a label', 'panorama')}</p>
                </div>
            </div>
            
            <div className='infoChildWrap' style={{ marginTop: '10px' }}>
                <label className='label' htmlFor="imageUrl">{__('Image:', 'panorama')}</label>
                <div>
                    <div className="bPlInlineMediaUpload" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '6px' }}>
                        <InlineMediaUpload
                            value={popupData.imageUrl || ''}
                            onChange={(v) => setPopupData({ ...popupData, imageUrl: v })}
                            label={__('Select Image', 'panorama')}
                            placeholder={__('Enter or upload image URL', 'panorama')}
                        />
                    </div>
                    <p>{__('Select or upload an image to display in the hotspot', 'panorama')}</p>
                </div>
            </div>
        </div>
    );
};

export default ImageHotspotInput;
