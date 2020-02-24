const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
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
    plugins: webpackConfig.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new CleanWebpackPlugin(['build']),
        new WebpackPwaManifest({
            filename: 'manifest.json',
            name: 'Cassiopae',
            short_name: 'Cassiopae',
            description: 'Cassiopae Point of Sale',
            background_color: '#005DAA',
            orientation: 'portrait',
            display: 'standalone',
            inject: true,
            fingerprints: false,
            ios: {
                'apple-mobile-web-app-title': 'CassioPOS',
                'apple-mobile-web-app-status-bar-style': 'black'
            },
            icons: [
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-36x36.png'),
                    size: '36x36'
                },
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-48x48.png'),
                    size: '48x48'
                },
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-72x72.png'),
                    size: '72x72'
                },
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-96x96.png'),
                    size: '96x96'
                },
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-144x144.png'),
                    size: '144x144'
                },
                {
                    src: path.resolve(__dirname, 'src/www/img/favicon/android-icon-192x192.png'),
                    size: '192x192'
                }
            ]
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'CassioPoS',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.gitignore$/, /\.gz$/, /\.ejs$/, /\.patchMe$/, /\.xml$/, /manifest\.json$/],
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                    handler: 'cacheFirst'
                },
                {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                    handler: 'cacheFirst'
                }
            ]
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 1024,
            minRatio: 0.8
        })
    ])
});
