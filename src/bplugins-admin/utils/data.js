const slug = 'panorama';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, deleteDataOnUninstall, uninstallNonce } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `Panorama Viewer${proSuffix}`,
		displayName: `Panorama Viewer${proSuffix} - Embed 360-Degree Images or Videos`,
		description: 'Panorama Viewer displays panoramic images/videos easily on your WordPress site. Supports various files like .png, .jpeg, .mp4, and more.',
		slug,
		version,
		isPremium,
		hasPro,
		deleteDataOnUninstall,
		uninstallNonce,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
			banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
			video: 'https://www.youtube.com/watch?v=bs-U13KtYEA',
			isYoutube: true
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			landing: `https://bplugins.com/products/${slug}/`,
			docs: `https://bplugins.com/docs/${slug}/`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		freemius: {
			product_id: 8824,
			plan_id: 14971,
			public_key: 'pk_a112d1d1d66d3b480dbea5690d3ff'
		},

		changelogs: [
			{
				type: 'update',
				version: '1.7.0 - 23 May, 2026',
				list: [
					'Update: Refactored architecture to decouple shared Pro code, establishing a clean standalone Free version.',
					'Update: Upgraded Gutenberg blocks to API version 3.',
					'Fix: Resolved dragging lock and cursor drift issues in Gutenberg block editors.',
					'Improvement: Streamlined settings panels by replacing lock screens with clean premium feature notices.',
					'Improvement: Modernized admin dashboard settings layout and WooCommerce metabox sections.',
					'Update: Enhanced sanitization, escaping, and prefix compliance for WordPress.org standards.',
					'Cleanup: Purged legacy unused scripts and added secure database cleanup on uninstall.'
				]
			},

			{
				type: 'fix',
				version: '1.6.1 - 12 May, 2026',
				list: [
					'Fixed: Removed unintended premium-only license activation file from free version.',
				]
			},

			{
				type: 'update',
				version: '1.6.0 - 29 Mar, 2026',
				list: [
					'Embed URL option added for 360 Virtual Tours and Product Spot (Gutenberg block + dashboard settings).',
					'Modernized shortcode clipboard UI with integrated embed URL support.',
					'Initial View Toggle, Position, and Zoom Level (FOV) controls added for Gallery items with per-item customization (Gutenberg block + dashboard settings).'
				],
			}

		],
		proFeatures: [
			'Seamlessly display panoramic photos, videos, and multi-scene tours.',
			'Connect multiple 360° scenes using customizable hotspots, links, and tooltips.',
			'Embed any public Google Street View location directly into your pages.',
			'Organize mixed collections of photos and videos in beautiful responsive layouts.',
			'Customize columns, grids, spacing, and item display limits with ease.',
			'Keep visitors engaged with automated panning that pauses on user interaction.',
			'Set the perfect initial angle, pitch, and zoom level for every panorama.',
			'Includes fullscreen toggle, picture-in-picture, and video speed control.',
			'Add, remove, or customize zoom, drag, orientation, and virtual compass settings.',
			'Display customizable title and credit overlays on your viewer interface.'
		],
		startButton: {
			label: 'Start Now',
			url: 'wp-admin/post-new.php?post_type=bppiv-image-viewer'
		}
	}
}

export const demoInfo = {
	demos: [
		{
			icon: ``,
			title: 'Image 3D',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-image-3d/'
		},
		{
			icon: ``,
			title: 'Image 360°',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-image-360/'
		},
		{
			icon: ``,
			title: 'Video',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-video/'
		},
		{
			icon: ``,
			title: 'Video 360°',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-video-360/'
		},
		{
			icon: ``,
			title: 'Gallery',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-gallery/'
		},
		{
			icon: ``,
			title: 'Tour 360°',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-tour-360/'
		},
		{
			icon: ``,
			title: 'Google Street View',
			type: 'iframe',
			url: 'https://bblockswp.com/demo/panorama-google-street/'
		}
	]
}

export const pricingInfo = {
	logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
	pluginId: 8824,
	planId: 14971,
	licenses: [
		1,
		3,
		null
	],
	button: {
		label: 'Buy Now ➜'
	},
	featured: {
		selected: 3,
	}
}

