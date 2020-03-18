import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory as routerHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {
    initializeAccessKeys,
    setupAxiosInterceptors,
    configureStore,
    LocalesProviderContainer,
    extensionLoader,
    getQueryParams,
    mergeCoreConfiguration,
    declarePlugin,
    DASHBOARD_ROUTE,
    fetchLocale,
    debugActions,
} from 'cassiopae-core';
import {addLocaleData} from 'react-intl';

import initRouter from './router';
import {addCCHRenderType} from './common/cch/cchExtension';
import config from './cassio-pos-config';
import posconf from './pos-configuration'
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import pt from 'react-intl/locale-data/pt';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
import it from 'react-intl/locale-data/it';
import nl from 'react-intl/locale-data/nl';
import ro from 'react-intl/locale-data/ro';
import zh from 'react-intl/locale-data/zh';
import './app.less';

window.ksiopStatus = 'pos:booting';
const DEFAULT_LANGUAGE = navigator.language;

mergeCoreConfiguration({
    authentication: {
        API: 2,
        configuration: {
            defaultSkin: "skin-blue"
        },
    },

});

function boot() {
    window.ksiopStatus = 'pos:app:booting';

    addLocaleData([...en, ...es, ...fr, ...pt, ...de, ...it, ...nl, ...ro, ...zh]);

// import {whyDidYouUpdate} from 'why-did-you-update'
// if (process.env.NODE_ENV !== 'production') {
//     whyDidYouUpdate(React) // use for debug and improve perf, before use it => npm i why-did-you-update
// }


    const modules = [posconf];
    let menuItems = [
        {
            id: 'Dashboard',
            route: DASHBOARD_ROUTE,
            title: {id: "core.main.dashboard", defaultMessage: "Dashboard"},
            icon: 'fa fa-area-chart',
            active: true,
            visible: false,
            subItems: null,
            order: 0,
        }];

    let modulesReducers = {};
    modules.forEach((module) => {
        modulesReducers = {...modulesReducers, ...module.reducers};
        if (module.menuItems) {
            menuItems = [...menuItems, ...module.menuItems];
        }
    });

    const state = {navigation: {menuItems: menuItems, routeMenuItems: menuItems}};
    const store = configureStore(state, modulesReducers);
    const history = syncHistoryWithStore(routerHistory, store);

    window.ksiopStatus = 'pos:app:booting:store';

    initializeAccessKeys(store.dispatch);

    const {showFields, showDebugInfos} = debugActions;

    const actions = bindActionCreators({
        showFields,
        showDebugInfos
    }, store.dispatch);

    const urlParams = getQueryParams(window.location.search);
    if (urlParams.api) {
        urlParams.api += "/RestServices/";
    }

    setupAxiosInterceptors(window.cassioPosConfig, store.dispatch, store.getState);

    store.dispatch(fetchLocale(DEFAULT_LANGUAGE));

    const router = initRouter(history, undefined, modules, store);

    window.showFields = actions.showFields;
    window.showDebugInfos = actions.showDebugInfos;

    window.ksiopStatus = 'pos:app:booted';

    return {router, store};
}

function declareMyPlugins() {
    declarePlugin("pos", (plugin) => {
        addCCHRenderType(plugin);
    });
}

function run(router, store) {
    const root = document.getElementById('app-content');

    window.ksiopStatus = 'pos:app:initializing';

    ReactDOM.render(
        <Provider store={store}>
            <LocalesProviderContainer>
                {router}
            </LocalesProviderContainer>
        </Provider>,
        root
    );

    window.ksiopStatus = 'pos:app:initialized';
}

extensionLoader(config.plugins || []).then((plugins = []) => {

    window.ksiopStatus = 'pos:plugins:booting';

    plugins.forEach((plugin) => {
        plugin.callBoot();
    });

    const {router, store} = boot();

    declareMyPlugins();

    run(router, store);

    window.ksiopStatus = 'pos:plugins:running';

    plugins.forEach((plugin) => {
        plugin.callStart();
    });

    window.ksiopStatus = 'pos:running';
});
