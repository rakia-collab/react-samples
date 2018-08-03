const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {

    devtool: 'cheap-module-source-map',

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js'
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        //When require, do not have to add these extensions to file's name
        extensions: [".js", ".jsx"],
    },

    plugins: webpackConfig.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'cassiopae-core']
        }),
        new HtmlWebpackPlugin({template: 'src/www/index.ejs', cordovaFile: "cordova.js"}),
        new CleanWebpackPlugin(['build'])
    ])
});