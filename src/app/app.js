import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// We use hashHistory as history engine
import {hashHistory} from 'react-router';

import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {
    authenticationActions,
    setupAxiosInterceptors,
    configureStore,
    initOffline,
    offlineActions,
    mergeCoreConfiguration,
    addLocaleMessages,
    EMPTY_OBJECT
} from 'cassiopae-core'

// Extract actions we will use
const {showFields} = authenticationActions;

import config from './config'
import './app.less';

import {addLocaleData} from 'react-intl';
import LocalesProviderContainer from './core/LocalesProviderContainer';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

// If you add more locales don't forget to add  core_XX locales and Intl locales at the end of this file !
//import pt from 'react-intl/locale-data/pt';
//import es from 'react-intl/locale-data/es';
//import de from 'react-intl/locale-data/de';
//import it from 'react-intl/locale-data/it';
//import nl from 'react-intl/locale-data/nl';
//import ro from 'react-intl/locale-data/ro';
//import zh from 'react-intl/locale-data/zh';

import core_fr from 'cassiopae-core/es/intl/fr';
// import core_es from 'cassiopae-core/es/intl/es';
// import core_de from 'cassiopae-core/es/intl/de';

addLocaleData([...en, ...fr]);  // , ...es, ...fr, ...pt, ...de, ...it, ...nl, ...ro, ...zh
addLocaleMessages(core_fr);

// Setup CORE library
mergeCoreConfiguration({
    authentication: {
        API: 2,  // Use new authentification API
    }
});

// List your module here !
import common from './common';
import home from './home';

// import customer from './customer'; // Add your modules HERE   (module = Reducer + Route)
const modules = [common, home, /*customer */];

//  List all reducers
const modulesReducers = modules.reduce((reducers, module) => ({...reducers, ...module.reducers}), {});

// Create a store from reducers
const store = configureStore(EMPTY_OBJECT, modulesReducers);

// Bind actions  with store's dispatch function
const actions = bindActionCreators({showFields}, store.dispatch);
window.showFields = actions.showFields;  // showFields is used by

// Setup axios configuration
setupAxiosInterceptors(window.cassioPosConfig, store.dispatch, store.getState);

// Synchronize history and store
const history = syncHistoryWithStore(hashHistory, store);

// Create main router
import initRouter from './router';

// Initialise router with modules
const router = initRouter(history, modules, store);

function startApplication() {
    // Search the HTML component which will receive our react application
    const root = document.getElementById('app-content');

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
            root
        );
    });
};

// IOS Safari does not support window.Intl and some MSIE versions
if (!window.Intl || window.navigator.appVersion.indexOf("MSIE 10.0") != -1) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/fr.js',
        'cassiopae-core/es/intl/fr.js',
        // XXXXXXXXXXXXXXXX  ADD NEW LOCALES  HERE !!!!

    ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/fr.js');
        require('cassiopae-core/es/intl/fr.js');
        // XXXXXXXXXXXXXXXX  ADD NEW LOCALES  HERE !!!!

        // Launch react render
        startApplication();
    });

} else {
// Launch react render
    startApplication();
}
