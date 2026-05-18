import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';

registerBlockType(metadata, {
	icon: 'video-alt',
	edit: Edit
});