# Panorama — The Ultimate 360° Virtual Tour, Panoramic Image & Video Viewer

![Panorama Banner](https://ps.w.org/panorama/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.3+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/panorama/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/readme.txt)
[![GPLv2 License](https://img.shields.io/badge/License-GPLv2-green.svg?style=flat-square)](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/readme.txt)
[![Stable Version](https://img.shields.io/badge/Version-1.7.0-blue.svg?style=flat-square)](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/readme.txt)

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

## 🧩 Gutenberg Blocks Reference

The plugin registers a series of modern block components for standard pages, posts, or customized layouts:

| Block Title | Block Name (Slug) | Description |
| :--- | :--- | :--- |
| **Panorama Viewer** | `panorama/parent` | Parent block for choosing and wrapping individual viewer styles. |
| **Image 3D** | `panorama/image-3d` | Embed and style flat 3D-effect images. |
| **Image 360°** | `panorama/image-360` | Embed interactive 360° equirectangular panoramas. |
| **Video** | `panorama/video` | Embed flat panoramic video players. |
| **Video 360°** | `panorama/video-360` | Play fully interactive 360° immersive video files. |
| **Google Street** | `panorama/google-street` | Render dynamic Google Street View configurations via a Panorama ID. |
| **Gallery** | `panorama/gallery` | Display responsive grid and column layouts of multiple panoramas. |
| **Tour 360°** | `panorama/tour` | Render localized multi-point tours. |
| **Virtual Tour** | `panorama/virtual-tour` | Build multi-scene interactive tours with clickable hotspots. |
| **Product Spot** | `psb/product-spot` | Highlight physical product features with interactive overlay spots. |
| **Panorama Block** | `bpgb/panorama` | Legacy/general purpose block configuration helper. |

---

## 🗂 Custom Post Types (CPTs)

To separate configurations cleanly, the plugin registers three custom post types under [registerPostType.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/inc/Base/registerPostType.php):

1. **`bppiv-image-viewer` (Panorama Viewer):** Handles standard 360° images, flat videos, 360° videos, Google Street View, and galleries.
2. **`virtual_tour` (360° Virtual Tour):** Handles scenes and hotspots for multi-point virtual walkthroughs.
3. **`product_spot` (Product Spot):** Manages interactive hotspots with custom labels and descriptions.

---

## 🔌 Developer Shortcodes API

Embed any of the saved panoramas, tours, or hotspots anywhere on your site using our built-in shortcodes:

### 1. Standard Panorama
Embed any saved panorama configuration from the `bppiv-image-viewer` post type:
```markdown
[panorama id="123"]
```
*Defined in:* [shortcode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/shortcode.php#L7-L46) or [registerPostType.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/inc/Base/registerPostType.php#L170-L203).

### 2. 360° Virtual Tour
Embed multi-scene virtual tours from the `virtual_tour` post type:
```markdown
[virtual-tour id="456"]
```
*Defined in:* [registerPostType.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/inc/Base/registerPostType.php#L135-L168).

### 3. WooCommerce Product Showcase
Embed a panoramic image/video dynamically on the single WooCommerce product page:
```markdown
[panorama_product_viewer]
```
*Defined in:* [shortcode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/shortcode.php#L50-L96).

### 4. Interactive Product Spot
Embed customizable hotspot images and product guides from the `product_spot` post type:
```markdown
[product_spot id="789"]
```
*Defined in:* [product-spot.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/product-spot.php#L268-L301).

---

## 🛒 WooCommerce Integration

The plugin features a deep integration with WooCommerce to replace or augment standard single product galleries with interactive panoramic assets.

> [!NOTE]
> Settings are managed within the product editor sidebar metadata card (`_bppiv_product_` postmeta block).

### Positioning Configurations
Developers and administrators can specify the rendering position of the panorama viewer:
- `none`: Disable rendering and fall back to standard WooCommerce galleries.
- `top`: Mounts the viewer directly **above** the main product gallery.
- `bottom`: Mounts the viewer directly **below** the main product gallery.
- `replace`: Hides the standard product thumbnails and displays the interactive 3D viewer in place of the primary image.

*Code Reference:* Managed dynamically within [ProductMeta.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/inc/Woocommerce/ProductMeta.php) and rendered through [ProductView.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/panorama/inc/Woocommerce/ProductView.php).

---

## 🛠 Technical Stack & Libraries

This project uses modern high-performance libraries to deliver standard-setting fluid WebGL rendering on all browsers:

- **Frontend JS/React:** React is used to drive the custom Gutenberg block interfaces, custom sidebars, and admin dashboard fields.
- **Core 3D Engine:** [Three.js](https://threejs.org/) & [Panolens.js](https://github.com/pissang/panolens.js) power equirectangular mapping, virtual tours, and 360° video projections.
- **Image WebGL Engine:** [Pannellum](https://pannellum.org/) is used for lightweight, fast 360° equirectangular standard image displays.
- **Accessible Video Engine:** [Video.js](https://videojs.com/) and `videojs-vr` handle standard format files and panoramic video playback.
- **Build System:** Webpack via `@wordpress/scripts` handles block transpilation and code splitting.

---

## 💻 Developer Guide

### Directory Layout

- **`/src`**: Active React components, SCSS styling, and Webpack entry files.
  - **`/blocks`**: Gutenberg block sources (`gallery`, `google-street`, `image-360`, `image-3d`, `parent`, `product-spot`, `tour`, `video`, `video-360`, `virtual`).
  - **`/admin`**: Custom admin-side editor JS assets, styles, and metabox helpers.
  - **`/components`**: Reusable React components used in the block configuration sidebars.
  - **`/view`**: Frontend JS assets (`scripts.js`, `videojs-init.js`) for compiling, mounting, and loading the WebGL player configurations.
- **`/inc`**: Core PHP controllers, namespace loaders, and WooCommerce integration files.
  - **`/Base`**: Handlers for admin screens, CPT registers, asset enqueuing, and blocks.
  - **`/Woocommerce`**: WooCommerce hooks, templates, and metadata structures.
- **`/build`**: Compiled and bundled files (automatically generated via Webpack; do not edit manually).
- **`panorama.php`**: The main executable and plugin bootstrapper.

### Development Workflow

1. Clone the repository into your local WordPress `plugins` directory.
2. Clone [bpl-tools](https://github.com/bPlugins/bpl-tools) into the same directory (required for dashboard components).
3. Install development dependencies:
   ```bash
   npm install
   ```
4. Start development hot-rebuild mode:
   ```bash
   npm start
   ```
5. Compile minified assets for release:
   ```bash
   npm run build
   ```

### Data Flow & Lifecycle
1. **Editor Side:** Block settings are configured via React wrappers in `/src/blocks` and stored as serialized block attribute comments in the post content database.
2. **PHP Frontend Rendering:** When a shortcode or block renders on the frontend, the server parses the attributes and outputs a DOM container with a `data-settings` JSON attribute.
3. **JS Initialization:** The compiled frontend script parses `data-settings` and initializes the correct engine (Three.js/Panolens, Pannellum, or Video.js) onto the container automatically.

---

## 🔗 Useful Links
- [Live Demo](https://bplugins.com/products/panorama/#demos)
- [Support Forum](https://wordpress.org/support/plugin/panorama/)
- [Upgrade to Pro](https://bplugins.com/products/panorama/pricing)

---
*Developed with ❤️ by [bPlugins](https://bplugins.com)*
