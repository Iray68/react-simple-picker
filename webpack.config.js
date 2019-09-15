var path = require('path');
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'number-picker',
    filename: 'bundle.js',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64]'
              },
              importLoaders: 1,
              sourceMap: true,
              localsConvention: 'camelCase'
            }
          }
        ]
      }
    ]
  },
  externals: [
    {
      react: 'react'
    }
  ]
};
