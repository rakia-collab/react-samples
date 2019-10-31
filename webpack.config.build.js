const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpackConfig = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = Object.assign(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js'
    },
    node: {
        fs: 'empty'
    },
    plugins: webpackConfig.plugins.concat([

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
    ]),
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
});
