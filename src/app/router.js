import React from 'react';
import {IndexRedirect, Route, Router} from 'react-router';
import {$authenticationActions} from 'cassiopae-core';

import MainPage from './common/MainPage';
import AppPage from "./common/AppPage";

// List all our routes
export const Routes = {
    HOMEPAGE: '/home',
};

/**
 *
 * @param {object} history
 * @param {array} modules List of modules
 * @param {callback} onLogout
 * @param {object} store Redux store
 * @returns {React.Component} Router tree
 */
export default function (history, onLogout, modules, store) {

    const {publicRoute} = $authenticationActions();

    // List all routes from modules
    const modulesRoutes = modules.map(module => {
        if (typeof module.routes === 'function') {
            return module.routes(store)
        }
        return module.routes;
    });

    // Create router rules
    return (
        /* Use the specified history */
        <Router history={history}>

            {/* surround all pages with  AppPage */}
            <Route path="/" component={AppPage}>

                {/* surround main page with 'publicRoute' */}
                <Route path="/"
                       key="/"
                       name="app"
                       component={publicRoute({
                           wrapped: MainPage
                       })}>
                    {modulesRoutes}

                </Route>

                {/* redirect / path to Home */}
                <IndexRedirect to={Routes.HOMEPAGE}
                               key='IndexRedirect'
                />
            </Route>
        </Router>
    )
};
