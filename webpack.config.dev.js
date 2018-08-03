const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(webpackConfig, {

    devtool: 'inline-source-map',//Change this to 'inline-source-map' if you want to debug

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: "[name].js"
    },
    devServer: {
        port: 3000,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    plugins: webpackConfig.plugins.concat([
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ])

});