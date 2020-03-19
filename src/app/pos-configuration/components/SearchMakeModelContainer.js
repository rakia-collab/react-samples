'use strict'
import React from 'react'
import {Field, formValueSelector, getFormValues, reduxForm} from 'redux-form';
import {
    newAccessKeysSelector,
    Box,
    TextEntryField,
    Row,
    Col,
    Button, SelectField, EMPTY_OBJECT
} from 'cassiopae-core';
import {connect} from 'react-redux';
import messages from '../Constantes/messages';
import {injectIntl} from 'react-intl';
import {saleNetworkList,assetCategoryList} from "../Constantes/SelectFields";
import {fetchFilterMakes} from '../reducers/actions'

const FORM = 'formSearchMake';

class SearchMakeModelContainer extends React.Component {

    componentWillMount() {
    }
    handledFilterMakes = () =>{
        const  {assetCategory, saleNetwork, brand, dealer,fetchFilterMakes} = this.props;
        const params = {assetCategory, saleNetwork, brand, dealer};
        fetchFilterMakes(params);
    }

    render() {
        const {intl: {formatMessage}} = this.props;
        const suffixSearch=   <span className='glyphicon glyphicon-search' />
        const toolBox = (
            <div className="box-tools-filter pull-right">
                <button type="button" className="btn btn-box-tool" onClick={this.props.handleClose} >
                    <i className="fa fa-remove"></i>
                </button>

            </div>

        );
        const titleSearch=   (<div className="box-tools-filter pull-left" >
            <span  className="fa fa-search" />
            {formatMessage(messages.recherche)} </div> );

        return (
                <Row>
                <Box type='primary' withBoder='true'   title={titleSearch} collapsible={true} tools={toolBox}  >
                    <Row  >

                        <Col md={6}>
                            <SelectField  name={`assetCategory`}
                                options={assetCategoryList}
                               title={formatMessage(messages.assetCategoryTitle)}
                                          placeholder={`select Asset`}
                                />
                         </Col>

                        <Col md={6}>
                            <SelectField name={`saleNetwork`}
                                         options={saleNetworkList}
                                         title={messages.saleTitle}
                                         placeholder={`select Sale network`}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextEntryField
                                name="dealer"
                                title={formatMessage(messages.concessionaireTitle)}
                             />
                        </Col>
                        <Col md={6} >

                            <TextEntryField name="brand"
                                   title={formatMessage(messages.brand)}
                                 />
                        </Col>

                    </Row>
                    <Row>
                        <Col   >

                            <Button   className='primary fa fa-search pull-right' onClick={this.handledFilterMakes} >
                                {formatMessage(messages.btSearchTitle)}
                            </Button>
                        </Col>
                    </Row>
                </Box>
                </Row>
        )
    }
}
SearchMakeModelContainer = reduxForm({
    form: FORM
})(SearchMakeModelContainer);

const selector = formValueSelector(FORM);
const formValues = getFormValues(FORM);

function mapStateToProps(state, props) {
    const values = formValues(state) || EMPTY_OBJECT;

       return {
           assetCategory:values &&values.assetCategory ,
           saleNetwork:values && values.saleNetwork,
           brand: values && values.brand,
           dealer: values &&values.dealer

    };
};

const mapDispatchToProps = {
    fetchFilterMakes
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SearchMakeModelContainer));
