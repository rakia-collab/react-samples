import React from 'react';

class ControlMessageDisplay extends React.Component {

    render() {
        let {data, rowData: {anomalie = ''}} = this.props;

        let controlMessage = null;
        if (data && data.trim() !== '') {
            controlMessage = data;
        } else {
            controlMessage = anomalie;
        }

        return <span>{controlMessage}</span>;
    }
}

export default ControlMessageDisplay;