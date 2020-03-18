import React from 'react';
import {Route, IndexRoute, Router, IndexRedirect} from 'react-router';

import LogoutPage from "./common/pages/LogoutPage";
import LandingPage from './common/pages/LandingPage';
import MainLayout from './common/pages/MainLayout';
import ErrorPage from './common/pages/ErrorPage';
import BasePage from './common/pages/BasePage';
import LoginPage from './common/pages/LoginPage';
import {screenSizes} from './common/adminLTE/adminLTE';
import {
    getPrivateRoutesExtensions,
    getPublicRoutesExtensions,
    $authenticationActions,
    Dashboard,
    DASHBOARD_ROUTE
} from 'cassiopae-core';

export const Routes = {
    REGISTER: '/Register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    ERROR: '/error',
    LANDING_PAGE: '/',
};


export const LOGIN = '/login';

function handleOnEnter(state) {
    window.scrollTo(0, 0);

    const body = document.body;
    if (body.clientWidth <= (screenSizes.sm - 1) && body.className.indexOf(" sidebar-open") !== -1) {
        body.className = body.className.replace(' sidebar-open', '');
    }
}

export default function (history, onLogout, modules, store) {

    const {privateRoute, publicRoute} = $authenticationActions();

    let modulesRoutes = modules.map((module) => {
        if (typeof module.routes === 'function')
            return module.routes(store)
        return module.routes;
    });

    //const route = history.getCurrentLocation();

    let privateRoutes = [
        <IndexRoute key="index" components={{main: LandingPage}}/>,

        ...modulesRoutes,

        <Route key="dashboard" path={DASHBOARD_ROUTE + "(/:config)"} components={{main: Dashboard}}/>
    ];

    const privateRoutesExtension = getPrivateRoutesExtensions();
    if (privateRoutesExtension) {
        privateRoutes = privateRoutesExtension.processList(privateRoutes);
    }

    let publicRoutes = [
        <Route key={Routes.LOGIN} path={Routes.LOGIN}
               component={publicRoute({
                   wrapped: LoginPage,
                   authenticatedRoute: Routes.LANDING_PAGE
               })}/>,
        <Route key={Routes.LOGOUT} path={Routes.LOGOUT} component={LogoutPage}/>,
        //<Route path={Routes.REGISTER} component={RegisterPage} key={Routes.REGISTER}/>,
        <Route key={Routes.ERROR} path={Routes.ERROR} component={ErrorPage}/>,
    ];

    const publicRoutesExtension = getPublicRoutesExtensions();
    if (publicRoutesExtension) {
        publicRoutes = publicRoutesExtension.processList(publicRoutes);
    }

    return (
        <Router history={history} onUpdate={handleOnEnter}>
            <Route path="/" component={BasePage}>
                <Route path="/" name="app" component={privateRoute({
                    wrapped: MainLayout
                })} key="/">
                    {privateRoutes}
                </Route>
                {publicRoutes}

                <IndexRedirect to={Routes.LOGIN}/>
            </Route>
        </Router>
    );
}
