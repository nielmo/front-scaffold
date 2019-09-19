const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
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
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'raw-loader',
          'pug-html-loader',
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
        test: /\.(png|jpg|gif)$/i,
        use: [
          'url-loader',
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
    new StyleLintPlugin({
      configFile: '.stylelintrc',
    }),
    new WebpackNotifierPlugin(),
  ],
};
