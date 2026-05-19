const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const plugins = defaultConfig.plugins.filter((p) => {
  return !p.constructor.name.includes('Rtl');
});

const entry = {
  ...defaultConfig.entry(),
  "scripts": "./src/view/scripts.js",
  "videojs-init": "./src/view/videojs-init.js",
  "classic-editor-preview": "./src/admin/classic-editor-preview.js",
  "dashboardBlockEditor": "./src/woocommerce/dashboardBlockEditor.js",
  "admin-dashboard": "./src/bplugins-admin/dashboard.js",
  "admin-post": "./src/bplugins-admin/post.js",
};

module.exports = {
  ...defaultConfig,
  entry,
  plugins: [...plugins],
  optimization: {},
};
