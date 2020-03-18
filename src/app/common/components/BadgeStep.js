import React from 'react';
import {StepDisplay} from 'cassiopae-core';

class BadgeStep extends React.Component {
    render() {
        const {metadata: {customComponentMetadata = {}}, rowData: {jalcode}} = this.props;
        const {colors, labels} = customComponentMetadata;

        /**
         * Function to get the first letter of each word in a string and capitalize it
         * Ex: 'in service' => 'IS'
         */
        const format_label = (l) => {
            const shortLabel = (l && l.split(" ").map((m) => m.substr(0, 1).toUpperCase())) || '';
            return (<span title={l}>{shortLabel}</span>);
        };
        return (<StepDisplay wrapper='div'
                             format_label={format_label}
                             code={jalcode}
                             colors={colors}
                             labels={labels}/>);
    }
}

export default BadgeStep;
