import React from 'react';
import {defineMessages, injectIntl} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import isEmpty from 'lodash/isEmpty'
import ProfileModal from './ProfileModal';
import DealershipBrandContainer from './DealershipBrandContainer';
import HeaderLoader from './HeaderLoader';

import {screenSizes} from '../adminLTE/adminLTE';
import {$authenticationActions, fetchLocale} from 'cassiopae-core';


const messages = defineMessages({
    changePassword: {id: 'core.header.profile.changepassword', defaultMessage: 'Change password'},
    profile: {id: 'core.header.profile', defaultMessage: 'Profile'},
    signOut: {id: 'core.header.profile.signount', defaultMessage: 'Sign out'}
});

const ID = 'headerBar';

class HeaderBar extends React.Component {

    state = {
        initProfileModal: false,
        showProfileModal: false
    };

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {

    }




    pushMenu = () => {
        let body = document.body;
        if (body.clientWidth > screenSizes.sm - 1) {
            if (body.className.indexOf('sidebar-collapse') === -1) {
                body.className += ' sidebar-collapse';
            } else {
                body.className = body.className.replace(' sidebar-collapse', '');
            }
        } else {
            if (body.className.indexOf('sidebar-open') === -1) {
                body.className += ' sidebar-open';
            } else {
                body.className = body.className.replace(' sidebar-open', '');
            }
        }
    };



    closeProfile = () => {
        this.setState({
            showProfileModal: false
        });
    };

    openProfile = () => {
        this.setState({
            initProfileModal: true,
            showProfileModal: true
        });
    };

    handleLocaleChanged = (event, value) => {
        let {skinClass, dispatch} = this.props;
        const {updateConfiguration} = $authenticationActions();

        let config = {skin: skinClass, locale: value.replace('-', '_')};

        dispatch(updateConfiguration(config)).then(() => {
            dispatch(fetchLocale(value));
        });
        this.closeProfile();
    };

    handleChangeSkin = (skinClass) => {
        const {intl: {locale}, dispatch} = this.props;
        const {updateConfiguration} = $authenticationActions();
        this.closeProfile();

        dispatch(updateConfiguration({skin: skinClass, locale: locale.replace('-', '_')}));
    };

    render() {
        const {showProfileModal, initProfileModal} = this.state;
        const {
            id = ID,
            intl: {formatMessage, locale},  menuItems, topLeftItem, groupLabel, username, hideLeftBar,
            otherOptions: {showSkinSelector, hideLanguageSelector}
        } = this.props;


        return (
            <header className='mainLayout-header' id={id}>
                <nav className='navbar navbar-static-top' role='navigation'>

                    <Link key='logo' to='/' className='logo' id={id + '.Logo'}>
                        <span className='truncate'>
                        {
                            isEmpty(topLeftItem.toplefttitleimage) ? <b>{topLeftItem.toplefttitle}</b> :
                                <img src={topLeftItem.toplefttitleimage}/>
                        }
                        </span>
                    </Link>
                    <HeaderLoader key='loader' id={id + '.Loader'}/>
                    <div key='custom-menu' className='navbar-custom-menu'>
                        <ul className='nav navbar-nav'>

                            <li className='dropdown user user-menu'>
                                <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                                   id={id + '.ProfileDropdown'}>
                                    <i className='glyphicon glyphicon-user user-image'/>
                                    <span className='hidden-xs'>{username}</span>
                                </a>
                                <ul className='dropdown-menu'>
                                    <li className='user-header'>
                                        <i className='glyphicon glyphicon-user img-circle'/>
                                        <p>
                                            {username} - {groupLabel}
                                            <small>
                                                <Link to={{pathname: 'login', query: {changePasswordStep: true}}}
                                                      id={id + '.ChangePasswordButton'}>
                                                    <small>{formatMessage(messages.changePassword)}</small>
                                                </Link>
                                            </small>
                                        </p>
                                    </li>
                                    <DealershipBrandContainer/>
                                    <li className='user-footer'>
                                        <div className='pull-left'>
                                            <button onClick={this.openProfile} className='btn btn-default btn-flat'
                                                    id={id + '.ProfileButton'}>
                                                {formatMessage(messages.profile)}
                                            </button>
                                        </div>
                                        <div className='pull-right'>
                                            <Link to='logout' className='btn btn-default btn-flat'>
                                                {formatMessage(messages.signOut)}
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                {initProfileModal && <ProfileModal showModal={showProfileModal}
                                                   key='profileModal'
                                                   id={id + '.profileModal'}
                                                   onClose={this.closeProfile}
                                                   showSkinSelector={showSkinSelector}
                                                   hideLanguageSelector={hideLanguageSelector}
                                                   username={username}
                                                   locale={locale}
                                                   onLocaleChange={this.handleLocaleChanged}
                                                   onSkinChange={this.handleChangeSkin}/>}
            </header>
        );
    }
}

const logosSelector = createSelector(
    state => state.authentication.options.toplefttitle,
    state => state.authentication.options.toplefttitleimage,
    state => state.authentication.options.toplefttitleimagemin,
    (toplefttitle, toplefttitleimage, toplefttitleimagemin) => {
        return {
            toplefttitle: toplefttitle,
            toplefttitleimage: toplefttitleimage,
            toplefttitleimagemin: toplefttitleimagemin
        };
    }
);

const otherOptionsSelector = createSelector(
    state => state.authentication.options.showskinselector,
    state => state.authentication.options.hidelanguageselector,
    (showSkinSelector, hideLanguageSelector) => {
        return {
            showSkinSelector, hideLanguageSelector
        };
    }
);


const mapStateToProps = (state) => {
    return {
        username: state.authentication.user.firstname,
        groupLabel: state.authentication.user.groupelabel,
        skinClass: state.authentication.skinClass,
        otherOptions: otherOptionsSelector(state),
        topLeftItem: logosSelector(state),
        menuItems: state.navigation.menuItems,
        defaultDealership: state.authentication.user.dealershipdefault,
        defaultBrand: state.authentication.user.branddefault,
        hideLeftBar: state.authentication.options.HideLeftBar
    };
};

export default connect(mapStateToProps)(injectIntl(HeaderBar));
