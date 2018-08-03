import React from 'react';
import Debug from "debug";

import './less/appPage.less';

const debug = Debug("myApplication:common:AppPage");

class AppPage extends React.Component {

    render() {
        const {main, children} = this.props;

        return (<div className="app-page">
                {main || children}
            </div>
        )
    }
}

export default AppPage;
