import React from 'react';
import {Box, Col, TextEntry, Row, SelectField,SearchEntryField} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import DualListBox from 'react-dual-listbox';

import CategorieContainer from './CategorieContainer';


const options = [
    {value: 'one', label: 'Asset Category'},
    {value: 'two', label: 'Vehicule'},
    {value: 'three', label: 'Asset Category DEL'},

];

export default class Filtrage extends React.Component {

    state = {
        selected: [],
        selectedList:[],
    };
    onChange = (selected) => {
        const selectedList = options.filter(
            item => selected.indexOf(item.value) !== -1);
        this.setState({selected, selectedList});
    };

    render() {

        const {intl} = this.props;
        const {selected, selectedList} = this.state;

        return (
            <CategorieContainer intl={intl}/>

        );
    }

}


