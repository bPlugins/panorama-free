import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import { panoramaIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: panoramaIcon,
	edit: Edit,
	save: () => null
});