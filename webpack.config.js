const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/main.js',
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
          },
        ],
      })),
    }, {
      test: /\.html/,
      loader: 'html-loader',
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader: 'file-loader',
      options: {
        hash: 'sha512',
        digest: 'hex',
        name: 'images/[name].[ext]',
      },
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
      ignoreOrder: true,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.css', '.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      'bootstrap': path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'),
      'bootstrap-theme': path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap-theme.css')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    port: 8005,
  }
};
