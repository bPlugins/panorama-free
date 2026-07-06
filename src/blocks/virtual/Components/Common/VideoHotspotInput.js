import React from 'react';
import { __ } from '@wordpress/i18n';
import { InlineMediaUpload } from "../../../../../../bpl-tools/Components";

const VideoHotspotInput = ({ popupData, setPopupData }) => {
    const videoSource = popupData.videoSource || 'youtube';

    return (
        <div className='infoWrap'>
            <h3>{__('Setup Video Hotspot', 'panorama')}</h3>
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
                <label className='label' htmlFor="videoSource">{__('Source:', 'panorama')}</label>
                <div>
                    <select
                        id="videoSource"
                        value={videoSource}
                        onChange={(e) => setPopupData({ ...popupData, videoSource: e.target.value, videoUrl: '' })}
                        className='infoInput'
                        style={{ background: 'rgba(0, 0, 0, 0.5)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                    >
                        <option value="youtube">{__('YouTube', 'panorama')}</option>
                        <option value="vimeo">{__('Vimeo', 'panorama')}</option>
                        <option value="self-hosted">{__('Self Hosted', 'panorama')}</option>
                    </select>
                    <p>{__('Select the video source type', 'panorama')}</p>
                </div>
            </div>

            <div className='infoChildWrap' style={{ marginTop: '10px' }}>
                <label className='label' htmlFor="videoUrl">{__('Video:', 'panorama')}</label>
                <div>
                    {videoSource === 'self-hosted' ? (
                        <div className="bPlInlineMediaUpload" style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '6px' }}>
                            <InlineMediaUpload
                                value={popupData.videoUrl || ''}
                                onChange={(v) => setPopupData({ ...popupData, videoUrl: v })}
                                label={__('Select Video', 'panorama')}
                                placeholder={__('Enter or upload video URL', 'panorama')}
                            />
                        </div>
                    ) : (
                        <input
                            id="videoUrl"
                            type="text"
                            placeholder={videoSource === 'youtube' ? __('YouTube Video URL or ID...', 'panorama') : __('Vimeo Video URL or ID...', 'panorama')}
                            value={popupData.videoUrl || ''}
                            onChange={(e) => setPopupData({ ...popupData, videoUrl: e.target.value })}
                            className='infoInput'
                        />
                    )}
                    <p>
                        {videoSource === 'youtube' && __('Enter YouTube URL or Video ID (e.g. dF7N5h6t9zY)', 'panorama')}
                        {videoSource === 'vimeo' && __('Enter Vimeo URL or Video ID (e.g. 76979871)', 'panorama')}
                        {videoSource === 'self-hosted' && __('Upload video or enter URL', 'panorama')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoHotspotInput;
