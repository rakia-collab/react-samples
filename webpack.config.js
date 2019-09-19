const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');


// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src/app');
const dirWWW = path.join(__dirname, 'src/www');
const dirRes = path.join(__dirname, 'src/resources');


const appHtmlTitle = 'Cassiopae POS';

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
            "react-bootstrap-date-picker",
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
            "seamless-immutable"
        ],

        'cassiopae-core': [
            'cassiopae-core'
        ],
        main: path.join(dirApp, 'app'),
    },


    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirWWW,
            dirRes
        ]
    },
    node: {
        fs: 'empty'
    },
    externals: {
        './config': 'cassioPosConfig',
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new webpack.ProvidePlugin({
            // Needed by bootstrap
            jQuery: 'jquery',
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/www/index.ejs'),
            title: appHtmlTitle
        }),
        new TransferWebpackPlugin([
            {from: 'www'}
        ], path.resolve(__dirname, "src"))
    ],
    module: {
        rules: [

            // BABEL
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                include: dirApp,
                options: {
                    compact: true,
                    extends: path.join(__dirname, (IS_DEV)?'.babelrc-dev':'.babelrc-build')
                }
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
            }
        ]
    }
};
