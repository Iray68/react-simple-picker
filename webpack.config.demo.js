var path = require('path');
module.exports = {
  entry: ['./example/index.js'],
  output: {
    path: path.resolve(__dirname, 'demo'),
    publicPath: '/demo/',
    filename: 'example.js'
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
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/
      }
    ]
  }
};
