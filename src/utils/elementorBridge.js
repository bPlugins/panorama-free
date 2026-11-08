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
	// it), so confirm with a small toast in the preview's bottom-right corner
	// (elementor-preview.css). Elementor's own toast adds its upgrade notice.
	const notify = () => {
		const doc = el.ownerDocument;
		doc.querySelector('.bppiv-el-toast')?.remove();

		const toast = doc.createElement('div');
		toast.className = 'bppiv-el-toast';
		toast.setAttribute('role', 'status');
		toast.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
		const text = doc.createElement('span');
		text.textContent = __('Initial view set successfully.', 'panorama');
		toast.appendChild(text);
		doc.body.appendChild(toast);

		requestAnimationFrame(() => toast.classList.add('is-visible'));
		setTimeout(() => {
			toast.classList.remove('is-visible');
			setTimeout(() => toast.remove(), 250);
		}, 2500);
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
