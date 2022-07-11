const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    lists_news: path.resolve(__dirname, './src/index_lists.js'),
    'news-page': path.resolve(__dirname, './src/news-page.js'),
    index_login: path.resolve(__dirname, './src/index_login.js'),
    index_signup: path.resolve(__dirname, './src/index_signup.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/lists_news.html'),
      filename: 'lists_news.html',
      chunks: ['lists_news']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/news-page.html'),
      filename: 'news-page.html',
      chunks: ['news-page']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/login.html'),
      filename: 'login.html',
      chunks: ['index_login']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/signup.html'),
      filename: 'signup.html',
      chunks: ['index_signup']
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images", to: "images"
        }
      ]
    })
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // картинки
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      //Шрифты и svg
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      //SCSS to CSS
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // HTML Templates with html-loader
      {
        test: /\.(html)$/,
        include: path.join(__dirname, 'src/views'),
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      }
    ]
  },

  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: './dist',
    //contentBase: path.resolve(__dirname, './dist'),
    open: true, compress: true, hot: true, port: 8080,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          chunks: 'all'
        }
      }
    }
  }



}