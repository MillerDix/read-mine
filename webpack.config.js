const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // entry: './src/main.tsx',
  entry: {
    'background/background': './src/pages/background/background.ts',
    'content/content': './src/pages/content/index.tsx',
    'popup/popup': './src/pages/popup/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000
  },
  devtool: 'inline-source-map',

  // {
  //   port: 9090, // Which port use to create the server
  //   reloadPage: true, // Force the reload of the page also
  //   entries: { // The entries used for the content/background scripts or extension pages
  //     contentScript: 'content-script',
  //     background: 'background',
  //     extensionPage: 'popup',
  //   }
  // }
  plugins: [
    new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts or extension pages
        contentScript: 'content/content',
        background: 'background/background',
        extensionPage: 'popup/popup',
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      inject: true,
      cache: false,
      chunks: ['content/content'],
      filename: 'content/content.html',
      template: './public/index.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      cache: false,
      chunks: ['popup/popup'],
      filename: 'popup/popup.html',
      template: './public/index.html'
    }),
  ]
};