import React, {Component} from 'react';
import {StepDisplay} from 'cassiopae-core';

export class StepDisplayWrapper extends Component {

    render() {
        const {metadata: {customComponentMetadata = {}}, rowData: {jalcode}} = this.props;
        const {colors, labels} = customComponentMetadata;
        return <StepDisplay className='truncate'
                            wrapper='span'
                            code={jalcode}
                            colors={colors}
                            labels={labels}/>;
    }
}

export class BadgeStepWrapper extends React.Component {

    render() {
        const {metadata: {customComponentMetadata = {}}, rowData: {jalcode}} = this.props;
        const {colors, labels} = customComponentMetadata;

        const format_label = (l) => {
            const shortLabel = (l && l.split(' ').map((m) => m.substr(0, 1).toUpperCase())) || '';
            return <span title={l}>{shortLabel}</span>;
        };

        return <StepDisplay wrapper='div'
                            format_label={format_label}
                            code={jalcode}
                            colors={colors}
                            labels={labels}/>;
    }
}
