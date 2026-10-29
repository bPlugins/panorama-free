const path = require("path");
const webpack = require("webpack");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const plugins = defaultConfig.plugins.filter(p => {
  if (Object.values(p).length === 2 && Object.values(p)?.[1]['filename'] && Object.values(p)?.[1]['filename'] === '[name]-rtl.css') {
    return false;
  }
  return true;
});

const blocksConfig = {
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

// Elementor editor app (public/elementor/). Built separately from the blocks
// because it swaps the bpl-tools media components (which need the block
// editor) for versions that open wp.media directly, and because the block
// build's clean step empties build/.
const elementorConfig = {
  ...defaultConfig,
  entry: {
    'elementor-editor': path.resolve(__dirname, 'src/elementor/editor.js'),
  },
  output: {
    ...defaultConfig.output,
    path: path.resolve(__dirname, 'public/elementor'),
  },
  plugins: [
    ...defaultConfig.plugins.filter((plugin) => plugin && !['PhpFilePathsPlugin', 'CopyPlugin', 'RtlCssPlugin'].includes(plugin.constructor.name)),
    new webpack.NormalModuleReplacementPlugin(
      /bpl-tools[\\/]Components$/,
      path.resolve(__dirname, 'src/elementor/shims/bpl-components.js')
    ),
  ],
};

module.exports = [blocksConfig, elementorConfig];
