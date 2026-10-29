/**
 * Panorama Viewer – Elementor editor app.
 *
 * Adds the visual hotspot editor for the "360° Virtual Tour" widget. It reuses
 * the virtual tour block's own TourViewer in backend mode (the same editor as
 * Gutenberg) inside a modal. Hotspots are stored in the widget's hidden
 * "tour_data" control; a scene's default view goes to its own Zoom / Pitch /
 * Yaw fields.
 */
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import TourViewer from '../blocks/virtual/Components/Common/TourViewer';
import Style from '../blocks/virtual/Components/Common/Style';
import '../blocks/virtual/style.scss';
import '../blocks/virtual/editor.scss';
import './editor.scss';

const config = window.bppivElementor || {};
const CUBE_FACES = ['front', 'right', 'back', 'left', 'up', 'down'];
const FREE_SCENE_LIMIT = 6;
const EDITOR_ID = 'bppiv-el-tour-editor';

// Must match VirtualTour::scene_id() in PHP.
const sceneId = (item, index) => {
	const raw = String(item?._id || '').replace(/[^A-Za-z0-9_-]/g, '');
	return `scene_${raw || index}`;
};

const sceneImage = (item) => {
	const url = 'url' === item.image_source ? item.image_url : item.image?.url;
	return 'string' === typeof url ? url.trim() : '';
};

const toNumber = (value, fallback) => {
	const num = parseFloat(value);
	return Number.isFinite(num) ? num : fallback;
};

const parseTourData = (raw) => {
	try {
		const data = JSON.parse(raw || '{}');
		return data && 'object' === typeof data && !Array.isArray(data) ? data : {};
	} catch (e) {
		return {};
	}
};

const getRepeaterItems = (settings) => {
	const scenes = settings.get('scenes');
	if (scenes && 'function' === typeof scenes.toJSON) {
		return scenes.toJSON();
	}
	return Array.isArray(scenes) ? scenes : [];
};

/**
 * Same scene list the PHP widget renders (VirtualTour::get_scenes()).
 */
const buildScenes = (items, tourData) => {
	const list = config.isPremium ? items : items.slice(0, FREE_SCENE_LIMIT);

	const scenes = list.map((item, index) => {
		const format = ['equirectangular', 'cubemap', 'cylindrical'].includes(item.panorama_format) ? item.panorama_format : 'equirectangular';
		const cubeMap = {};
		CUBE_FACES.forEach((face) => {
			cubeMap[face] = item[`cube_${face}`]?.url || '';
		});

		const panorama = 'cubemap' === format ? '' : sceneImage(item);
		const isComplete = 'cubemap' === format ? CUBE_FACES.every((face) => cubeMap[face]) : Boolean(panorama);

		if (!isComplete) {
			return null;
		}

		const id = sceneId(item, index);
		const saved = tourData[id] || {};

		return {
			tour_id: id,
			isTitleAuthor: 'yes' === item.show_title_author,
			// Pannellum shows "by" even for an empty author, so leave empty values out.
			...(item.scene_title ? { title: item.scene_title } : {}),
			...(item.scene_author ? { author: item.scene_author } : {}),
			hfov: toNumber(item.hfov, 110),
			pitch: toNumber(item.pitch, 0),
			yaw: toNumber(item.yaw, 5),
			type: 'equirectangular',
			panorama,
			panoramaFormat: format,
			haov: toNumber(item.haov, 360),
			vaov: toNumber(item.vaov, 180),
			vOffset: toNumber(item.voffset, 0),
			cubeMap,
			hotSpots: Array.isArray(saved.hotSpots) ? saved.hotSpots : []
		};
	}).filter(Boolean);

	// Drop scene links that point to scenes which no longer exist.
	const ids = scenes.map((scene) => scene.tour_id);
	return scenes.map((scene) => ({
		...scene,
		hotSpots: scene.hotSpots.filter((spot) => 'scene' !== spot?.type || ids.includes(spot.sceneId))
	}));
};

/**
 * Hotspots per scene. Data of scenes that still exist in the repeater but are
 * not shown in the editor (no image yet) is kept.
 */
const toTourData = (scenes, previous, existingIds) => {
	const data = {};

	Object.keys(previous).forEach((id) => {
		if (existingIds.includes(id)) {
			data[id] = previous[id];
		}
	});

	scenes.forEach((scene) => {
		data[scene.tour_id] = { hotSpots: scene.hotSpots || [] };
	});

	return JSON.stringify(data);
};

const HotspotEditor = ({ initialScenes, options, onSave, onClose }) => {
	const [scenes, setScenes] = useState(initialScenes);
	const [currentScene, setCurrentScene] = useState(initialScenes[0]);

	// TourViewer reports every change as setAttributes({ scenes }).
	const setAttributes = (attrs) => {
		if (attrs && Array.isArray(attrs.scenes)) {
			setScenes(attrs.scenes);
		}
	};

	const full = { desktop: '100%', tablet: '100%', mobile: '100%' };
	const attributes = {
		scenes,
		options: { ...options, isRotate: false, isShowSceneHotspot: false, tabSl: 'index' },
		layout: {
			alignSl: { desktop: 'center', tablet: 'center', mobile: 'center' },
			width: full,
			height: { desktop: '62vh', tablet: '62vh', mobile: '62vh' }
		}
	};

	return (
		<Modal
			title={__('Edit Hotspots', 'panorama')}
			onRequestClose={onClose}
			shouldCloseOnClickOutside={false}
			className="bppiv-el-tour-modal"
			isFullScreen
		>
			<p className="bppiv-el-tour-modal__help">
				{__('Click anywhere on the scene to add a hotspot or set the scene\'s default view. Click a hotspot to edit or delete it, or drag it to move it.', 'panorama')}
			</p>

			{1 < scenes.length && (
				<div className="bppiv-el-tour-modal__scenes">
					{scenes.map((scene) => (
						<Button
							key={scene.tour_id}
							variant={scene.tour_id === currentScene?.tour_id ? 'primary' : 'secondary'}
							onClick={() => setCurrentScene(scene)}
						>
							{scene.title || scene.tour_id}
						</Button>
					))}
				</div>
			)}

			<div id={EDITOR_ID} className="wp-block-panorama-virtual-tour bppiv-el-tour-editor">
				<Style attributes={attributes} id={EDITOR_ID} />
				<TourViewer
					attributes={attributes}
					setAttributes={setAttributes}
					isBackend={true}
					isSelected={true}
					currentScene={currentScene}
					setCurrentScene={setCurrentScene}
					selectBlock={() => { }}
					clientId=""
					isPremium={Boolean(config.isPremium)}
					siteLocation={config.pricingUrl}
				/>
			</div>

			<div className="bppiv-el-tour-modal__footer">
				<Button variant="tertiary" onClick={onClose}>{__('Cancel', 'panorama')}</Button>
				<Button variant="primary" onClick={() => onSave(scenes)}>{__('Save Hotspots', 'panorama')}</Button>
			</div>
		</Modal>
	);
};

const notify = (message) => {
	if (window.elementor?.notifications?.showToast) {
		window.elementor.notifications.showToast({ message });
	} else {
		window.alert(message); // eslint-disable-line no-alert
	}
};

const openHotspotEditor = (controlView) => {
	const container = controlView?.container || controlView?.options?.container;
	if (!container?.settings) {
		return;
	}

	const settings = container.settings;
	const items = getRepeaterItems(settings);
	const previous = parseTourData(settings.get('tour_data'));
	const scenes = buildScenes(items, previous);

	if (!scenes.length) {
		notify(__('Add a 360° image to at least one scene first.', 'panorama'));
		return;
	}

	const options = {
		isLabel: 'yes' === settings.get('show_labels'),
		hideDefaultCtrl: false,
		draggable: true,
		autoRotateSpeed: 1
	};

	const holder = document.createElement('div');
	document.body.appendChild(holder);
	const root = createRoot(holder);

	const close = () => {
		root.unmount();
		holder.remove();
	};

	const save = (newScenes) => {
		const existingIds = items.map((item, index) => sceneId(item, index));

		window.$e.run('document/elements/settings', {
			container,
			settings: { tour_data: toTourData(newScenes, previous, existingIds) }
		});

		// "Set Default View" changes the scene's own Zoom / Pitch / Yaw fields.
		const repeaterItems = container.repeaters?.scenes?.children || [];
		newScenes.forEach((scene) => {
			const index = existingIds.indexOf(scene.tour_id);
			const before = scenes.find((s) => s.tour_id === scene.tour_id);
			const itemContainer = repeaterItems[index];
			if (!itemContainer || !before) {
				return;
			}

			const view = {};
			['hfov', 'pitch', 'yaw'].forEach((key) => {
				const value = Math.round(toNumber(scene[key], before[key]) * 100) / 100;
				if (value !== before[key]) {
					view[key] = value;
				}
			});

			if (Object.keys(view).length) {
				window.$e.run('document/elements/settings', { container: itemContainer, settings: view, options: { external: true } });
			}
		});

		close();
	};

	root.render(<HotspotEditor initialScenes={scenes} options={options} onSave={save} onClose={close} />);
};

const init = () => {
	window.elementor.channels.editor.on('bppiv:editTourHotspots', openHotspotEditor);
};

if (window.elementor?.channels?.editor) {
	init();
} else if (window.jQuery) {
	window.jQuery(window).on('elementor:init', init);
}
