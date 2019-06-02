const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/style.css',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1} },
            'postcss-loader'
          ]
        })
      },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.(png|jpe?g|ico|svg)/i,
      use: [{
          loader: 'url-loader',
          options: {
            name: './images/[name].[ext]',
            limit: 10000
          }
        },
        {
          loader: 'img-loader'
        }
      ]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/robots.txt',
        to: ''
      }, {
        from: './src/sitemap.xml',
        to: ''
      }
    ]),
    new ExtractTextPlugin('style.css', {
      disable: process.env.NODE_ENV === 'development'
    }),
    new HtmlWebPackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/index.html',
      filename: './index.html'
    }),
    new HtmlWebPackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/login.html',
      filename: './login.html'
    }),
    new HtmlWebPackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/signup.html',
      filename: './signup.html'
    }),
    new HtmlWebPackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/404.html',
      filename: './404.html'
    })
  ]
};
