const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: './src/preload.ts',
  target: 'electron-main',
  node: {
    __dirname: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }]
  },

  plugins: [
    /* new CopyPlugin({
      patterns: [
        { from: path.resolve(process.cwd(), 'assets'), to: path.resolve(process.cwd(), 'dist/assets') }
      ]
    }) */
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'preload.js'
  }
};
