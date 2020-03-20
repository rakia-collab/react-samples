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

                            <Field name={`${modelField}.modelGeneralData.modelRef`}
                                   component={TextEntry}
                                   title={formatMessage(messages.modelRefTitle)}/>
                        </Col>
                        <Col   xs={4}>
                            <SelectField  name={`${modelField}.modelGeneralData.vehicleType`}
                                         options={typeVehicule}
                                         title={messages.typeVehicule}/>
                        </Col>

                        <Col xs={4}>
                            <SelectField name={`${modelField}.modelOtherData.vehiclecategory`}

                                         options={categoryVehicule}
                                         title={messages.categoryVehicule}/>
                        </Col>


                    </Row>
                    <Row >
                        <Col  xs={4}>
                            <Field name={`${modelField}.modelGeneralData.startDate`}
                                   component={DateEntry}
                                   title={formatMessage(messages.dtDebutTitle)}/>
                        </Col>
                        <Col  xs={4} >
                            <Field name={`${modelField}.modelGeneralData.endDate`}
                                   component={DateEntry}
                                   title={messages.dtFinTitle}/>
                        </Col>


                        <Col xs={4}>
                            <SelectField name={`${modelField}.modelOtherData.regularinspectionmodel`}
                                         options={modelinspection}
                                         title={messages.modelInspectionTitle}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${modelField}.modelOtherData.kindsconstructionmachinery`}
                                         options={modeltype}
                                         title={messages.modelTypeTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelOtherData.specialconstructionmachinery`}
                                         options={modelspecialite}

                                         title={messages.modelSpecialityTitle}/>
                        </Col>

                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelOtherData.segment`}
                                         options={modelspecialite}
                                         title={messages.segmentTitle}/>
                        </Col>
                </Row>

                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${modelField}.modelOtherData.bssassettype`}
                                         options={modeltype}
                                         title={messages.assetTypeBssTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${modelField}.modelOtherData.bssassetdetailtype`}
                                         options={modelspecialite}

                                         title={messages.assetDetailBssTitle}/>
                        </Col>

                        <Col xs={4}>

                            <SelectField name={`${modelField}.modelOtherData.bssrate`}
                                         options={modelspecialite}
                                         title={messages.assetRateBssTitle}/>
                        </Col>
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
    var listModels = make.models;
    var indexModel = state.model.indexModelSelected
    const modelField = `make.models[${indexModel}]`;
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



