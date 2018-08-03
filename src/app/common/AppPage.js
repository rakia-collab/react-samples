import React from 'react';
import Debug from "debug";

import './less/appPage.less';

const debug = Debug("myApplication:common:AppPage");

class AppPage extends React.Component {

    render() {
        const {main, children} = this.props;

        return (<div className="app-page">
                {/*Drawn in all pages, even Login, Logout ...*/}
                <h1>Sopra/Steria</h1>

                {main || children}
            </div>
        )
    }
}

export default AppPage;
