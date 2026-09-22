const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

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
  module: {
    ...defaultConfig.module,
    rules: [
      // Force the large IconLibrary icon-set JSON files through the normal JS
      // pipeline as an object literal, instead of webpack's built-in JSON
      // module type (which always wraps big JSON as one JSON.parse('...')
      // string). Terser can line-wrap an object literal at each comma, but
      // it can never insert a line break inside a single string literal.
      {
        test: /\.json$/,
        include: path.resolve(__dirname, "../bpl-tools/Components/IconLibrary/icons"),
        type: "javascript/auto",
        use: [require.resolve("./bin/json-as-object-literal-loader.js")],
      },
      ...(defaultConfig.module ? defaultConfig.module.rules : []),
    ],
  },
  optimization: {
    ...defaultConfig.optimization,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            max_line_len: 1000,
          },
        },
      }),
    ],
  },
};