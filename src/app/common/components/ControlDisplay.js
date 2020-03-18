import React from 'react';

class ControlDisplay extends React.Component {

    render() {
        let {rowData} = this.props;

        let icon = 'fa-warning warning';
        if (rowData.flagerreur === 1 || rowData.flagerreur) {
            icon = 'fa-minus-circle error';
        }

        return <i className={`fa fa-fw ${icon}`}/>;
    }
}

export default ControlDisplay;