const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/** @type { import('webpack').Configuration } */
const devConfig = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = merge(common, devConfig);
