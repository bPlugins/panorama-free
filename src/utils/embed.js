/**
 * Whether the viewer is shown inside an embed iframe (the "Embed" share
 * option), where it should fill the iframe's height.
 *
 * The Elementor editor and the settings live preview also show the viewer inside
 * an iframe, but there it must keep its own height setting, so they are excluded.
 */
export const isEmbedFrame = () => {
	if (window.location === window.parent.location) {
		return false;
	}

	const classes = document.body?.classList;
	return !classes?.contains('elementor-editor-active') && !classes?.contains('bppiv-live-preview-body');
};
