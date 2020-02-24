import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// We use hashHistory as history engine
import {hashHistory as routerHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {
    configureStore,
    debugActions,
    EMPTY_OBJECT,
    extensionLoader,
    fetchLocale,
    initializeAccessKeys,
    initOffline,
    LocalesProviderContainer,
    mergeCoreConfiguration,
    setupAxiosInterceptors,
} from 'cassiopae-core';
import {addLocaleData} from 'react-intl';
// Create main router
import initRouter from './router';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
// List your module here !
import common from './common';
import home from './home';

import './app.less';

import config from './cassio-pos-config';

window.ksiopStatus = 'pos:booting';
const DEFAULT_LANGUAGE = navigator.language;

//import pt from 'react-intl/locale-data/pt';
//import es from 'react-intl/locale-data/es';
//import de from 'react-intl/locale-data/de';
//import it from 'react-intl/locale-data/it';
//import nl from 'react-intl/locale-data/nl';
//import ro from 'react-intl/locale-data/ro';
//import zh from 'react-intl/locale-data/zh';

// Setup configuration
mergeCoreConfiguration({
    authentication: {
        API: 2,
    },
});

function boot() {
    window.ksiopStatus = 'pos:app:booting';

    addLocaleData([...en, ...fr]);

// import customer from './customer'; // Add your modules HERE   (module = Reducer + Route)
    const modules = [common, home];

    const modulesReducers = modules.reduce((reducers, module) => ({...reducers, ...module.reducers}), {});

// Create a store from reducers
    const store = configureStore(EMPTY_OBJECT, modulesReducers);


// Synchronize history and store
    const history = syncHistoryWithStore(routerHistory, store);

    window.ksiopStatus = 'pos:app:booting:store';

    initializeAccessKeys(store.dispatch);

    const {showFields, showDebugInfos} = debugActions;

// Bind actions  with store's dispatch function
    const actions = bindActionCreators({showFields, showDebugInfos}, store.dispatch);
    window.showFields = actions.showFields;  // showFields is used by
    window.showDebugInfos = actions.showDebugInfos;

// Setup axios configuration
    setupAxiosInterceptors(window.cassioPosConfig, store.dispatch, store.getState);

    store.dispatch(fetchLocale(DEFAULT_LANGUAGE));


// Initialise router with modules
    const router = initRouter(history, undefined, modules, store);

    window.ksiopStatus = 'pos:app:booted';

    return {router, store};
}

function run(router, store) {
    // Search the HTML component which will receive our react application
    const root = document.getElementById('app-content');

    window.ksiopStatus = 'pos:app:initializing';
// Initialize offline state
    initOffline(store.dispatch).then(() => {
        // Render our application
        ReactDOM.render(
            // Initialize the main store
            <Provider store={store}>
                {/* Setup the locale */}
                <LocalesProviderContainer>
                    {/* Add our router*/}
                    {router}
                </LocalesProviderContainer>
            </Provider>,
            root,
        );
        window.ksiopStatus = 'pos:app:initialized';
    });
}


extensionLoader(config.plugins || []).then((plugins = []) => {

    window.ksiopStatus = 'pos:plugins:booting';

    plugins.forEach((plugin) => {
        plugin.callBoot();
    });

    const {router, store} = boot();

    run(router, store);

    window.ksiopStatus = 'pos:plugins:running';

    plugins.forEach((plugin) => {
        plugin.callStart();
    });

    window.ksiopStatus = 'pos:running';
});
