import React from 'react';
import {PageHeader} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import messages from './constants/messages';

class MainHeaderBar extends React.Component {

    render() {
        return (
            <PageHeader><FormattedMessage {...messages.header}/></PageHeader>
        );
    }


}

export default MainHeaderBar;