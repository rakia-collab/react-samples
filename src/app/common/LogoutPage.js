import React from 'react';
import {connect} from 'react-redux';
import {authenticationActions2, newProgressMonitor, PageConfiguration} from 'cassiopae-core';
import Debug from 'debug';

import './less/logoutPage.less';

const debug = Debug('myApplication:common:LogoutPage');
const {logout} = authenticationActions2;

class LogoutPage extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;

        debug("componentDidMount", "Logout user");

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
        const {skinClass} = this.props;

        return <div className="logout-page">
            <PageConfiguration className={skinClass}/>

            <label>{formatMessage(messages.processingLogout)}</label>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        skinClass: state.authentication.skinClass
    }
};

export default connect(mapStateToProps)(LogoutPage);
