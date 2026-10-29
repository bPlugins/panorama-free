/**
 * Whether the viewer is shown inside an embed iframe (the "Embed" share
 * option), where it should fill the iframe's height.
 *
 * The Elementor editor also shows the page inside an iframe, but there the
 * viewer must keep its own height setting, so the editor preview is excluded.
 */
export const isEmbedFrame = () => {
	if (window.location === window.parent.location) {
		return false;
	}

	return !document.body?.classList.contains('elementor-editor-active');
};
