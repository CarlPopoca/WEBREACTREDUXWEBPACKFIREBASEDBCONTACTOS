var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, '/src'),
        compress: true,
        port: 3000,
        historyApiFallback: true
      },
    entry:{
        main: './src/index.js'
    } ,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scv']
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
        },
      ]
    },
    plugins:[
        new htmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ]
  }