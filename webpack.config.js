const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');


// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src/app');
const dirWWW = path.join(__dirname, 'src/www');
const dirRes = path.join(__dirname, 'src/resources');

const ksiopPluginsFromEnv = process.env.KSIOP_PLUGINS;
const plugins = ksiopPluginsFromEnv && ksiopPluginsFromEnv.split(',') || [];

const appHtmlTitle = 'Accelerator draft sample';

console.log('  * Product version=%s path=%s', require(path.resolve(__dirname, 'package.json')).version, path.resolve(__dirname));
plugins.forEach((plugin) => {
    const p = path.resolve(__dirname, '..', plugin);
    if (!fs.existsSync(p)) {
        console.error('  *** ERROR Plugin %s is not found in path %s', plugin, p);
        process.exit(1);
    }

    const pjson = path.join(p, 'package.json');
    console.log('  * Plugin %s  version=%s path=%s', plugin, require(pjson).version, p);
});
console.log('  * Build mode=%s', (IS_DEV) ? 'development' : 'production');
console.log('');

const pluginDirectories = plugins.map((plugin) => {
    return path.resolve(__dirname, '..', plugin, 'src', 'plugin');
});
const pluginEntries = pluginDirectories.map((pluginDirectory) => {
    return path.resolve(pluginDirectory, 'plugin');
}).filter((path) => fs.existsSync(path + '.js'));

const pluginBootEntries = pluginDirectories.map((pluginDirectory) => {
    return path.resolve(pluginDirectory, 'boot');
}).filter((path) => fs.existsSync(path + '.js'));

const pluginWWWDirectories = plugins.map((plugin) => {
    return (path.resolve(__dirname, '..', plugin, 'src', 'www'));
}).filter((from) => fs.existsSync(from));

const pluginSrcDirectories = plugins.map((plugin) => {
    return (path.resolve(__dirname, '..', plugin, 'src', 'plugin'));
}).filter((from) => fs.existsSync(from));

const pluginNodeModulesDirectories = plugins.map((plugin) => {
    return (path.resolve(__dirname, '..', plugin, 'node_modules'));
}).filter((from) => fs.existsSync(from));

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {

        vendor: [
            "axios",
            "bootstrap",
            "bowser",
            "classnames",
            "history",
            "intl",
            "eventemitter3",
            "lodash",
            "moment",
            "react",
            "react-autocomplete",
            "react-bootstrap",
            "react-datetime",
            "react-dom",
            "react-flip-move",
            "react-intl",
            "react-overlays",
            "react-redux",
            "react-router",
            "react-router-redux",
            "react-select",
            "react-time",
            "redux",
            "redux-batched-actions",
            "redux-form",
            "reselect",
            "seamless-immutable",
        ],

        main: [...pluginBootEntries, path.resolve(dirApp, 'app'), ...pluginEntries],
    },
    externals: {
        './cassio-pos-config': 'cassioPosConfig',
    },

    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirWWW,
            dirRes,
            ...pluginWWWDirectories,
            ...pluginSrcDirectories,
            ...pluginNodeModulesDirectories,
        ],
    },

    node: {
        fs: 'empty',
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),
        new webpack.ProvidePlugin({
            // Needed by bootstrap
            jQuery: 'jquery',
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/www/index.ejs'),
            title: appHtmlTitle,
        }),
        new TransferWebpackPlugin([
            {from: 'www'},
            ...pluginWWWDirectories.map((d) => ({from: d})),
        ], path.resolve(__dirname, "src")),
    ],
    module: {
        rules: [

            // BABEL
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files
                exclude: /(node_modules)/,
                include: dirApp,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            compact: true,
                            extends: path.join(__dirname, 'babel.config.js'),
                        },
                    },
                ],
            },
            // LESS
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },

                ],
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ],
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [],
                        },
                    },

                ],
            },

            // EJS
            {
                test: /\.ejs$/,
                use: 'ejs-loader',
            },

            // Fonts
            {
                test: /\.(svg|woff2|woff|ttf|eot|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: (file) => {
                                if (IS_DEV) {
                                    return '[path][name].[ext]'
                                }
                                return 'assets/[hash].[ext]'
                            },
                        },
                    },
                ],
            },

            // IMAGES
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: (file) => {
                        if (IS_DEV) {
                            return '[path][name].[ext]'
                        }

                        return 'assets/[hash].[ext]'
                    },
                },
            },
        ],
    },
};
