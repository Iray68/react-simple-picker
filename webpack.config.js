var path = require('path');
module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'number-picker',
    filename: 'index.js',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true
          }
        },
        resolve: {
          extensions: ['.js', '.ts', '.tsx']
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
