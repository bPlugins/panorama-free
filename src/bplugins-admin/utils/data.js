import { gutenbergTabIcon, shortcodeTabIcon } from "./icons";

const slug = 'panorama';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, deleteDataOnUninstall, uninstallNonce, adminUrl = '' } = info;

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
		adminUrl,
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
		startButton: {
			label: 'Start Now',
			url: `${adminUrl}post-new.php?post_type=bppiv-image-viewer`
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

export const welcomeInfo = (adminUrl) => ({
	keywords: ['360° Image', '360° Video', 'Virtual Tour', 'Gutenberg Block', 'Shortcode', 'Google Street View', 'Product Spot'],
	keywordsLabel: 'Features',
	gettingStarted: {
		tabs: [
			{
				key: 'gutenberg',
				label: 'Gutenberg',
				icon: gutenbergTabIcon,
				steps: [
					{
						num: 1,
						title: 'Add the Panorama Block',
						body: 'Open the block editor on any page or post. Click the <strong>+</strong> icon in the top-left corner or search for <strong>Panorama</strong> blocks (like Image 360°, Video 360°, Tour 360°) to insert them.',
						link: { url: `${adminUrl}post-new.php?post_type=page`, label: 'Open Editor' }
					},
					{
						num: 2,
						title: 'Select Media Source',
						body: 'Choose your panoramic image or video file from your Media Library or upload a new one. For Tour 360°, configure scenes and hotspots.'
					},
					{
						num: 3,
						title: 'Configure Settings & Publish',
						body: 'Customize the viewer options like autoplay, speed, zoom, control bar, and full-screen options in the block sidebar. Save and publish your post/page.'
					}
				]
			},
			{
				key: 'shortcode',
				label: 'Shortcode',
				icon: shortcodeTabIcon,
				steps: [
					{
						num: 1,
						title: 'Create a New Panorama',
						body: 'Navigate to <strong>Panorama -> Add New</strong>. Give your panorama viewer a title and configure your media and options.',
						link: { url: `${adminUrl}post-new.php?post_type=bppiv-image-viewer`, label: 'Add New' }
					},
					{
						num: 2,
						title: 'Configure Settings',
						body: 'Upload your 360° image or video, set hotspot overlays, customize display options, and click <strong>Publish</strong>.'
					},
					{
						num: 3,
						title: 'Copy & Paste Shortcode',
						body: 'Copy the generated shortcode (e.g. <code>[panorama id="123"]</code>) from the viewer editing screen or the viewer list, and paste it into any page, post, or widget.'
					}
				]
			}
		]
	},
	changelogs: [
		{
			type: 'fix',
			version: '1.7.3 - 24 Jun, 2026',
			list: [
				'Fix: Scoped admin styles to the plugin\'s own screens, preventing scroll and layout conflicts on other WordPress admin pages.',
				'Fix: Resolved Device Motion (sensor) mode conflict in the 360° image viewers and added gyroscope/accelerometer permissions to embed iframes so sensor mode works in Chrome.'
			]
		},
		{
			type: 'update',
			version: '1.7.2 - 14 Jun, 2026',
			list: [
				'Update: Redesigned and modernized the admin dashboard welcome screen with dynamic builder integration tabs (Gutenberg, Shortcode) and status checks.'
			]
		},
		{
			type: 'update',
			version: '1.7.1 - 04 Jun, 2026',
			list: [
				'Enhancement: Kept the Panorama Type selection field visible globally across all tabs with tab state persistence.'
			]
		},
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
		}
	],
	changelogsLimit: 5,
	changelogsReadMoreLabel: 'View More Changelogs',
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
	]
})

