const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/main.tsx',
  entry: {
    'background/background': './src/pages/background/index.tsx',
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['background/background'],
      filename: 'background/background.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['content/content'],
      filename: 'content/content.html'
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['popup/popup'],
      filename: 'popup/popup.html'
    })
  ]
};