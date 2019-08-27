const path = require('path');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    library: pkg.name,
    libraryTarget: "umd",
    libraryExport: "default",
    filename: pkg.name + '.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: [
                '@babel/transform-runtime',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-classes'
            ]
          }
        }
      }
    ]
  }
};
