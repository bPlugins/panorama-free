import React from 'react';
import { __ } from '@wordpress/i18n';

const LinkHotspotInput = ({ popupData, setPopupData }) => {
    return (
        <div className='infoWrap'>
            <h3>{__('Setup Link Hotspot', 'panorama')}</h3>
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
                <label className='label' htmlFor="hotspotUrl">{__('URL:', 'panorama')}</label>
                <div>
                    <input
                        id="hotspotUrl"
                        type="url"
                        placeholder={__('https://example.com', 'panorama')}
                        value={popupData.linkUrl || ''}
                        onChange={(e) => setPopupData({ ...popupData, linkUrl: e.target.value })}
                        className='infoInput'
                    />
                    <p>{__('Enter the redirection link', 'panorama')}</p>
                </div>
            </div>
            <div className='infoChildWrap' style={{ marginTop: '10px' }}>
                <label className='label' htmlFor="hotspotTarget">{__('Target:', 'panorama')}</label>
                <div>
                    <select
                        id="hotspotTarget"
                        value={popupData.linkTarget || '_blank'}
                        onChange={(e) => setPopupData({ ...popupData, linkTarget: e.target.value })}
                        className='infoInput'
                        style={{ background: 'rgba(0, 0, 0, 0.5)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    >
                        <option value="_blank">{__('New Tab (_blank)', 'panorama')}</option>
                        <option value="_self">{__('Same Tab (_self)', 'panorama')}</option>
                    </select>
                    <p>{__('Choose how to open the link', 'panorama')}</p>
                </div>
            </div>
        </div>
    );
};

export default LinkHotspotInput;
