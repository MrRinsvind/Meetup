const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = true || process.env.NODE_ENV === 'development'

module.exports = {
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
   contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    })
  ],
  module: {
    rules: [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          "css-loader"
        ]
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ],
      }
    ],
  }
}
