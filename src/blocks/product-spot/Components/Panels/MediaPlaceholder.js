import { MediaUpload } from '@wordpress/block-editor';
import { Button, PanelRow, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';


export const MediaPlaceholder = props => {
	const { className = '', onChange, icon = 'format-image', type = 'image', typeName = '', placeholder = __('Paste or type a image URL') } = props;

	const [mediaSource, setMediaSource] = useState();

	return <Placeholder className={`bPlMediaPlaceholder ${className}`} label={__(`Upload ${typeName || type}`)}
		instructions={__(`Upload a ${typeName || type} or paste/write ${typeName || type} url to get started.`)}
		icon={icon}>
			<MediaUpload
				allowedTypes={[type]}
				onSelect={({ id, url, alt, title }) => onChange({ id, url, alt, title })}
				render={({ open }) => <Button isPrimary onClick={open}> {__('Upload')} </Button>}
			/>

		<PanelRow className='bPlUrlInput'>
			<h3> {__('Or')} </h3>
			<input
				type='url'
				aria-label={__('URL')}
				placeholder={placeholder}
				onChange={src => setMediaSource(src.target.value)}
				value={mediaSource}
			/>
			<Button label={__('Apply')} type='submit' onClick={e => {
				e.preventDefault();
				onChange({ id: null, url: mediaSource, alt: '', title: '' });
				setMediaSource('');
			}} >{__('Apply')}</Button>
		</PanelRow>
	</Placeholder>
}