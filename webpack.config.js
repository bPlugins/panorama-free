const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const autoprefixer = require('autoprefixer');

const plugins = defaultConfig.plugins.filter((p) => {
  if (Object.values(p).length === 2 && Object.values(p)?.[1]["filename"] && Object.values(p)?.[1]["filename"] === "[name]-rtl.css") {
    return false;
  }
  return true;
});

const entry = {
  ...defaultConfig.entry(),
  "scripts": path.resolve(process.cwd(), "src", "view", "scripts.js"),
  "videojs-init": path.resolve(process.cwd(), "src", "view", "videojs-init.js"),
  "classic-editor-preview": path.resolve(process.cwd(), "src", "admin", "classic-editor-preview.js"),
  "dashboardBlockEditor": "./src/woocommerce/dashboardBlockEditor.js",
  'admin-dashboard': './src/bplugins-admin/dashboard.js',
  'admin-post': './src/bplugins-admin/post.js'
};

module.exports = {
  ...defaultConfig,
  entry,
  plugins: [...plugins, new ESLintPlugin()],
  optimization: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  development: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
            }
          },
          'sass-loader'
        ]
      }, // CSS rule
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      } // File rule
    ],
  },

  externals: {
    "@wordpress/blocks": ["wp", "blocks"],
    "@wordpress/element": ["wp", "element"],
    "@wordpress/data": ["wp", "data"],
    "@wordpress/i18n": ["wp", "i18n"],
    "@wordpress/block-editor": ["wp", "blockEditor"],
    "@wordpress/components": ["wp", "components"],
    "@wordpress/blob": ["wp", "blob"],
    "@wordpress/html-entities": ["wp", "htmlEntities"],
    "@wordpress/compose": ["wp", "compose"],
    "@wordpress/rich-text": ["wp", "richText"],
    react: ["wp", "element"],
    "react-dom": ["wp", "element"],
  },
};
