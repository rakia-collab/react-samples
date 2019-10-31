import React from 'react';
import Debug from 'debug';
import {Panel} from 'react-bootstrap';

import '../less/HomePage.less';

import messages from '../constants/messages';
import {FormattedMessage} from 'react-intl';
import {Box} from 'cassiopae-core';

const debug = Debug('myApp:home:HomePage');

class HomePage extends React.Component {

    render() {

        return (
            <div>
                <Box type='primary' title={<FormattedMessage {...messages.boxHeader}/>}>
                    <FormattedMessage {...messages.boxBody}/>
                </Box>
            </div>
        );
    }
}

export default HomePage;
