import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';


const Settings = ({ deleteDataOnUninstall, uninstallNonce }) => {
    const [enabled, setEnabled] = useState(deleteDataOnUninstall);
    const [notice, setNotice] = useState('');

    const { data, saveData, isLoading, error } = useWPAjax('bppivSaveUninstallOption', { nonce: uninstallNonce }, false);

    useEffect(() => {
        if (data) {
            setEnabled(data.enabled);
            setNotice(data.message);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setNotice(__('Failed to save setting.', 'panorama'));
        }
    }, [error]);

    const handleToggle = () => {
        const newValue = !enabled;

        // Show confirm dialog when enabling (destructive action)
        if (newValue) {
            const confirmed = window.confirm(
                __('Are you sure? This will permanently delete all Panorama Viewer data (panoramas, product spots, virtual tours, and all settings) when the plugin is uninstalled.', 'panorama')
            );

            if (!confirmed) return;
        }

        setNotice('');
        saveData({ enabled: String(newValue) });
    };

    return <div className='bPlDashboardSettings bPlDashboardCard'>
        <h2>{__('Delete Data on Uninstall', 'panorama')}</h2>

        <p>{__('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'panorama')}</p>

        <ul>
            <li>{__('All Panorama posts (bppiv-image-viewer post type)', 'panorama')}</li>
            <li>{__('All Product Spot posts (product_spot post type)', 'panorama')}</li>
            <li>{__('All Virtual Tour posts (virtual_tour post type)', 'panorama')}</li>
            <li>{__('All panorama and hotspot configurations and metadata', 'panorama')}</li>
            <li>{__('All plugin settings and options', 'panorama')}</li>
        </ul>

        <p className='settingsWarning'>
            {__('⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.', 'panorama')}
        </p>

        <div className='settingsControl'>
            <label className='toggleControl'>
                <input type='checkbox' checked={enabled} onChange={handleToggle} disabled={isLoading} />

                <span className='toggleSlider' />
            </label>

            <span className='toggleLabel'>
                {enabled
                    ? __('Data will be deleted on uninstall', 'panorama')
                    : __('Data will be preserved on uninstall', 'panorama')
                }
            </span>
        </div>

        {notice && <div className={`settingsNotice ${enabled ? 'warning' : 'success'}`}>{notice}</div>}
    </div>;
};
export default Settings;
