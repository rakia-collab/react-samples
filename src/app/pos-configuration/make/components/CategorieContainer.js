import React, {Component} from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import each from "lodash/each";
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Button,OverlayTrigger, Tooltip} from 'react-bootstrap';
import {
    Box, Loader, fetchReferenceTableWithParams,
    getReferenceTable,
    fetchReferenceTable,Col, TextEntry, Row, SelectField
} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {tables} from '../../../common/utils/tables';
//import {fetchAuditStockPlanDealers} from '../reducers/actions'
import CardContainer from './CardContainer';

import {selectCategorie, removeCategorie, setAvailbleList, setSelectedList} from '../reducers/actions';
import CategoriePopup from './CategoriePopup';

const options = [
    {code: 'FS', label: 'Finance shop'},
    {code: 'OTHER', label: 'Others'}

];
const categFS = [
    {code: 'CAR', label: 'Cars'},
    {code: 'MATERIAL', label: 'Material'},
    {code: 'INTANGIBLE', label: 'Finance'},

];

const catOth =[{code: 'REALESTATE', label: 'Real Estate',id:'0'}];
export class CategorieContainer extends Component {

    state = {
        availbleList: [],
        showCategModal:false,
        selectedList:[],
    };




    handleButtonClick = () => {
   this.setState({showCategModal:true});
    }

    closeCategorieModal = () => {
        this.setState({showCategModal:false});
    }
    handleChangeSales = (event, value) => {
       let  {setAvailbleList,setSelectedList} = this.props
        setSelectedList([]);
        console.log('value*****************'+ value);
      if(value === 'FS')
      {
          console.log('value*******FSSS**********'+ value);
          setAvailbleList(categFS);
      }
      else{
          console.log('value*******otherssss**********'+ value);
          setAvailbleList(catOth);

      }




    };
    render() {
        const {
            colorTable,
            iconTable,
            intl: {formatMessage},
            selectCategorie,removeCategorie,setAvailbleList,
            availbleList, listSelected,
        } = this.props;
        let customComponentMetadata = {
            customComponentMetadata: {
                refTable: tables.LANJALON,
                refParams: {'DESTINATION': 'AUDIT'}
            }
        };
        const { showCategModal} = this.state;
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
                        <OverlayTrigger trigger="hover" placement="top"
                                        overlay={<Tooltip>{formatMessage(messages.btAddCategorTitle)}</Tooltip>}>

                        <Button bsStyle='danger'
                                onClick={this.handleButtonClick}>
                            <i className='fa fa-plus'>

                            </i>
                        </Button>
                        </OverlayTrigger>
                    </div>
                </div>
            ),
            ...this.props
        };
            return (
                <Box title={title} type='primary'>
                    <Row>
                        <div className="col-md-6">
                            <SelectField options={options}
                                         onChange={this.handleChangeSales}
                                         title={messages.sales}/>
                        </div>

                    </Row>
                <Row>
                    <div className="col-md-6">

                        <Box title='Available categories' type='primary' {...newProps}>
                        <CardContainer id='0'
                                       list={availbleList}
                                       removeCategorie={removeCategorie}
                                       selectCategorie={selectCategorie}
                                       setAvailbleList={setAvailbleList}
                                       colorTable={[{code:'blocking', label:'white'}]}
                                       customComponentMetadata={customComponentMetadata}/>


                        </Box>
                    </div>
                    <div className="col-md-6">
                        <Box title='Selected categories' type='primary'>

                        <CardContainer id='1'
                                       list={listSelected}
                                       selectCategorie={selectCategorie}
                                       removeCategorie={removeCategorie}
                                       setAvailbleList={setAvailbleList}
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
        listSelected: state.make.listSelected || [],
        availbleList: state.make.availbleList || [],
    }
}
const mapDispatchToProps = {
    selectCategorie,
    removeCategorie,
    setAvailbleList,
    setSelectedList,
    fetchReferenceTableWithParams,
    fetchReferenceTable
};
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CategorieContainer)));


