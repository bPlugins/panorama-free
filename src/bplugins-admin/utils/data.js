import { gutenbergTabIcon, shortcodeTabIcon, elementorTabIcon } from "./icons";

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
			},
			{
				key: 'elementor',
				label: 'Elementor',
				icon: elementorTabIcon,
				steps: [
					{
						num: 1,
						title: 'Open Elementor Editor',
						body: 'Open the Elementor editor on any page or post and find the <strong>Panorama Viewer</strong> category in the widgets panel (or search for "Panorama").'
					},
					{
						num: 2,
						title: 'Add a Panorama Widget',
						body: 'Drag a widget such as <strong>Image 360°</strong>, <strong>Video 360°</strong>, <strong>360° Virtual Tour</strong> or <strong>Product Spot</strong> into your layout and set it up right in Elementor. For virtual tours, click <strong>Edit Hotspots</strong> to place hotspots visually.'
					},
					{
						num: 3,
						title: 'Reuse a Saved Panorama (Optional)',
						body: 'Already created panoramas in the dashboard? Use the <strong>Saved Panorama</strong> widget to pick one, or paste its shortcode (e.g. <code>[panorama id="123"]</code>) into Elementor\'s Shortcode widget.',
						link: { url: `${adminUrl}edit.php?post_type=bppiv-image-viewer`, label: 'All Panoramas' }
					}
				]
			}
		]
	},
	changelogs: [
		{
			type: 'new',
			version: '1.9.0 - 01 Nov, 2026',
			list: [
				'<strong>New:</strong> Elementor widgets for all panorama types — 360° Image, 3D Image, Video, 360° Video, Google Street View, Virtual Tour, Product Spot and Saved Panorama.',
				'<strong>Fixed:</strong> Google Street View shortcode caused a fatal error on PHP 7.1 and 7.2.',
				'<strong>Fixed:</strong> Gallery "Load More" could open the wrong item, and the popup close button went outside the viewer.',
				'<strong>Fixed:</strong> Some Google Street View and Video options were missing in the block editor and panorama settings.',
				'<strong>Security:</strong> Hardened viewer output, the embed script, analytics tracking and the CSV export.',
				'<strong>Improved:</strong> Updated the Freemius SDK to 2.13.5.'
			]
		},
		{
			type: 'Security',
			version: '1.8.4 - 26 Oct, 2026',
			list: [
				'<strong>Security:</strong> Fixed a stored Cross-Site Scripting (XSS) issue in the Product Spot block (hotspot icons, titles and descriptions) and hardened attribute output and generated styles across all blocks.'
			]
		}
	],
	changelogsLimit: 2,
	changelogsReadMoreLabel: 'View More Changelogs',
	proFeatures: [
		'Full Elementor support — unlock every panorama type and all Pro options in Elementor widgets.',
		'360° Interaction Analytics Dashboard with impression logs, click stats, and conversion metrics.',
		'Interactive WooCommerce Product Hotspots with price badges and instant Add to Cart.',
		'WooCommerce Single Product 360° Video & custom gallery placement options.',
		'Unlimited Multi-Scene Virtual Tours with rich Image, Video, and Product hotspots.',
		'Preview Cover Image with custom load button for faster page loading speed.',
		'Auto-Rotate Inactivity Delay resume and customizable panning speeds.',
		'Responsive Panorama Gallery & Grid layouts with Load More pagination.',
		'Interactive Compass Overlay, Kiosk Exhibition Lock, and custom player buttons.',
		'360° Video Picture-in-Picture mode and playback speed controls (0.5x to 2x).',
		'External CDN & Direct URL support for remote image and video hosting.'
	]
})

