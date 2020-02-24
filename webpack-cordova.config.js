const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: webpackConfig.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new CleanWebpackPlugin(['build']),
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