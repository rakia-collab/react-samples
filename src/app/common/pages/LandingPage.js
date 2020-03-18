import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames'
import Debug from "debug";

import {Notifications, PageConfiguration} from 'cassiopae-core';

const debug = Debug("core:pages:LandingPage");

class LandingPage extends React.Component {

    redirectToLandingPage(props) {
        debug('redirectToLandingPage', 'props=', props);

        const {landingPage, router} = props;
        if (landingPage) {
            router.push(landingPage);
        }
    }

    componentDidMount() {
        this.redirectToLandingPage(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {landingPage} = this.props;
        if (nextProps.landingPage && nextProps.landingPage !== landingPage) {
            this.redirectToLandingPage(nextProps);
        }
    }

    render() {
        let {
            logoComponent, logoSrc, favicon
        } = this.props;

        if (!logoComponent && logoSrc) {
            logoComponent = <img className="logo" src={logoSrc} alt="Logo"/>;
        }

        return (
            <div className='landing-page'>
                <div className="landing-content">
                    {logoComponent || []}

                    <div className="landing-message">
                        <FormattedMessage id="core.landingpage.configuration.required"
                                          defaultMessage="No landing page and no dashboard have been defined in resource /userconfiguration"/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {authentication = {}} = state;

    let {options: {landingpage: landingPage} = {}} = authentication;


    return {
        landingPage,
    }
};

export default connect(mapStateToProps)(withRouter(LandingPage));
