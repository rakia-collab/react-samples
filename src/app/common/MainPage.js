import React from 'react';
import {connect} from 'react-redux';
import {PageConfiguration} from 'cassiopae-core';

// import SideBar from "./SideBar";

import './less/mainPage.less';

class MainPage extends React.Component {

    render() {
        const {main, children, skinClass} = this.props;

        return (
            <div className='main-page'>
                <PageConfiguration className={skinClass} key="pageConfiguration"/>
                {/*<SideBar key="sidebar"/> */}

                {main || children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const skinClass = state.authentication.skinClass;

    return {
        skinClass
    }
};

export default connect(mapStateToProps)(MainPage);
