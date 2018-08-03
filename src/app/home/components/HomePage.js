import React from 'react';
import {injectIntl, FormattedDate} from 'react-intl';
import {connect} from 'react-redux';
import Debug from 'debug';
import {EMPTY_OBJECT} from 'cassiopae-core';

import MainPage from '../../common/MainPage';
import '../less/HomePage.less';

import messages from '../constants/messages';

const debug = Debug('myApp:home:HomePage');

class HomePage extends React.Component {

    render() {
        const {intl: {formatMessage}, route = EMPTY_OBJECT} = this.props;

        return (
            <MainPage title={route.title}>
                <label>{formatMessage(messages.User, {uticode})}</label>
            </MainPage>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uticode: state.authentication.user && state.authentication.user.uticode
    }
};

export default connect(mapStateToProps)(injectIntl(HomePage));
