import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import each from "lodash/each";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Button} from 'react-bootstrap';
import {
    Box, Loader, fetchReferenceTableWithParams,
    getReferenceTable,
    fetchReferenceTable,Col, TextEntry, Row, SelectField
} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {tables} from '../../../common/utils/tables';
//import {fetchAuditStockPlanDealers} from '../reducers/actions'
import CardContainer from './CardContainer';

import {selectCategorie, removeCategorie} from '../reducers/actions';
import CategoriePopup from './CategoriePopup';

const options = [
    {code: 'one', value: 'Asset Category'},
    {code: 'two', value: 'Vehicule'},
    {code: 'three', value: 'Asset Category DEL'},

];

export class CategorieContainer extends Component {

    state = {
        availbleList: [{id:'0',status:'blocking', firstName:'Asset Category'},{id:'1',status:'blocking', firstName:'Vehicule' }],
        showCategModal:false,
        selectedList:[{id:'2',status:'blocking', firstName:'Asset 2'}],
    };

    componentWillMount() {
        //   this.props.fetchAuditStockPlanDealers();
    }

    componentDidMount() {
        //this.props.fetchReferenceTableWithParams(tables.COLORJALON, {'DESTINATION': 'AUDIT'});
        // this.props.fetchReferenceTableWithParams(tables.ICONJALAUDIT, {'DESTINATION': 'AUDIT'});
    }

    getListDealersByStatus() {
        let intl = this.props.intl.formatMessage.bind(this.props.intl);
        let columnCards = {
            'TODO': [[{id:'0',status:'blocking', firstName:'Asset Category'}], intl(messages.availCategorie)],
            'INPROG': [[{id:'1',status:'blocking', firstName:'Vehicule' }], intl(messages.selectedCategorie)],

        };

        const listStatus = [];
        let index = 0;
        each(columnCards, (value, key) => {
            listStatus.push({list: value[0], title: value[1], index: ++index});

        });
        return listStatus;
    }
    handleButtonClick = () => {
   this.setState({showCategModal:true});
    }

    closeCategorieModal = () => {
        this.setState({showCategModal:false});
    }

    render() {
        const {
            colorTable,
            iconTable,
            intl: {formatMessage},
            selectCategorie,removeCategorie
        } = this.props;
        let customComponentMetadata = {
            customComponentMetadata: {
                refTable: tables.LANJALON,
                refParams: {'DESTINATION': 'AUDIT'}
            }
        };
        const {availbleList, selectedList, showCategModal} = this.state;
        const title =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.Filtrage)}
        </div>);
        const newProps = {
            type: 'primary',
            widthBorder: true,
            tools: (
                <div title='Add Categorie' className='box-tools'>
                    <div data-toggle='btn-toggle' className='btn-group'>
                        <Button bsStyle='danger'
                                onClick={this.handleButtonClick}>
                            <i className='fa fa-plus'>

                            </i>
                        </Button>
                    </div>
                </div>
            ),
            ...this.props
        };
     const listStatus = this.getListDealersByStatus();
            return (
                <Box title={title} type='primary'>
                    <Row>
                        <div className="col-md-6">
                            <SelectField name='country'
                                         options={options}
                                         title={messages.sales}/>
                        </div>

                    </Row>
                <Row>
                    <div className="col-md-6">

                        <Box title='Available categories' type='primary' {...newProps}>
                        <CardContainer id='0' list={availbleList}
                                       removeCategorie={removeCategorie}
                                       selectCategorie={selectCategorie}
                                       colorTable={[{code:'blocking', label:'white'}]}
                                       customComponentMetadata={customComponentMetadata}/>


                        </Box>
                    </div>
                    <div className="col-md-6">
                        <Box title='Selected categories' type='primary'>

                        <CardContainer id='1' list={selectedList}
                                       selectCategorie={selectCategorie}
                                       removeCategorie={removeCategorie}
                                       colorTable={[{code:'blocking', label:'white'}]}
                                       customComponentMetadata={customComponentMetadata}/>
                        </Box>
                    </div>

                </Row>
                    <CategoriePopup id='pos.quote.costanalysis.popup' showModal={showCategModal}
                                    selectCategorie={selectCategorie}
                                    onClose={this.closeCategorieModal}
                                    ref='categPopup'/>

                </Box>
            )

    }
}

const mapStateToProps = (state) => {
    return {
        dealers: [],
        selectedListFromState: state.make.selectedList,
        availbleListFromState: state.make.availbleList,
    }
}
const mapDispatchToProps = {
    selectCategorie,
    removeCategorie,
    fetchReferenceTableWithParams,
    fetchReferenceTable
};
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CategorieContainer)));


