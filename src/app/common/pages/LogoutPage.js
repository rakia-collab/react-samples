import React from 'react'
import {FormattedMessage} from "react-intl";
import {newProgressMonitor, $authenticationActions} from 'cassiopae-core';
import Debug from 'debug';

import '../../common/less/app/logoutPage.less';
import {connect} from 'react-redux';

const debug = Debug('Common:pages:LogoutPage');

class LogoutPage extends React.Component {
    componentDidMount() {
        debug("componentDidMount", "Logout user");

        const {dispatch} = this.props;
        const {logout} = $authenticationActions();
        const progressMonitor = dispatch(newProgressMonitor("logout"));
        const now = Date.now();

        dispatch(logout(true, progressMonitor)).then((result) => {
            debug("componentDidMount", "change location   result=", result);

            const t = Math.max(3000 - (Date.now() - now), 10);

            debug("componentDidMount", "change location   result=", result, "delay=", t);

            setTimeout(() => {
                document.location = "#/";
            }, t);

        }, (error) => {
            console.error("componentDidMount", "Logout error=", error);
        });
    }

    render() {
        return <div className='logout-page'>
            <label className='logout-processing-message'>
                <FormattedMessage id="core.logout.processing"
                                  defaultMessage="Processing logout ..."/>
            </label>
        </div>;
    }
}

export default connect()(LogoutPage);
