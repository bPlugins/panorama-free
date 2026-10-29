/**
 * Elementor-editor replacements for the bpl-tools media components used by the
 * virtual tour hotspot editor.
 *
 * The originals depend on @wordpress/block-editor's MediaUpload, which only
 * works inside the block editor. Inside Elementor the WordPress media modal
 * (wp.media) is always available, so these versions open it directly.
 * This file is swapped in only for the Elementor editor bundle
 * (see webpack.elementor.config.js); the blocks keep using bpl-tools.
 */
import { useState } from 'react';
import { Button, Placeholder, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const openMediaFrame = (types, onSelect) => {
	if (!window.wp || typeof window.wp.media !== 'function') {
		return;
	}

	const frame = window.wp.media({
		library: { type: types },
		multiple: false
	});

	frame.on('select', () => {
		const attachment = frame.state().get('selection').first().toJSON();
		onSelect(attachment);
	});

	frame.open();
};

export const InlineMediaUpload = ({ className = '', label = '', value, types = ['image'], onChange, placeholder }) => (
	<div className={className}>
		{label && <p className="bppiv-el-media-label">{label}</p>}

		<div className="bPlInlineMediaUpload bppiv-el-inline-media">
			<TextControl
				value={value || ''}
				onChange={(val) => onChange(val)}
				placeholder={placeholder || __('Enter URL', 'panorama')}
				__nextHasNoMarginBottom
			/>

			<Button
				variant="primary"
				icon="upload"
				label={__('Select from Media Library', 'panorama')}
				onClick={() => openMediaFrame(types, (media) => onChange(media.url))}
			/>
		</div>
	</div>
);

export const MediaPlaceholder = ({ className = '', onChange, icon = 'format-image', type = 'image', placeholder }) => {
	const [url, setUrl] = useState('');

	return (
		<Placeholder className={`bPlMediaPlaceholder ${className}`} icon={icon} label={__('Upload Media', 'panorama')}>
			<Button variant="primary" onClick={() => openMediaFrame([type], ({ id, url: src, alt, title }) => onChange({ id, url: src, alt, title }))}>
				{__('Upload', 'panorama')}
			</Button>

			<div className="bppiv-el-inline-media">
				<TextControl
					value={url}
					onChange={setUrl}
					placeholder={placeholder || __('Paste or type an image URL', 'panorama')}
					__nextHasNoMarginBottom
				/>
				<Button
					variant="secondary"
					onClick={() => {
						onChange({ id: null, url, alt: '', title: '' });
						setUrl('');
					}}
				>
					{__('Apply', 'panorama')}
				</Button>
			</div>
		</Placeholder>
	);
};
