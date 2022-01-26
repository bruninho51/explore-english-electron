const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: './src/electron.ts',
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
    new CopyPlugin({
      patterns: [
        { from: path.resolve(process.cwd(), 'icons'), to: path.resolve(process.cwd(), 'dist/icons') },
        { from: path.resolve(process.cwd(), 'public/about.html'), to: path.resolve(process.cwd(), 'dist/about.html') },
        { from: path.resolve(process.cwd(), 'package.json'), to: path.resolve(process.cwd(), 'dist/package.json') }
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js'
  }
};
