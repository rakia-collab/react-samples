import React from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {SelectField, copyCCHComponentDeviceProps} from "cassiopae-core";

import {tables} from '../utils/tables';

const SELECT_PROPS = {
    placeholder: PropTypes.string,
    allowEmptyParams: PropTypes.bool,
};

class CCHSelectField extends React.Component {

    render() {
        const {id, name, cchInfos, refTable, tableParameterName, tableParameterValue, onChange} = this.props;
        const {comtype} = cchInfos;

        const selectProps = {
            id,
            refTable,
            refParams: {[tableParameterName]: tableParameterValue},
            dataProps: {'data-rxcch': cchInfos.cchsid},
            title: cchInfos.lfetext,
            onChange,
        };

        switch (comtype) {
            case 'COMBOTTRPARAM':
            case 'COMBOTUSPARAM':
                selectProps.name = name + '.cvastringvalue';
                break;

            case 'INTEGERCOMBOBOX':
                selectProps.name = name + '.cvanumericvalue';
                break;

            default:
                throw new Error('comtype is not supported');
        }

        copyCCHComponentDeviceProps(selectProps, SELECT_PROPS, cchInfos);

        const comp = <SelectField {...selectProps} />;

        return comp;
    }
}

function mapStateToProps(state, props) {
    const {cchInfos: {comtype, props: {tableCode}}} = props;

    let refTable;
    let tableParameterName;
    let tableParameterValue;

    switch (comtype) {
        case 'COMBOTTRPARAM':
            refTable = tables.LANTTRPARAM;
            tableParameterName = 'ttrnom';
            tableParameterValue = tableCode;
            break;

        case 'COMBOTUSPARAM':
            refTable = tables.LANTUSPARAM;
            tableParameterName = 'tusnom';
            tableParameterValue = tableCode;
            break;

        case 'INTEGERCOMBOBOX':
            break;
    }

    return {
        refTable,
        tableParameterName,
        tableParameterValue,
    };
}

export default connect(mapStateToProps)(CCHSelectField);
