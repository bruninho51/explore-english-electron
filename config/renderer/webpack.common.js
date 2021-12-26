const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: './src/renderer/index.tsx',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].[contenthash].js'
    // publicPath: ''
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/
    }, {
      type: 'asset',
      test: /\.(png|svg|jpg|jpeg|gif)$/i
    },
    {
      test: /.(ts|tsx)$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
