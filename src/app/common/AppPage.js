import React from 'react';
import Debug from "debug";
import {injectIntl} from 'react-intl';

import {DEFAULT_NOTIFY_CONFIGURATION, Notifications} from 'cassiopae-core';

import './less/appPage.less';

const debug = Debug("myApplication:common:AppPage");

class AppPage extends React.Component {

    render() {
        const {main, children, intl} = this.props;

        return (<div className="app-page">
                {/*Drawn in all pages, even Login, Logout ...*/}
                <Notifications intl={intl} {...DEFAULT_NOTIFY_CONFIGURATION}/>

                {main || children}
            </div>
        )
    }
}

export default injectIntl(AppPage);
