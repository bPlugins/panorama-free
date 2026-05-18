import { registerCoreBlocks } from '@wordpress/block-library';
import {createRoot} from 'react-dom/client';


import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';

import BlockEditor from './BlockEditor';
import "./blockEditor.scss";

registerCoreBlocks();

document.addEventListener("DOMContentLoaded", function () {
    var el = document.querySelector("#psb-block-editor-root");
    createRoot(el).render( <BlockEditor /> )
})