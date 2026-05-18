const slug = 'panorama';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `Panorama Viewer${proSuffix}`,
		displayName: `Panorama Viewer${proSuffix} - Embed 360-Degree Images or Videos`,
		description: 'Panorama Viewer displays panoramic images/videos easily on your WordPress site. Supports various files like .png, .jpeg, .mp4, and more.',
		slug,
		version,
		isPremium,
		hasPro,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
			banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
			// proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
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
			'Supports 3D images, 360° photos, videos, and virtual tours.',
			'Auto-rotate activates after inactivity for smooth viewing.',
			'Set the initial view to define starting angle.',
			'Add and customize navigation controls for panoramas easily.',
			'Enable or disable fullscreen for videos and panoramas',
			'Includes picture-in-picture and playback speed options.',
			'Show or hide titles and authors with customization.',
			'Manage and organize galleries with image and video support.',
			'Customize columns, spacing, and gallery item display limits.',
			'Drag, zoom, and compass for better navigation.'
		],
		startButton: {
			label: 'Start Now',
			url: 'wp-admin/post-new.php?post_type=bppiv-image-viewer'
		}
	}
}

export const demoInfo = {
	// allInOneLabel: 'See All Demos',
	// allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
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

