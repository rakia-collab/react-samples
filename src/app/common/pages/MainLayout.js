import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classNames from "classnames";
import {injectIntl} from 'react-intl';
import {DebugInfos} from 'cassiopae-core';

import HeaderBar from "../header/HeaderBar";
import MainSideBar from "./MainSideBar";


class MainLayout extends React.Component {

    static childContextTypes = {
        showAccessKeys: PropTypes.bool,
        showDebugInfos: PropTypes.bool,
    };

    state = {
        showSidebar: false
    };


    getChildContext() {
        const {showAccessKeys, showDebugInfos} = this.props;
        return {
            showAccessKeys,
            showDebugInfos,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize, true);
    }

    resize = () => {
        this.setState({
            showSidebar: false
        });
    };

    handleToggleSidebar = () => {
        this.setState((previousState, currentProps) => {
            return {
                showSidebar: !previousState.showSidebar
            };
        });
    };

    componentWillReceiveProps(nextProps) {
        const lastRoute1 = this.props.routes.length && this.props.routes[this.props.routes.length - 1];
        const lastRoute2 = nextProps.routes.length && nextProps.routes[nextProps.routes.length - 1];
        if (lastRoute1 != lastRoute2) {
            this.setState((previousState, currentProps) => {
                if (previousState.showSidebar)
                    return {
                        showSidebar: !previousState.showSidebar
                    };
            });
        }
    }

    render() {
        const {main, options, skinClass, intl, ...props} = this.props;

        const lastRoute = props.routes.length && props.routes[props.routes.length - 1];

        const sectionClasses = {
            content: true,
            full: this.props.options.HideLeftBar
        };

        if (lastRoute && lastRoute.className) {
            sectionClasses[lastRoute.className] = true;
            sectionClasses['sidebar-opened'] = this.state.showSidebar;
        }

        if (lastRoute && lastRoute.hideMenu) {
            return <div className={skinClass}>
                <section className={classNames(sectionClasses)}>
                    {main}
                </section>
            </div>;
        }

        const header = options.HideTopBar !== true && (<HeaderBar id='headerBar'/>);
        const leftSide = options.HideLeftBar !== true && (<MainSideBar id='mainSideBar'/>);
        // const profileSidebar = lastRoute.profileSidebar === true && (<MyProfileSidebar page={lastRoute.path}/>);

        const contentClasses = {
            // 'content-wrapper': true,
            'mainLayout-content': true,
            'fixed-Layout': options.fixedLayout,
            'full': options.HideLeftBar,
        };

        return (
            <div className='mainLayout-page'>
                {/* Header banner */}
                {header}

                <div className='mainLayout-main'>
                    {/* Main navigation sidebar */}
                    {leftSide}

                    <div className={classNames(contentClasses)}>
                        <DebugInfos/>
                        <section className={classNames(sectionClasses)}>
                            {main}
                        </section>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    (state) => ({
        showAccessKeys: state.authentication.showFields,
        showDebugInfos: state.authentication.showDebugInfos,
        options: state.authentication.options,
        skinClass: state.authentication.skinClass
    })
)(injectIntl(MainLayout));
