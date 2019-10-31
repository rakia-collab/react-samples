const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
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
