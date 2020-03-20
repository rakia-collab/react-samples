import React from 'react';
import {Box, Col,Row, TextEntry, DateEntry, SelectField,Button} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, formValueSelector,getFormValues} from 'redux-form';
import {typeVehicule,categoryVehicule, modelinspection, modeltype, modelspecialite} from '../../Constantes/SelectFields';
import {connect} from 'react-redux'

class ModelDetails extends React.Component {

    render() {

        const {intl: {formatMessage}, modelField,form } = this.props;
        const titlePopup =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.detailModelTitle)}
        </div>)

        const   bttools  =(<div>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
            1
        </button>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
                2
            </button>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
               3
            </button>
        </div>);

        const tabs = [];
        let assetToolBox = [];
        return (

                <Box title={titlePopup} type='primary' tools={bttools} >
                    <Row >
                        <Col xs={4}>

                            <Field name={`${modelField}.modelgeneraldata.modelref`}
                                   component={TextEntry}
                                   title={formatMessage(messages.modelRefTitle)}/>
                        </Col>
                        <Col   xs={4}>
                            <SelectField  name={`${modelField}.modelgeneraldata.vehicletype`}
                                         options={typeVehicule}
                                         title={messages.typeVehicule}/>
                        </Col>

                        <Col xs={4}>
                            <SelectField name={`${modelField}.modelotherdata.vehiclecategory`}

                                         options={categoryVehicule}
                                         title={messages.categoryVehicule}/>
                        </Col>


                    </Row>
                    <Row >
                        <Col  xs={4}>
                            <Field name={`${modelField}.modelgeneraldata.startdate`}
                                   component={DateEntry}
                                   title={formatMessage(messages.dtDebutTitle)}/>
                        </Col>
                        <Col  xs={4} >
                            <Field name={`${modelField}.modelgeneraldata.enddate`}
                                   component={DateEntry}
                                   title={messages.dtFinTitle}/>
                        </Col>


                        <Col xs={4}>
                            <SelectField name={`${modelField}.modelotherdata.regularinspectionmodel`}
                                         options={modelinspection}
                                         title={messages.modelInspectionTitle}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${modelField}.modelotherdata.kindsconstructionmachinery`}
                                         options={modeltype}
                                         title={messages.modelTypeTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelotherdata.specialconstructionmachinery`}
                                         options={modelspecialite}

                                         title={messages.modelSpecialityTitle}/>
                        </Col>

                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelotherdata.segment`}
                                         options={modelspecialite}
                                         title={messages.segmentTitle}/>
                        </Col>
                </Row>

                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${modelField}.modelotherdata.bssassettype`}
                                         options={modeltype}
                                         title={messages.assetTypeBssTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelotherdata.bssassetdetailtype`}
                                         options={modelspecialite}

                                         title={messages.assetDetailBssTitle}/>
                        </Col>

                        <Col xs={4}>

                            <SelectField name={`${modelField}.modelotherdata.bssrate`}
                                         options={modelspecialite}
                                         title={messages.assetRateBssTitle}/>
                        </Col>
                    </Row>
                    <Row >

                      <center>

                     <Button className="btn-danger " >  {formatMessage(messages.btValidateTitle)}</Button>
                      </center>
                    </Row>
                </Box>
        );
    }

}
const mapStateToProps = (state, props) => {

    const {form} = props;
    const selector = formValueSelector(form);
    const formValues = getFormValues(form);
    const make = selector(state, 'make');
    var listModels = make.listmodels;
    var indexModel = state.model.indexModelSelected
    const modelField = `make.listmodels[${indexModel}]`;
    const values = formValues(state) || EMPTY_OBJECT;

    return {
        values,
        listModels,
        isPopupModelDetailLoade: state.model.isPopupModelDetailLoade,
        indexModel:indexModel,
        modelField


    };
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps) (ModelDetails);



