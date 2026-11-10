import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import NewBadge from '../../components/NewBadge/NewBadge';
import { Notice } from '../../../../bpl-tools/Components';
import './editor.scss';

// The plugin's pricing page, in a new tab so the editor keeps unsaved changes.
const pricingUrl = () => `${window.location.href.split('/wp-admin/')[0]}/wp-admin/edit.php?post_type=bppiv-image-viewer&page=bppiv-support#/pricing`;

// Blocks of this plugin; the panel shows only on pages that use one.
const isPanoramaBlock = (name = '') => name.startsWith('panorama/') || 'psb/product-spot' === name || 'bpgb/panorama' === name;
const hasPanoramaBlock = (blocks = []) => blocks.some((block) => isPanoramaBlock(block.name) || hasPanoramaBlock(block.innerBlocks));

// QR Code is a Pro feature: the free version shows what it does.
const QrCodePanel = () => {
	const usesPanorama = useSelect((select) => hasPanoramaBlock(select('core/block-editor').getBlocks()), []);
	const PanelComponent = window.wp?.editor?.PluginDocumentSettingPanel || window.wp?.editPost?.PluginDocumentSettingPanel;
	if (!usesPanorama || !PanelComponent) {
		return null;
	}
	return (
		<PanelComponent name="bppiv-qr-code" title={<>{__('Panorama QR Code', 'panorama')}<NewBadge /></>} className="bppiv-qr-panel">
			<Notice status="premium" isIcon={true} className="bppiv-qr-panel__notice">
				{__('QR Code is available in the Pro version! Get a QR code for this page to print on brochures, signs and flyers, or to share, so visitors open your 360° tour on their phone.', 'panorama')}
				{' '}
				<a href={pricingUrl()} target="_blank" rel="noopener noreferrer">{__('Upgrade to Pro', 'panorama')}</a>
			</Notice>
		</PanelComponent>
	);
};

registerPlugin('bppiv-qr-code', { render: QrCodePanel });
