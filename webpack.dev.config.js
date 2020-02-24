const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const Debug = require('debug');
const fs = require('fs');
const path = require('path');
const HttpsProxyAgent = require('https-proxy-agent');

const proxyLog = Debug('cassioPos:proxy:log');
const proxyDebug = Debug('cassioPos:proxy:debug');
const proxyInfo = Debug('cassioPos:proxy:info');
const proxyWarn = Debug('cassioPos:proxy:warn');
const proxyError = Debug('cassioPos:proxy:error');
const proxyRemapCookie = Debug('cassioPos:proxy:remapCookie');

function proxyLogProvider() {
    return {
        log: proxyLog,
        debug: proxyDebug,
        info: proxyInfo,
        warn: proxyWarn,
        error: proxyError,
    };
}

function cookiePathRewrite(newPath) {
    return function (proxyRes) {
        Object.keys(proxyRes.headers).forEach((key) => {
            const header = proxyRes.headers[key];
            if (key !== 'set-cookie' || !header) {
                return;
            }

            Object.keys(header).forEach((key2) => {
                const cookieToken = header[key2];

                const newCookieToken = cookieToken.split('; ').map((v) => {
                    const reg = /^Path[\s]*=[\s]*(.*)[\s]*$/i.exec(v);
                    if (!reg) {
                        return v;
                    }

                    return 'Path=' + newPath;
                }).join(';');

                header[key2] = newCookieToken;

                proxyRemapCookie('cookie=', cookieToken, 'transformed cookie=', newCookieToken);
            });
        });
    }
}

const DEFAULT_PROXY_PROPERTIES = {
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
};

const SOPRA_HTTP_PROXY = process.env.SOPRA_HTTP_PROXY;
let sopraProxyAgent;
if (SOPRA_HTTP_PROXY) {
    sopraProxyAgent = new HttpsProxyAgent(SOPRA_HTTP_PROXY) || undefined;
    console.log('  * Use http proxy', SOPRA_HTTP_PROXY);
}

function createWebpackProxyConf(proxyConf) {
    const proxies = proxyConfFile[proxyConf];
    if (!proxies) {
        const error = new Error(`  *** ERROR loading configuration, no configuration for POS_PROXY: ${proxyConf}`);
        error.proxyConfFile = proxyConfFile;
        throw error;
    }

    const webpackProxyConf = {};
    Object.keys(proxies).forEach((entryPoint) => {
        const proxy = proxies[entryPoint];

        const {newCookiePath, target, proxyAgent, ...otherConf} = proxy;
        if (!target) {
            const error = new Error(`  *** ERROR loading configuration, no target defined in entry point: ${entryPoint}`);
            error.proxy = proxy;
            throw error;
        }

        let agent = sopraProxyAgent;
        if (proxyAgent) {
            agent = new HttpsProxyAgent(proxyAgent) || undefined;
        }

        const onProxyRes = newCookiePath && cookiePathRewrite(newCookiePath) || undefined;
        const conf = {
            ...DEFAULT_PROXY_PROPERTIES,
            ...otherConf,
            onProxyRes,
            target,
            agent,
        };
        webpackProxyConf[entryPoint] = conf;
    });
    return webpackProxyConf;
}

// Env POS_PROXY sample
// POS_PROXY=POSBAMB1,ARIADNEXT_MOCKUP
const proxyList = process.env.POS_PROXY || '';
let webpackProxyConf = {};
let proxyConfFile;
try {
    proxyConfFile = require('./webpack.dev.proxy-list');
} catch (error) {
    console.warn(`  *** No proxy configuration file "webpack.dev.proxy-list.json" found`);
}

proxyList.length && proxyList.split(',').forEach((proxyConf) => {
    try {
        const _conf = createWebpackProxyConf(proxyConf);
        webpackProxyConf = {
            ...webpackProxyConf,
            ..._conf,
        };
        console.info(`  * Proxy configuration ${proxyConf} loaded`);
    } catch (error) {
        console.error(`  *** ERROR loading configuration from POS_PROXY: ${proxyConf}`, error);
        process.exit(1);
    }
});

let cassiopaeCoreAliases;

const cassiopaeCorePath = process.env.CASSIOPAE_CORE_PATH;
if (cassiopaeCorePath) {
    const jsonPath = path.resolve(path.join(cassiopaeCorePath, 'package.json'));
    if (!fs.existsSync(jsonPath)) {
        console.error(`  *** ERROR CASSIOPAE_CORE_PATH is not valid : ${cassiopaeCorePath}`);
        process.exit(1);
    }

    console.log('  * Use cassiopae core path=', path.resolve(cassiopaeCorePath));

    const cassiopaeCore = require(jsonPath);
    cassiopaeCoreAliases = Object.keys(cassiopaeCore.dependencies).reduce((acc, d) => {
        const ret = path.resolve(path.join(cassiopaeCorePath, 'node_modules', d));

        acc[d] = ret;
        return acc;
    }, {});
    cassiopaeCoreAliases['cassiopae-core'] = path.resolve(path.join(cassiopaeCorePath, 'src'));

    console.log('  * Detect Cassiopae CORE aliases', cassiopaeCoreAliases);
}

module.exports = Object.assign(webpackConfig, {
    devtool: 'inline-source-map',   //Change this to 'inline-source-map' if you want to debug
    resolve: {
        ...webpackConfig.resolve,
        alias: {
            ...cassiopaeCoreAliases,
//            'sanitize-html': path.resolve('../cassiopae-core/node_modules/sanitize-html'),
        }
    },
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: "[name].js",
    },
    devServer: {
        port: 3000,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        watchContentBase: true,
        proxy: webpackProxyConf,
    },
    plugins: webpackConfig.plugins.concat([
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]),
});
