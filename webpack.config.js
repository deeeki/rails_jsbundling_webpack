const path    = require("path")
const webpack = require("webpack")
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer')

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map[query]",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.css', '.scss'],
    modules: [
      path.join(__dirname, 'app/javascript'),
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }
        ]
      },
      {
        test: /\.(bmp|gif|jpe?g|png|tiff|ico|avif|webp|eot|otf|ttf|woff|woff2|svg)$/,
        exclude: /\.(js|mjs|jsx|ts|tsx)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const folders = path.dirname(pathData.filename)
              .replace(`app/javascript/`, '')
              .split('/')
              .slice(1)

            const foldersWithStatic = path.join('static', ...folders)
            return `${foldersWithStatic}/[name][ext][query]`
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
}
