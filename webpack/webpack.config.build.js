const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const templates = [];
const dir = 'src';
const files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.match(/\.pug$/)) {
    const filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: `${dir}/${filename}.pug`,
        filename: `${filename}.html`,
        inject: false,
      }),
    );
  }
});

module.exports = {
  entry: [
    './src/js/index.js',
    './src/scss/style.scss',
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'raw-loader',
          'pug-html-loader',
        ]
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
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '../[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    ...templates,
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
      allChunks: true,
    }),
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin('dist'),
  ],
};
