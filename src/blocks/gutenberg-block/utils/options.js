import { __ } from '@wordpress/i18n';

export const panoTypes = [
	{ label: __('Image', 'panorama-block'), value: 'image' },
	{ label: __('Video', 'panorama-block'), value: 'video' }
]

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'panorama-block') },
	{ name: 'style', title: __('Style', 'panorama-block') }
];