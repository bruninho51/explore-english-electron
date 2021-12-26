// const path = require('path');
const common = require('./webpack.common');
/* const ElectronReloadPlugin = require('webpack-electron-reload')({
  path: path.resolve(process.cwd(), 'dist', 'main.js')
}); */
const { merge } = require('webpack-merge');

/** @type { import('webpack').Configuration } */
const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // ElectronReloadPlugin()
  ]
};

module.exports = merge(common, devConfig);
