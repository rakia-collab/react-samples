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

        const {intl: {formatMessage}, navTabTrims, expModel, nbrNavTab,idBoxGen="config.box.model.generalDetail",idBoxOther="config.box.model.otherDetail"} = this.props;


        let nbrnewModels=[];
        if(nbrNavTab>0) {
            for (let i = 1; i <= nbrNavTab; i++) {
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

                <Box type='primary' tools={bttools} >
                    <Box collapsible={false} title={formatMessage(messages.generalInfoModelTitle)}  id={idBoxGen} >
                    <Row >
                        <Col xs={6}>

                            <Field name={`${expModel}.modelGeneralData.modelRef`}
                                   component={TextEntry}
                                   title={formatMessage(messages.modelRefTitle)}/>
                        </Col>
                        <Col   xs={6}>
                            <SelectField  name={`${expModel}.modelGeneralData.vehicleType`}
                                         options={typeVehicule}
                                         title={messages.typeVehicule}/>
                        </Col>
                    </Row>
                        <Row >

                       <Col  xs={6}>
                       <DateEntryField name={`${expModel}.modelGeneralData.startDate`}
                                                title={formatMessage(messages.dtDebutTitle)}/>
                       </Col>
                       <Col  xs={6} >
                       <DateEntryField name={`${expModel}.modelGeneralData.endDate`}
                                                title={messages.dtFinTitle}/>
                       </Col>

                    </Row>
                    </Box>
                    <Box title={formatMessage(messages.otherInfoModelTitle)} collapsible={true}  id={idBoxOther} >
                    <Row >

                        <Col xs={6}>
                            <SelectField name={`${expModel}.modelOtherData.vehiclecategory`}

                                         options={categoryVehicule}
                                         title={messages.categoryVehicule}/>
                        </Col>

                        <Col  xs={6} >
                            <SelectField name={`${expModel}.modelOtherData.kindsconstructionmachinery`}
                                         options={modeltype}
                                         title={messages.modelTypeTitle}/>
                        </Col>

                    </Row>
                    <Row>

                    <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.specialconstructionmachinery`}
                                         options={modelspecialite}

                                         title={messages.modelSpecialityTitle}/>
                    </Col>
                    <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.segment`}
                                         options={modelspecialite}
                                         title={messages.segmentTitle}/>
                        </Col>
                </Row>
                <Row>
                 <Col  xs={6} >
                            <SelectField name={`${expModel}.modelOtherData.bssassettype`}
                                         options={modeltype}
                                         title={messages.assetTypeBssTitle}/>
                 </Col>
                 <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.bssassetdetailtype`}
                                         options={modelspecialite}

                                         title={messages.assetDetailBssTitle}/>
                 </Col>
                </Row>
                 <Row>
                        <Col xs={4}>

                            <SelectField name={`${expModel}.modelOtherData.bssrate`}
                                         options={modelspecialite}
                                         title={messages.assetRateBssTitle}/>
                        </Col>
                </Row>
                    </Box>

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



