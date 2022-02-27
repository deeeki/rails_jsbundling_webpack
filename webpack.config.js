const path    = require("path")
const webpack = require("webpack")
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
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
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new VueLoaderPlugin()
  ]
}
