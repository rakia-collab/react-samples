import React from 'react';
import {Col, Row} from 'cassiopae-core';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

import MainHeaderBar from './MainHeaderBar';

import './less/mainPage.less';

class MainPage extends React.Component {

    getChildContext() {
        const {intl} = this.props;
        return {intl};
    }

    render() {
        const {main, children} = this.props;
        return (
            <div className='main-page'>
                <Row className='main-header'>
                    <Col xs={12}>
                        <MainHeaderBar className='main-header'/>
                    </Col>
                </Row>
                <Row className='main-body'>
                    <Col xs={10}>
                        {main || children}
                    </Col>
                </Row>
            </div>
        );
    }
}

MainPage.childContextTypes = {
    intl: PropTypes.object,
};

export default injectIntl(MainPage);
