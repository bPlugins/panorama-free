/**
 * Elementor editor bridge for the viewers' "Set as Initial View" button.
 *
 * In the Elementor editor preview, a viewer reports the current camera through
 * setAttributes() (exactly as in the block editor). This turns that into the
 * matching Elementor widget settings, so the button fills the widget's
 * Initial View fields. Anywhere else it returns null and nothing changes.
 */
import { __ } from '@wordpress/i18n';

const round = (value) => Math.round(Number(value) * 100) / 100;

const getEditorWindow = () => {
	if (!document.body || !document.body.classList.contains('elementor-editor-active')) {
		return null;
	}

	try {
		const editor = window.parent;
		return editor && editor !== window && editor.$e && editor.elementor ? editor : null;
	} catch (e) {
		return null;
	}
};

const viewToSettings = (attrs) => {
	const options = attrs?.options || {};

	if (options.initialViewPosition) {
		const { pitch, yaw, hfov } = options.initialViewPosition;
		return { initial_pitch: round(pitch), initial_yaw: round(yaw), initial_hfov: round(hfov) };
	}

	if (options.initialPosition) {
		const { x, y, z } = options.initialPosition;
		return { initial_x: round(x), initial_y: round(y), initial_z: round(z) };
	}

	return null;
};

/**
 * @param {Element} el The block element inside the Elementor widget.
 * @return {Function|null} A setAttributes() replacement, or null outside the Elementor editor.
 */
export const getElementorSetAttributes = (el) => {
	const editor = getEditorWindow();
	const widget = editor && el.closest('.elementor-element[data-id]');

	if (!widget) {
		return null;
	}

	const widgetId = widget.dataset.id;
	const run = (container, settings) => editor.$e.run('document/elements/settings', { container, settings, options: { external: true } });

	// The viewer re-renders right after the update (its own toast disappears with
	// it), so confirm in the Elementor editor itself.
	const notify = () => {
		if (editor.elementor.notifications?.showToast) {
			editor.elementor.notifications.showToast({ message: __('Initial view set successfully.', 'panorama') });
		}
	};

	return (attrs) => {
		const container = editor.elementor.getContainer(widgetId);
		if (!container) {
			return;
		}

		// Gallery: the item whose view was set (items carry their repeater id as elId).
		if (Array.isArray(attrs?.galleries)) {
			const items = container.repeaters?.galleries?.children || [];
			let updated = false;

			attrs.galleries.forEach((item) => {
				const position = item?.initialPosition;
				const itemContainer = position && items.find((child) => child.id === item.elId);
				if (!itemContainer) {
					return;
				}

				const settings = { initial_x: round(position.x), initial_y: round(position.y), initial_z: round(position.z) };
				if (position.fov) {
					settings.fov = round(position.fov);
				}

				const changed = Object.keys(settings).some((key) => Number(itemContainer.settings.get(key)) !== settings[key]);
				if (changed) {
					run(itemContainer, settings);
					updated = true;
				}
			});

			// Same view clicked again: still confirm it is set.
			notify();
			return updated;
		}

		const settings = viewToSettings(attrs);
		if (settings) {
			run(container, settings);
			notify();
		}
	};
};
