# Panorama — The Ultimate 360° Virtual Tour, Panoramic Image & Video Viewer

![Panorama Banner](https://ps.w.org/panorama/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.3+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/panorama/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](readme.txt)
[![GPLv2 License](https://img.shields.io/badge/License-GPLv2-green.svg?style=flat-square)](readme.txt)
[![Stable Version](https://img.shields.io/badge/Version-1.7.5-blue.svg?style=flat-square)](readme.txt)

**Panorama** is a lightweight, high-performance, and fully responsive 360-degree virtual tour and panoramic media viewer plugin for WordPress. It lets you embed 360° photos, videos, and Google Street View locations into your posts, pages, widget areas, or templates using shortcodes or modern Gutenberg blocks—no coding required!

---

## 🚀 Key Features

### 💎 Core Functionality (Free)
Everything you need to build an immersive 360° experience on your site:
- **Multi-Scene Virtual Tours (Free):** Connect up to 6 scenes per tour with up to 6 interactive hotspots per scene (Info, Scene, Link) and smooth transitions.
- **Cubemap / 6-Cube Face Format:** Upload 6 individual cube face images (Front, Back, Left, Right, Up, Down) for high-performance 360° scenes and WooCommerce product panoramas.
- **Cylindrical Smartphone Panoramas:** Full support for partial panoramas with custom HAOV, VAOV, and vOffset controls on virtual tours and WooCommerce product pages.
- **WooCommerce Product Panorama Embed:** Display 360° images on your single product page (top, bottom, replace main image, or a dedicated "360° View" tab) with auto-rotate — no coding required.
- **Interactive Product Spot:** Highlight physical product details with interactive hotspot markers (up to 3 spots).
- **Device Orientation (Gyroscope):** Enable mobile and tablet visitors to explore 360° panoramas and virtual tours naturally by tilting and moving their physical device.
- **Initial View & FOV / Zoom Control:** Customize and lock the starting camera angle (Pitch, Yaw, HFOV) with a single click using the "Set as Initial View" button in block editor or admin metabox.
- **360° Image & Video Viewers:** Embed stunning equirectangular panoramic photos and 360-degree videos with full player navigation.
- **Google Street View Integration:** Easily embed interactive Google Street View locations by simply entering a Panorama ID.
- **Auto Rotate & Camera Controls:** Keep viewers engaged with automated panning and customizable rotation speeds.
- **8 Dedicated Gutenberg Blocks:** Specialized blocks for Image 360°, Image 3D, Video, Video 360°, Google Street View, Gallery, Virtual Tour, and Product Spot.
- **Developer Shortcode API & Embed URLs:** Universal shortcodes `[panorama id="123"]`, `[virtual-tour id="456"]`, `[panorama_product_viewer]`, `[product_spot id="789"]`, and shareable iframe embed URLs.
- **Seamless Elementor Integration:** Easily embed any 360° photo, video, or virtual tour into Elementor pages using generated shortcodes (e.g., `[panorama id="123"]`) via Elementor's native Shortcode Widget — no complex configuration needed.

### 👑 Premium Power (Pro)
Unlock advanced features for premium real estate tours, vehicle showcases, and interactive 3D portfolios:
- **360° Interaction Analytics Dashboard:** Track impressions, hotspot click counts, active view duration, and WooCommerce sales conversions with responsive charts and live activity stream.
- **Interactive WooCommerce Product Hotspots:** Connect 360° hotspots directly to WooCommerce products, display live price badges, and enable instant Add to Cart buttons.
- **WooCommerce Product Video & Advanced Controls:** Add 360° product videos, custom initial view angle, playback controls, and title/author overlays to your product panorama.
- **Virtual Tour Pro (Unlimited):** Connect unlimited scenes and unlimited hotspots per scene without any restrictions.
- **Rich Image & Video Hotspots:** Display interactive Image popups and Video modal popups directly inside virtual tour scenes.
- **Preview Cover Image & Custom Load Button:** Display a lightweight preview cover image with a customizable load button (e.g., "Click to Explore 360°") to maximize page loading speed.
- **Inactivity Delay Auto-Rotate Resume:** Automatically pause rotation when a user drags, and resume auto-rotation after a customizable inactivity delay.
- **Panorama Gallery & Grid Layouts:** Display multiple panoramas in beautiful responsive columns, grids, and Load More pagination.
- **Interactive Compass Overlay:** Keep users oriented in 360° spaces by enabling a native directional compass guide.
- **Custom Player & Navigation Controllers:** Add custom UI buttons for Pan Up, Down, Left, Right, Zoom, Fullscreen, and Video Playback Speed (0.5x, 1x, 1.5x, 2x) with Picture-in-Picture mode.
- **Kiosk & Exhibition Interaction Lock:** Option to disable keyboard navigation and double-click zoom for museum and showroom displays.
- **External Media CDN / URL Support:** Use direct third-party CDN or external URLs for images and videos.

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
- `replace`: Hides the standard product thumbnails and displays the interactive 360° viewer in place of the primary image.

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
