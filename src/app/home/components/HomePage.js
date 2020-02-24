import React from 'react';
import Debug from 'debug';
import {FormattedMessage} from 'react-intl';
import {Box, Div} from 'cassiopae-core';

import './HomePage.less';

import messages from '../constants/messages';

const debug = Debug('myApp:home:HomePage');

class HomePage extends React.Component {

    render() {

        return (
            <Div id='HomePage' parentProps={this.props}>
                <Box id='HomePage.body'
                     parentProps={this.props}
                     type='primary'
                     title={messages.boxHeader}>
                    <FormattedMessage {...messages.boxBody}/>
                </Box>
            </Div>
        );
    }
}

export default HomePage;
