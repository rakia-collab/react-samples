import React from 'react';
import {IndexRedirect, IndexRoute, Route, Router} from 'react-router';
import {authenticationActions2, ErrorPage, LandingPage} from 'cassiopae-core';

import LoginPage from './common/LoginPage';
import MainPage from './common/MainPage';
import LogoutPage from './common/LogoutPage';
import AppPage from "./common/AppPage";

// Extract function from actions object
const {privateRoute, publicRoute} = authenticationActions2;

// List all our routes
export const Routes = {
    HOMEPAGE: '/Home',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
};

// Default landing page if the user profile does not specify one
export const DEFAULT_LANDING_PAGE = Routes.HOMEPAGE;

/**
 *
 * @param {object} history
 * @param {array} modules List of modules
 * @param {object} store Redux store
 * @returns {React.Component} Router tree
 */
export default (history, modules, store) => {

    // List all routes from modules
    const modulesRoutes = modules.map(module => {
        if (typeof module.routes === 'function') {
            return module.routes(store)
        }

        return module.routes;
    });

    // Create router rules
    return (
        {/* Use the specified history */}
        <Router history={history}>

            {/* surround all pages with  AppPage */}
            <Route path="/" component={AppPage}>

                {/* surround main page with 'privateRoute' to make sure that only authenticated users can see the page (and its children)*/}
                <Route path="/"
                       key="/"
                       name="app"
                       component={privateRoute({
                           wrapped: MainPage
                       })}>

                    <IndexRoute components={{main: LandingPage}}/>

                    {modulesRoutes}

                </Route>

                {/* surround login page with 'publicRoute' to automatically forward authenticated users to home page */}
                <Route path={Routes.LOGIN}
                       key={Routes.LOGIN}
                       component={publicRoute({
                           wrapped: LoginPage,
                           authenticatedRoute: Routes.HOMEPAGE
                       })}
                />

                {/* logout page  no specific rules */}
                <Route path={Routes.LOGOUT}
                       key={Routes.LOGOUT}
                       component={LogoutPage}
                />

                {/* error page  no specific rules */}
                <Route path={Routes.ERROR}
                       key={Routes.ERROR}
                       component={ErrorPage}
                />

                {/* redirect / path to Login */}
                <IndexRedirect to={Routes.LOGIN}
                               key='IndexRedirect'
                />
            </Route>
        </Router>
    )
};
