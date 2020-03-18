import React from 'react';
import {injectIntl} from 'react-intl';

class ErrorMessageWrapper extends React.Component {

    render() {
        let {intl: {formatMessage}, rowData} = this.props;

        return <span>{formatMessage(rowData)}</span>;
    }
}

export default injectIntl(ErrorMessageWrapper);