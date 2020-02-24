const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirApp = path.resolve(__dirname, 'src', 'app');
const dirWWW = path.resolve(__dirname, 'src', 'www');
const dirRes = path.resolve(__dirname, 'src', 'resources');

const ksiopPluginsFromEnv = process.env.KSIOP_PLUGINS;
const plugins = ksiopPluginsFromEnv && ksiopPluginsFromEnv.split(',') || [];

console.log("\
   ____              _                           _           _ _     _\n\
  / ___|__ _ ___ ___(_) ___  _ __   ___  ___    | |__  _   _(_) | __| |\n\
 | |   / _` / __/ __| |/ _ \\| '_ \\ / _ \\/ __|   | '_ \\| | | | | |/ _` |\n\
 | |__| (_| \\__ \\__ \\ | (_) | |_) | (_) \\__ \\   | |_) | |_| | | | (_| |\n\
  \\____\\__,_|___/___/_|\\___/| .__/ \\___/|___/   |_.__/ \\__,_|_|_|\\__,_|\n\
                            |_|                                        ")

console.log('  * Product version=%s path=%s', require(path.resolve(__dirname, 'package.json')).version, path.resolve(__dirname));
console.log('  * Build mode=%s', (IS_DEV) ? 'development' : 'production');

plugins.forEach((plugin) => {
    const p = path.resolve(__dirname, '..', plugin);
    if (!fs.existsSync(p)) {
        console.error('  *** ERROR Plugin %s is not found in path %s', plugin, p);
        process.exit(1);
    }

    const pjson = path.join(p, 'package.json');
    console.log('  * Plugin %s  version=%s path=%s', plugin, require(pjson).version, p);
});


if (ksiopPluginsFromEnv) {
    console.log('WARNING: KSIOP_PLUGINS will no longer be supported ! Please migrate to the new plugins platform.');
}
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

module.exports = {
    entry: {
        main: [...pluginBootEntries, path.resolve(dirApp, 'app'), ...pluginEntries],
        vendor: [
            'axios',
            'bootstrap',
            'chart.js',
            'classnames',
            'clipboard-js',
            'griddle-react',
            'intl',
            'jquery',
            'react',
            'react-autocomplete',
            'react-bootstrap',
            'react-breadcrumbs',
            'react-chartjs-2',
            'react-dnd',
            'react-dnd-html5-backend',
            'react-dom',
            'react-flip-move',
            'react-intl',
            'react-overlays',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-select',
            'react-time',
            'redux',
            'redux-batched-actions',
            'redux-form',
            'reselect',
            'seamless-immutable'
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            dirApp,
            dirWWW,
            dirRes,
            ...pluginWWWDirectories,
            ...pluginSrcDirectories,
            ...pluginNodeModulesDirectories,
        ],
    },
    node: {
        fs: 'empty'
    },
    externals: {
        './cassio-pos-config': 'cassioPosConfig',
        './cptable': 'var cptable',
        './jszip': 'jszip'
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new webpack.ProvidePlugin({
            '_': 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            ReactDOM: 'react-dom',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/www/index.ejs'),
            title: 'Cassiopae POS',
            cordovaFile: 'cordova.js'
        }),
        new TransferWebpackPlugin([
            {from: 'www'},
            ...pluginWWWDirectories.map((d) => ({from: d})),
        ], path.resolve(__dirname, "src"))
    ],
    module: {
        rules: [
            {test: /\.(patchMe|gitignore)$/, loader: 'ignore-loader'},
            // BABEL
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    compact: true,

                    babelrc: false,
                    extends: path.resolve(__dirname, (IS_DEV) ? '.babelrc-dev' : '.babelrc-build')
                },
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                ]
            },
            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: []
                        }
                    }
                ]
            },
            // EJS
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            // Fonts
            {
                test: /\.(svg|woff2|woff|ttf|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: (file) => {
                        if (IS_DEV) {
                            return '[path][name].[ext]'
                        }
                        return 'assets/[hash].[ext]'
                    }
                }
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
                    }
                }
            },
            //Hack for react-pivot
            {
                test: /\.jsx?$/,
                include: /react-pivot/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    extends: path.resolve(__dirname, (IS_DEV) ? '.babelrc-dev' : '.babelrc-build')
                },
            }
        ]
    }
};
