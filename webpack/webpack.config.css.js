const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top',
              singleton: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: ['url-loader', 'file-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
      allChunks: true,
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
    }),
    new CleanWebpackPlugin('./dist/css/style.css'),
    new WebpackNotifierPlugin(),
  ],
};
