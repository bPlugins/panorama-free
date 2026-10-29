/**
 * Keeps track of mounted viewer roots so viewers whose element was removed
 * from the page can be unmounted.
 *
 * On a normal page nothing is ever removed, so this does nothing. In the
 * Elementor editor a widget is re-rendered on every settings change; without
 * this, the old viewers would keep their WebGL contexts and animation loops
 * running, and old videos would keep playing in the background.
 */
const roots = [];

export const trackRoot = (el, root) => {
	roots.push({ el, root });
	return root;
};

export const unmountDetachedRoots = () => {
	for (let i = roots.length - 1; i >= 0; i--) {
		if (!roots[i].el.isConnected) {
			try {
				roots[i].root.unmount();
			} catch (e) {
				// The root may already be gone; nothing else to clean up.
			}
			roots.splice(i, 1);
		}
	}
};
