import React from 'react';
import {Box, Col,Row, TextEntry, DateEntryField, SelectField,Button} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, Field, formValueSelector,getFormValues} from 'redux-form';
import {typeVehicule,categoryVehicule, modelinspection, modeltype, modelspecialite} from '../../Constantes/SelectFields';
import {connect} from 'react-redux'
import TrimLevelContainer from "../../trimLevel/components/TrimLevelContainer";

class ModelDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeTabKey: "make.models[0].modelLevels[0]"}
    }

    handleTabTrimChange= (key) => {
        this.setState({
            activeTabKey: key,
            expTrim: key
        });
    };

    handleEndDateChange = (event, endDate) => {
        debug('handleEndDateChange', 'endDate=', endDate);
        const {form, expModel, change} = this.props;

        change(form, `${expModel}.modelGeneralData.dateFin`, endDate);
    };

    render() {

        const {intl: {formatMessage}, id, expModel, nbrNavTab, form, intl, readOnly} = this.props;


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
        const   bttools  = nbrnewModels.length>1?(<div>
                            {nbrnewModels}
                        </div>):[];



        return (

                <Box type='primary' id={id+ "box.global"} tools={bttools} >
                    <Box collapsible={true} id={id+ "box.global.generalData"} title={formatMessage(messages.generalInfoModelTitle)}  >
                    <Row >
                        <Col xs={6}>

                            <DateEntryField name={`${expModel}.modelGeneralData.endDate`}
                                            readOnly={readOnly}
                                            title={messages.dtFinTitle}/>

                        </Col>
                        <Col   xs={6}>
                            <SelectField  name={`${expModel}.modelGeneralData.vehicleType`}
                                          readOnly={readOnly}
                                         options={typeVehicule}
                                         title={messages.typeVehicule}/>
                        </Col>
                    </Row>
                        <Row >

                       <Col  xs={6}>
                       <DateEntryField name={`${expModel}.modelGeneralData.startDate`}
                                       readOnly={readOnly}
                                                title={formatMessage(messages.dtDebutTitle)}/>
                       </Col>
                       <Col  xs={6} >
                           <Field name={`${expModel}.modelGeneralData.modelRef`}
                                  component={TextEntry}
                                  readOnly={readOnly}
                                  title={formatMessage(messages.modelRefTitle)}/>
                       </Col>

                    </Row>
                    </Box>
                    <Box id={id+ "box.global.otherData"} title={formatMessage(messages.otherInfoModelTitle)} collapsible={true}   >
                    <Row >

                        <Col xs={6}>
                            <SelectField name={`${expModel}.modelOtherData.vehiclecategory`}
                                         readOnly={readOnly}
                                         options={categoryVehicule}
                                         title={messages.categoryVehicule}/>
                        </Col>

                        <Col  xs={6} >
                            <SelectField name={`${expModel}.modelOtherData.kindsconstructionmachinery`}
                                         readOnly={readOnly}
                                         options={modeltype}
                                         title={messages.modelTypeTitle}/>
                        </Col>

                    </Row>
                    <Row>

                    <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.specialconstructionmachinery`}
                                         options={modelspecialite}
                                         readOnly={readOnly}
                                         title={messages.modelSpecialityTitle}/>
                    </Col>
                    <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.segment`}
                                         options={modelspecialite}
                                         readOnly={readOnly}
                                         title={messages.segmentTitle}/>
                        </Col>
                </Row>
                <Row>
                 <Col  xs={6} >
                            <SelectField name={`${expModel}.modelOtherData.bssassettype`}
                                         options={modeltype}
                                         readOnly={readOnly}
                                         title={messages.assetTypeBssTitle}/>
                 </Col>
                 <Col xs={6} >

                            <SelectField name={`${expModel}.modelOtherData.bssassetdetailtype`}
                                         options={modelspecialite}
                                         readOnly={readOnly}
                                         title={messages.assetDetailBssTitle}/>
                 </Col>
                </Row>
                 <Row>
                        <Col xs={4}>

                            <SelectField name={`${expModel}.modelOtherData.bssrate`}
                                         options={modelspecialite}
                                         readOnly={readOnly}
                                         title={messages.assetRateBssTitle}/>
                        </Col>
                </Row>
                    </Box>

                    <TrimLevelContainer {...this.props} />

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



