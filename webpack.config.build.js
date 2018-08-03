const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
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
        new CleanWebpackPlugin(['build']),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 1024,
            minRatio: 0.8
        }),
        new WebpackPwaManifest({
            filename: 'manifest.json',
            name: 'VWAPP',
            short_name: 'VWAPP',
            description: 'Cassiopae Point of Sale',
            background_color: '#005DAA',
            orientation: 'portrait',
            display: 'standalone',
            inject: true,
            fingerprints: false,
            ios: {
                'apple-mobile-web-app-title': 'VWAPP',
                'apple-mobile-web-app-status-bar-style': 'black'
            },
            icons: [
                {
                    src: path.resolve(__dirname, 'src/www/img/favicons/volk.ico'),
                    size: '36x36'
                }
            ]
        }),
    ])
});