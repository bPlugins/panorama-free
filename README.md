# Panorama — The Ultimate 360° Virtual Tour, Panoramic Image & Video Viewer

![Panorama Banner](https://ps.w.org/panorama/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.3+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/panorama/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](./readme.txt)
[![GPLv2 License](https://img.shields.io/badge/License-GPLv2-green.svg?style=flat-square)](./readme.txt)
[![Stable Version](https://img.shields.io/badge/Version-1.6.1-blue.svg?style=flat-square)](./readme.txt)

**Panorama** is a lightweight, high-performance, and fully responsive 360-degree virtual tour and panoramic media viewer plugin for WordPress. It lets you embed 360° photos, videos, and Google Street View locations into your posts, pages, widget areas, or templates using shortcodes or modern Gutenberg blocks—no coding required!

---

## 🚀 Key Features

### 💎 Core Functionality (Free)
Everything you need to build an immersive 360° experience on your site:
- **360° Image Viewer:** Embed stunning equirectangular panoramic photos seamlessly.
- **360° Video Viewer:** Play immersive 360-degree panoramic videos with full player navigation.
- **Google Street View Integration:** Easily embed interactive Google Street View locations by simply entering a Panorama ID.
- **Auto Rotate Controls:** Keep the viewing experience active with smooth auto-rotation and customizable speeds.
- **Responsive & Mobile Ready:** Flawless rendering on iPhones, iPads, Android devices, and all major desktop web browsers.
- **Universal Shortcode API:** Embed viewers anywhere on your site using standard `[panorama id="123"]` shortcodes.
- **Embed URL System:** Share panoramas easily and allow external sites to display them via direct URLs or iframe embeds.
- **User-Friendly Gutenberg Blocks:** Modern Gutenberg blocks with live previews and sidebar controls directly in the WordPress block editor.

### 👑 Premium Power (Pro)
Unlock advanced features for premium real estate tours, vehicle showcases, and interactive 3D portfolios:
- **360° Virtual Tour Player:** Join multiple equirectangular scenes together with custom hotspots and target navigation to build fully custom, clickable virtual tours.
- **Product Spot / WooCommerce 3D Viewer:** Enhance WooCommerce single product pages with interactive 3D displays and choose top, bottom, or image-replace positions.
- **Panorama Gallery:** Build columns and grids of multiple panoramas with beautiful responsive layouts and Load More buttons.
- **Interactive Compass Overlay:** Keep users oriented in 360° spaces by enabling a native directional compass.
- **Custom Navigation Buttons:** Replace default navigation with specialized custom controllers (Pan Up, Down, Left, Right, Zoom, Fullscreen).
- **Interaction Controls:** Fine-tune the experience by managing inactivity rotate delays, double-click zooms, keyboard support, and mouse-dragging limits.

---

## 📸 Visual Showcase

### Interactive Gutenberg Block
Easily drag, drop, and configure panoramic block styles inside the WordPress editor. See live styling changes and preview exactly what the frontend visitor will see.

### Cross-Device Responsive Viewer
Tested and optimized for Safari on iOS to guarantee a smooth touch-navigation experience for mobile users.

---

## 🛠 Technical Stack

This project is built using modern, industry-standard web libraries to ensure high FPS rendering and reliability:

- **Frontend JS/React:** [React](https://react.org/) (Powers the advanced block editor configurations, custom controls, and Gutenberg sidebar settings).
- **Core 3D Engine:** [Three.js](https://threejs.org/) & [Panolens.js](https://github.com/pissang/panolens.js) (Renders equirectangular image spheres, interactive tours, hotspots, and 360° video streams via WebGL).
- **WebGL Image Engine:** [Pannellum](https://pannellum.org/) for highly efficient, lightweight 360° equirectangular image viewers.
- **Accessible Video Engine:** [Video.js](https://videojs.com/) and `videojs-vr` for seamless cross-browser 360-degree video playback.
- **Build System:** `@wordpress/scripts` (Webpack) for block bundling, dependency injection, and compiled asset generation.
- **Styling:** Modular SASS/SCSS and native CSS utilities for conflict-free admin and frontend styling.
- **Backend Architecture:** PHP with standard Custom Post Type (`bppiv-image-viewer`, `virtual_tour`, `product_spot`) wrappers and dynamic shortcode enqueuing.

---

## 📚 Third-Party Libraries

Panorama utilizes these high-quality, open-source libraries to deliver an exceptional, hardware-accelerated experience:

- **[Three.js](https://github.com/mrdoob/three.js/)** (MIT): The primary WebGL 3D engine.
- **[Panolens.js](https://github.com/pissang/panolens.js)** (MIT): The lightweight panoramas rendering library built on Three.js.
- **[Pannellum](https://github.com/mpetroff/pannellum)** (MIT): An excellent, lightweight WebGL-based panorama viewer.
- **[Video.js](https://github.com/videojs/video.js)** (Apache-2.0): The core HTML5 and VR video player framework.
- **[Codestar Options Framework](http://codestarframework.com/)**: Standardized custom metabox fields and dashboard settings panels.

---

## 💻 Developer Guide

### Directory Structure
- **`/src`**: Active React components, SCSS styling, and Webpack entry files.
	- **`/blocks`**: Gutenberg block sources (`gallery`, `google-street`, `image-360`, `image-3d`, `parent`, `product-spot`, `tour`, `video`, `video-360`, `virtual`).
	- **`/admin`**: Custom admin-side editor JS assets, styles, and metabox helpers.
	- **`/components`**: Reusable React components used in the block configuration sidebars (e.g. `BMediaUpload`, `Spacer`, `BCustomFonts`).
	- **`/view`**: Frontend JS assets (`scripts.js`, `videojs-init.js`) for compiling, mounting, and loading the WebGL player configurations.
- **`/inc`**: Core PHP controllers, namespace loaders, and WooCommerce integration files.
- **`/build`**: Compiled and bundled files (automatically generated via Webpack; do not edit manually).
- **`panorama.php`**: The main executable and plugin bootstrapper.

### Development Workflow
1. **Clone the repository** into your local WordPress `plugins` directory.
2. **Clone [bpl-tools](https://github.com/bPlugins/bpl-tools)** into the same `plugins` directory (required for shared components and admin dashboard layout).
3. **Install dependencies**:
	```bash
	npm install
	```
4. **Start development watch mode**:
	```bash
	npm start
	```
5. **Create a production bundle**:
	```bash
	npm run build
	```

### Data Flow & Lifecycle
1. **Editor:** Gutenberg blocks in `/src/blocks` manage options via block attributes.
2. **Database:** Attributes are serialized as standard Gutenberg comments in the database.
3. **Frontend (PHP):** `shortcode.php` or `render.php` reads the stored attributes and outputs HTML placeholders with `data-settings` JSON tags.
4. **Frontend (JS):** `scripts.js` parses the `data-settings` wrapper, detects the active Panorama Type, and initializes Panolens, Pannellum, or Videojs-VR dynamically onto the target DOM container.

---

## 🔌 Developer API

### Universal Shortcode
Embed any saved panorama configuration quickly:
```
[panorama id="123"]
```
For Virtual Tour:
```
[virtual-tour id="456"]
```
For WooCommerce Product Showcase:
```
[panorama_product_viewer]
```

---

## 🔗 Useful Links
- [Live Demo](https://bplugins.com/products/panorama/#demos)
- [Support Forum](https://wordpress.org/support/plugin/panorama/)
- [Upgrade to Pro](https://bplugins.com/products/panorama/pricing)

---
*Developed by [bPlugins](https://bplugins.com)*
