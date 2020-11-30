var debug   = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path    = require('path');

module.exports = {

  context: path.join(__dirname, "src"),
  entry: "./js/client.js",
  module: {
    rules: [{
      test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env',{'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
        }]
      }]
    },
    output: {
      path: __dirname + "/src/",
      filename: "client.min.js"
    },
    plugins : [
      new webpack.DefinePlugin({
        PORT: JSON.stringify(process.env.PORT),
        DOMAIN: JSON.stringify(process.env.DOMAIN),
        API_TOKEN: JSON.stringify(process.env.API_TOKEN),
        ENV: JSON.stringify(process.env.ENV),

      })
    ],
  }