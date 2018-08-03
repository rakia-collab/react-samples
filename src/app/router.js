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

// Export routes
export default (history, onLogout, modules, store) => {

    // List all routes from modules
    const modulesRoutes = modules.map(module => {
        if (typeof module.routes === 'function') {
            return module.routes(store)
        }

        return module.routes;
    });

    // Create router rules
    return (
        <Router history={history}>
            <Route path="/" component={AppPage}>
                <Route path="/" name="app" component={privateRoute({
                    wrapped: MainPage
                })} key="/">
                    <IndexRoute components={{main: LandingPage}}/>
                    {modulesRoutes}

                </Route>
                <Route path={Routes.LOGIN} key={Routes.LOGIN}
                       component={publicRoute({
                           wrapped: LoginPage,
                           authenticatedRoute: Routes.HOMEPAGE
                       })}/>
                <Route path={Routes.LOGOUT} component={LogoutPage} key={Routes.LOGOUT}/>
                <Route path={Routes.ERROR} component={ErrorPage} key={Routes.ERROR}/>

                <IndexRedirect to={Routes.LOGIN}/>
            </Route>
        </Router>
    )
};
