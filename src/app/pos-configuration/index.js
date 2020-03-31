import React from "react";
import {Route} from "react-router";
import {enableBatching} from "redux-batched-actions";

import {getAsyncInjectors} from 'cassiopae-core'

import messages from './Constantes/messages';


export const MAKEMODEL = "/configuration/makesModels";
export const NEWMAKEMODEL = "/configuration/newMakesModels";
export const MAKE= "/MAKE";
export const WORKFLOW = "/WorkFlow/NewWorkFlow";


export default {

    menuItems: [

        {
            id: 'Model',
            route: MAKEMODEL,
            title: messages.configurationslTitle,
            icon: 'fa fa-car'
        },
        {
            id: 'WorkFlow',
            route: WORKFLOW,
            title: messages.newWorkflowlTitle,
            icon: 'fa fa-car'
        }

    ],

    routes: (store) => {

        const {injectReducer} = getAsyncInjectors(store); //allow hot loading
        return [
            <Route path={MAKEMODEL} key={MAKEMODEL}
                   getComponents={(nextState, callback) => {
                       require.ensure([], (require) => {
                           injectReducer(

                               {
                                   name: 'makes',
                                   reducer: require('./reducers/makeModel').default
                               }

                           );
                           callback(null, {main: require('./components/MakeModelContainer').default})
                       })
                   }}
            />,
            <Route path={NEWMAKEMODEL}key={NEWMAKEMODEL}
                   getComponents={(nextState, callback) => {
                       require.ensure([], (require) => {
                           injectReducer(

                               {
                                   name: 'make',
                                   reducer: require('./make/reducers/makeReducer').default
                               }
                               ,
                               {
                                   name: 'model',
                                   reducer: require('./model/reducers/modelReducre').default
                               }
                               ,
                               {
                                   name: 'trim',
                                   reducer: require('./trimLevel/reducers/trimReducre').default
                               }

                           );
                           callback(null, {main: require('./make/components/MakeContainer').default})
                       })
                   }}
            />,
            <Route path={`${MAKE}(/:makecode)`}key={MAKE}
                   getComponents={(nextState, callback) => {
                       require.ensure([], (require) => {
                           injectReducer(

                               {
                                   name: 'make',
                                   reducer: require('./make/reducers/makeReducer').default
                               },

                               {
                                   name: 'model',
                                   reducer: require('./model/reducers/modelReducre').default
                               },
                               {
                                   name: 'trim',
                                   reducer: require('./trimLevel/reducers/trimReducre').default
                               }

                           );
                           callback(null, {main: require('./make/components/MakeContainer').default})
                       })
                   }}
            />,
            <Route path={WORKFLOW} key={WORKFLOW}
            getComponents={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, {main: require('./WorkFlow/components/CustomDiagram').default})
            })
        }}
        />



        ]
    }
}
