const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require('eslint-webpack-plugin');


const plugins = defaultConfig.plugins.filter(p => {
  if (Object.values(p).length === 2 && Object.values(p)?.[1]['filename'] && Object.values(p)?.[1]['filename'] === '[name]-rtl.css') {
    return false;
  }
  return true;
});

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    "scripts": "./src/view/scripts.js",
    "videojs-init": "./src/view/videojs-init.js",
    "classic-editor-preview": "./src/admin/classic-editor-preview.js",
    "dashboardBlockEditor": "./src/woocommerce/dashboardBlockEditor.js",
    "admin-dashboard": "./src/bplugins-admin/dashboard.js",
    "admin-post": "./src/bplugins-admin/post.js",
  },
  plugins: [
    ...plugins,
    new ESLintPlugin()
  ],
  optimization: {}
};