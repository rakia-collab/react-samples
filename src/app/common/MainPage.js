import React from 'react';
import {DebugInfos} from 'cassiopae-core';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';

import MainHeaderBar from './MainHeaderBar';

import './mainPage.less';

class MainPage extends React.Component {

    static childContextTypes = {
        showAccessKeys: PropTypes.bool,
        showDebugInfos: PropTypes.bool,
    };

    getChildContext() {
        const {showAccessKeys, showDebugInfos} = this.props;
        return {
            showAccessKeys,
            showDebugInfos,
        };
    }

    render() {
        const {main, children} = this.props;
        return (
            <div className='main-page'>
                <MainHeaderBar className='main-header'/>
                <div className='main-body'>
                    <DebugInfos/>
                    {main || children}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        showAccessKeys: state.authentication.showFields,
        showDebugInfos: state.authentication.showDebugInfos,
    }),
)(injectIntl(MainPage));
