import React from 'react';
import {injectIntl} from 'react-intl';
import {Jumbotron, Row, Col} from 'react-bootstrap';
import {GlobalMessages, SkinDiv} from 'cassiopae-core';
import Debug from 'debug';

import config from './cassio-pos-pos-configuration';

const debug = Debug('pos:common:pages:AppsPage');

class AppsPage extends React.Component {

    onAndroidClick = () => {
        let pathName = window.location.pathname;
        let context = pathName.replace(/\//g, '');
        let origin = window.location.origin;
        let url = `${origin}${pathName}apps/${context}.apk`;

        debug('onAndroidClick', 'pathName', pathName, 'context', context, 'origin', origin, 'url', url);
        location.href = url;
    };

    onIOSClick = () => {
        let pathName = window.location.pathname;
        let origin = window.location.origin;
        let url = `${origin}${pathName}apps/manifest.plist`;

        debug('onIOSClick', 'origin', origin, 'pathName', pathName, 'url', url);
        location.href = `itms-services://?action=download-manifest&url=${url}`;
    };

    render() {
        const {intl: {formatMessage}} = this.props;

        const logoSrc = config.loginLogoImg || 'img/login/logo_login.png';
        const background = config.loginBackgroundImg || 'img/login/bg_login.jpg';
        const contentStyle = {
            background: `url(${background}) no-repeat`,
            backgroundSize: 'cover'
        };

        return (
            <SkinDiv className='apps-container' style={contentStyle}>
                <div className='center-apps'>
                    <img src={logoSrc} alt='Logo'/>
                    <Jumbotron className='apps-jumbotron'>
                        <Row>
                            <Col xs={12} md={6} lg={4} className='icon-container'>
                                <i className='fa fa-android fa-5x' aria-hidden={true} onClick={this.onAndroidClick}/>
                            </Col>
                            <Col xs={12} md={6} lg={8} className='text-container'>
                                {formatMessage(GlobalMessages.androidAppText)}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} lg={4} className='icon-container'>
                                <i className='fa fa-apple fa-5x' aria-hidden={true} onClick={this.onIOSClick}/>
                            </Col>
                            <Col xs={12} md={6} lg={8} className='text-container'>
                                {formatMessage(GlobalMessages.iOSAppText)}
                            </Col>
                        </Row>
                    </Jumbotron>
                </div>
            </SkinDiv>
        );
    }
}

export default injectIntl(AppsPage)
