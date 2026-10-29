import DOMPurify from 'dompurify';

// Icons may be inline SVG or simple HTML (e.g. <i class="...">); scripts/handlers are stripped.
export const sanitizeIcon = (html) => DOMPurify.sanitize(typeof html === 'string' ? html : '', {
	USE_PROFILES: { html: true, svg: true, svgFilters: true }
});

// For controls that compare the icon string (e.g. IconLibrary's active state): keeps the
// original string when it is already clean, otherwise falls back to the sanitized markup.
export const getSafeIconValue = (html) => {
	if (typeof html !== 'string' || !html) return html;
	const clean = sanitizeIcon(html);
	return DOMPurify.removed.length ? clean : html;
};

// Rich text (RichText output such as title, description, button text).
export const sanitizeHTML = (html) => DOMPurify.sanitize(typeof html === 'string' ? html : '', {
	ADD_ATTR: ['target']
});

// Allows http(s), mailto, tel and relative URLs; anything else (javascript:, data:, …) becomes ''.
export const safeUrl = (url) => {
	if (typeof url !== 'string') return '';
	const trimmed = url.trim();
	const compact = [...trimmed].filter((ch) => ch.charCodeAt(0) > 32).join('');
	const scheme = compact.match(/^([a-z][a-z0-9+.-]*):/i);
	return !scheme || /^(https?|mailto|tel)$/i.test(scheme[1]) ? trimmed : '';
};

// Pannellum writes title, author, the `strings` labels and hotspot `text` with innerHTML
// (its escapeHTML option is off), so these are cleaned before a config reaches it.
const escapeText = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const sanitizePannellumNode = (node) => {
	if (!node || typeof node !== 'object') return node;
	const clean = { ...node };
	['title', 'previewTitle'].forEach((key) => {
		if (typeof clean[key] === 'string') clean[key] = sanitizeHTML(clean[key]);
	});
	// Pannellum inserts the author into the byline label ("by %s"); joining two pieces of
	// markup can recreate HTML, so the author is always inserted as plain text.
	['author', 'previewAuthor'].forEach((key) => {
		if (typeof clean[key] === 'string') clean[key] = escapeText(clean[key]);
	});
	if (clean.strings && typeof clean.strings === 'object') {
		clean.strings = Object.fromEntries(Object.entries(clean.strings).map(([key, val]) => [key, typeof val === 'string' ? sanitizeHTML(val) : val]));
	}
	if (Array.isArray(clean.hotSpots)) {
		clean.hotSpots = clean.hotSpots.map((spot) => {
			if (!spot || typeof spot !== 'object') return spot;
			// Pannellum copies hotspot.attributes onto the link element; the plugin never uses it.
			const { attributes, ...rest } = spot; // eslint-disable-line no-unused-vars
			return typeof rest.text === 'string' ? { ...rest, text: sanitizeHTML(rest.text) } : rest;
		});
	}
	return clean;
};

export const sanitizePannellumConfig = (config) => {
	const clean = sanitizePannellumNode(config);
	if (clean?.default) clean.default = sanitizePannellumNode(clean.default);
	if (clean?.scenes && typeof clean.scenes === 'object') {
		clean.scenes = Object.fromEntries(Object.entries(clean.scenes).map(([id, scene]) => [id, sanitizePannellumNode(scene)]));
	}
	return clean;
};

// Returns window.pannellum with viewer() wrapped so every config is sanitized first.
export const guardPannellum = () => {
	const lib = window.pannellum;
	if (lib && !lib.bppivGuarded) {
		const viewer = lib.viewer;
		lib.viewer = function (container, config) {
			return viewer.call(this, container, sanitizePannellumConfig(config));
		};
		lib.bppivGuarded = true;
	}
	return lib;
};

// Characters that let a value escape its CSS declaration/rule or the <style> element.
const CSS_BREAKOUT_CHARS = /[<>{};\\]/g;

// Deep-cleans attribute values before they are interpolated into a generated style sheet.
export const sanitizeStyleAttributes = (value) => {
	if (typeof value === 'string') {
		return value.replace(CSS_BREAKOUT_CHARS, '');
	}
	if (Array.isArray(value)) {
		return value.map(sanitizeStyleAttributes);
	}
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, sanitizeStyleAttributes(val)]));
	}
	return value;
};
