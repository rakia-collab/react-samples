import React from 'react';
import {Route} from 'react-router';

import {Routes} from "../router";
import HomePage from "./components/HomePage";
import messages from "./constants/messages";

export default {
    reducers: {
    },
    routes: (store) => {
        return [
            <Route path={Routes.HOMEPAGE} key={Routes.HOMEPAGE} component={HomePage} title={messages.pageTitle}/>
        ];
    }
};
