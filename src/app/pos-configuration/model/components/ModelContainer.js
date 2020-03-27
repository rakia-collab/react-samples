import React from 'react';
import {Box, EMPTY_OBJECT, GlobalMessages} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, arrayPush, arrayRemove, formValueSelector, getFormValues} from 'redux-form';
import ModelTable from './ModelTable';
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import PopupModelDetails  from './PopupModelDetails';
import {showPopupModelDetail, fetchFullModel, selectedModel,changeReadOnlyModel, changeNbrNavTabAddedOfModel, changePathFiledOfModel } from "../reducers/actions";
import {connect} from 'react-redux';
import setIn from 'redux-form/lib/structure/plain/setIn';
import{selectedTrim,changeNbrNavTabAddedOfTrim} from '../../trimLevel/reducers/actions'
const modelIni ={"modelGeneralData":{"modelRef":null,"startDate":null,"endDate":null,"vehicleType":null},"modelotherdata":{"regularinspectionmodel":null,"rbpvehicletype":null,"transactionfeesperspective":null,"specialconstructionmachinery":null,"kindsconstructionmachinery":null,"segment":null,"industrialmaterial":null,"vehiclecategory":null,"dateupdate":null,"userupdate":null,"year":null,"bssregistered":null,"bssgeneralpurpose":null,"bssrate":null,"bssassetsegment":null,"bssassetdetailtype":null,"bssassettype":null,"tiresize":null},"modelLevels":[{"code":null,"levelDesignations":null}]};
export const validateModel = (values, props, errors) => {

    let {models} = values.make;
    (models || []).forEach((item, index) => {
        let {modelGeneralData} = item;

        if (!modelGeneralData) {

            errors = setIn( errors,`make.models[${index}].modelGeneralData.modelRef`,GlobalMessages.fieldRequire);

        } else if (!modelGeneralData.modelRef) {

            errors = setIn( errors,`make.models[${index}].modelGeneralData.modelRef`,GlobalMessages.fieldRequire);

        }

    });
    return errors;
};

 class ModelContainer extends React.Component {


    constructor(props) {
        super(props);

    }

    closeModel = () => {
        const { form, make, arrayRemove, nbrNavTab, changeNbrNavTabAddedOfModel, showPopupModelDetail ,selectedModel, changeNbrNavTabAddedOfTrim, selectedTrim} = this.props;

        if(nbrNavTab > 0) {
            let indexOFLastModel =  make.models.length -1 ;
            let totalOfNavTabAdded=nbrNavTab;
            make.models.map((Model) => {
                if( totalOfNavTabAdded > 0 ) {
                    arrayRemove(form, 'make.models', indexOFLastModel);
                    indexOFLastModel = indexOFLastModel - 1;
                    totalOfNavTabAdded = totalOfNavTabAdded - 1;
                }

            });
            selectedModel(indexOFLastModel);
            let nombreTabAdded=0;
            changeNbrNavTabAddedOfModel(nombreTabAdded);
            changeNbrNavTabAddedOfTrim(nombreTabAdded);
            selectedTrim(0);
        }
        showPopupModelDetail(false);
    };

    openModel = () => {
        const {arrayPush, changeNbrNavTabAddedOfModel, showPopupModelDetail, selectedModel, changeReadOnlyModel, make, form} = this.props;
        changeReadOnlyModel(false)
        let index= make.models.length;
        arrayPush(form, 'make.models', modelIni);
        selectedModel(index);
        changeNbrNavTabAddedOfModel(1);
        showPopupModelDetail(true);
    };



    render() {

        const {intl: {formatMessage} , location: {pathname}, fetchFullModel, showPopupModelDetail, modelField,  listModels, generalModels, isPopupModelDetailLoade , indexModel, make} = this.props;
        const titleModelInfo=   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            {formatMessage(messages.ModelInfoTitle)} </div> );

        const btTools=   (       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddModelTitle)}</Tooltip>}>

                <button type="button" className="btn-primary btn-box-tool"  onClick={this.openModel}>
                    <i className="fa fa-plus"></i>
                </button>
            </OverlayTrigger>

        </div>);

        return (<Box id="box.popup.detail.model"  tools={btTools} >
                <PopupModelDetails openNewModel={this.openNewModel}  {...this.props}  onClose={this.closeModel} isPopupModelDetailLoade={isPopupModelDetailLoade}  />
                   <ModelTable formatMessage={formatMessage} listModels={listModels} {...this.props} brandRef={make.makeGeneralData.brandRef}    fetchModel={fetchFullModel}  generalModels={generalModels} />

            </Box>
        );
    }

}

const mapStateToProps = (state, props) => {

    const {form} = props;
    const formValues = getFormValues(form);
    const selector = formValueSelector(form);
    const values = formValues(state) || EMPTY_OBJECT;
    const make = values.make;
    var listModels = [];
    var generalModels =[];
   if( make.models && make.models.length ===1) {
       listModels= make.models
       listModels[0].modelGeneralData && generalModels.push({"modelRef": listModels[0].modelGeneralData.modelRef, "startDate": make.models[0].modelGeneralData.startDate,"endDate": listModels[0].modelGeneralData.endDate,"vehicleType": listModels[0].modelGeneralData.vehicleType, "iconeDetail":null, "iconeDelete":null, "iconeEdit":null});
   }
   else
   {  make.models &&  make.models.map((Model) => {
       Model.modelGeneralData && generalModels.push({"modelRef":Model.modelGeneralData.modelRef, "startDate": Model.modelGeneralData.startDate,"endDate":Model.modelGeneralData.endDate,"vehicleType":Model.modelGeneralData.vehicleType, "iconeDetail":null, "iconeDelete":null, "iconeEdit":null});
   });
       listModels= make.models
   }
    const indexModel = state.model.indexModelSelected;
    const nbrNavTab=state.model.nbrModelNavTab;
    const modelField = state.model.modelField;

    const indexTrim = state.trim.indexTrimSelected;
    const nbrNavTabTrim=state.trim.nbrNavTabTrim;

    return {
        make,
        generalModels,
        listModels,
        isPopupModelDetailLoade: state.model.isPopupModelDetailLoade,
        indexModel,
        modelField,
        nbrNavTab,
        readOnly: state.model.readOnly,
        indexTrim,
        nbrNavTabTrim


    };
};

const mapDispatchToProps = {
    showPopupModelDetail,
    fetchFullModel,
    selectedModel,
    changeNbrNavTabAddedOfModel,
    changeNbrNavTabAddedOfTrim,
    changePathFiledOfModel,
    changeReadOnlyModel,
    selectedTrim,
    change,
    arrayPush,
    arrayRemove
};
export default connect(mapStateToProps, mapDispatchToProps) (ModelContainer);
