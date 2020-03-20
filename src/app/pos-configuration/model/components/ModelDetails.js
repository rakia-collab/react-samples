import React from 'react';
import {Box, Col,Row, TextEntry, DateEntryField, SelectField,Button} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, formValueSelector,getFormValues} from 'redux-form';
import {typeVehicule,categoryVehicule, modelinspection, modeltype, modelspecialite} from '../../Constantes/SelectFields';
import {connect} from 'react-redux'

class ModelDetails extends React.Component {


    handleEndDateChange = (event, endDate) => {
        debug('handleEndDateChange', 'endDate=', endDate);
        const {form, expModel, change} = this.props;

        change(form, `${expModel}.modelGeneralData.modelRef`, endDate);
    };

    render() {

        const {intl: {formatMessage}, expModel, nbrNavTab} = this.props;
        const titlePopup =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.detailModelTitle)}
        </div>)

        let nbrnewModels=[];
        if(nbrNavTab>0) {
            for (let i = 1; i <= (nbrNavTab+1); i++) {
                nbrnewModels.push(
                    <button type="button" className="btn-primary btn-danger btn-box-tool">
                        {i}
                    </button>
                )

            }
        }
        const   bttools  =(<div>
                            {nbrnewModels}
                        </div>);



        return (

                <Box title={titlePopup} type='primary' tools={bttools} >
                    <Row >
                        <Col xs={4}>

                            <Field name={`${expModel}.modelGeneralData.modelRef`}
                                   component={TextEntry}
                                   title={formatMessage(messages.modelRefTitle)}/>
                        </Col>
                        <Col   xs={4}>
                            <SelectField  name={`${expModel}.modelGeneralData.vehicleType`}
                                         options={typeVehicule}
                                         title={messages.typeVehicule}/>
                        </Col>

                        <Col xs={4}>
                            <SelectField name={`${expModel}.modelOtherData.vehiclecategory`}

                                         options={categoryVehicule}
                                         title={messages.categoryVehicule}/>
                        </Col>


                    </Row>
                    <Row >
                        <Col  xs={4}>
                            <DateEntryField name={`${expModel}.modelGeneralData.startDate`}
                                   title={formatMessage(messages.dtDebutTitle)}/>
                        </Col>
                        <Col  xs={4} >
                            <DateEntryField name={`${expModel}.modelGeneralData.endDate`}
                                   title={messages.dtFinTitle}/>
                        </Col>


                        <Col xs={4}>
                            <SelectField name={`${expModel}.modelOtherData.regularinspectionmodel`}
                                         options={modelinspection}
                                         title={messages.modelInspectionTitle}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${expModel}.modelOtherData.kindsconstructionmachinery`}
                                         options={modeltype}
                                         title={messages.modelTypeTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${expModel}.modelOtherData.specialconstructionmachinery`}
                                         options={modelspecialite}

                                         title={messages.modelSpecialityTitle}/>
                        </Col>

                        <Col xs={4} >

                            <SelectField name={`${expModel}.modelOtherData.segment`}
                                         options={modelspecialite}
                                         title={messages.segmentTitle}/>
                        </Col>
                </Row>

                    <Row>
                        <Col  xs={4} >
                            <SelectField name={`${expModel}.modelOtherData.bssassettype`}
                                         options={modeltype}
                                         title={messages.assetTypeBssTitle}/>
                        </Col>
                        <Col xs={4} >

                            <SelectField name={`${expModel}.modelOtherData.bssassetdetailtype`}
                                         options={modelspecialite}

                                         title={messages.assetDetailBssTitle}/>
                        </Col>

                        <Col xs={4}>

                            <SelectField name={`${expModel}.modelOtherData.bssrate`}
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



