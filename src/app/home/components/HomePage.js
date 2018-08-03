import React from 'react';
import {injectIntl, FormattedDate} from 'react-intl';
import {connect} from 'react-redux';
import Debug from 'debug';
import {EMPTY_OBJECT, authenticationActions2} from 'cassiopae-core';
import {Col, Grid, Row} from 'react-bootstrap';

import MainPage from '../../common/MainPage';
import '../less/HomePage.less';

import messages from '../constants/messages';

const {logout} = authenticationActions2;

const debug = Debug('myApp:home:HomePage');

class HomePage extends React.Component {

    handleClick = () => {
        const {dispatch} = this.props;

        dispatch(logout()).then(() => {
            document.location.reload(true);
        });
    };

    render() {
        const {intl: {formatMessage}, route = EMPTY_OBJECT, uticode} = this.props;

        return (
            <MainPage title={route.title}>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <label>{formatMessage(messages.user, {uticode})}</label>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <button onClick={this.handleClick}>Logout</button>
                        </Col>
                    </Row>
                </Grid>
            </MainPage>
        );
    }
}

const mapStateToProps = (state) => {
    const {authentication: {user}} = state;

    return {
        uticode: user && user.uticode
    }
};

export default connect(mapStateToProps)(injectIntl(HomePage));
