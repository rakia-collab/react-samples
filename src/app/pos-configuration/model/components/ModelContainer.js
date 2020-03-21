import React from 'react';
import {Box} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change, arrayPush, arrayRemove,formValueSelector} from 'redux-form';
import ModelTable from './ModelTable';
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import PopupModelDetails  from './PopupModelDetails';
import {showPopupModelDetail, fetchFullModel, initModels, selectedModel, changeNbrNavtabAddedOfModel, changePathFileddOfModel } from "../reducers/actions";
import {connect} from 'react-redux';
const modelIni ={"modelGeneralData":{"modelRef":null,"startDate":null,"endDate":null,"vehicleType":null},"modelOtherData":{"regularinspectionmodel":null,"rbpvehicletype":null,"transactionfeesperspective":null,"specialconstructionmachinery":null,"kindsconstructionmachinery":null,"segment":null,"industrialmaterial":null,"vehiclecategory":null,"dateupdate":null,"userupdate":null,"year":null,"bssregistered":null,"bssgeneralpurpose":null,"bssrate":null,"bssassetsegment":null,"bssassetdetailtype":null,"bssassettype":null,"tiresize":null},"modelDesignationByLanguage":[{"lancode":null,"designation":null}],"modelLevels":[{"code":null,"levelDesignations":null}],"filteringByProduct":[{"product":null,"flagReturn":null,"user":null,"updateDate":null,"startDate":null,"endDate":null}],"filteringByAssetClass":[{"assetClass":null,"country":null,"flagdefault":null}],"filteringByCategory":[{"category":null,"flagdefault":null}]};
 class ModelContainer extends React.Component {


    constructor(props) {
        super(props);

    }

    closeModel = () => {
        const { form, make, arrayRemove, nbrNavTab, changeNbrNavtabAddedOfModel, showPopupModelDetail} = this.props;

        if(nbrNavTab>0) {
            let indexOFLastModel =  make.models.length -1 ;
            let totalOfNavTabAdded=nbrNavTab;
            make.models.map((Model) => {
                if( totalOfNavTabAdded > 0 ) {
                    arrayRemove(form, 'make.models', indexOFLastModel);
                    indexOFLastModel = indexOFLastModel - 1;
                    totalOfNavTabAdded = totalOfNavTabAdded - 1;
                }

            });
            let nombreTabAdded=0;
            changeNbrNavtabAddedOfModel(nombreTabAdded);
        }
        showPopupModelDetail(false);
    };

    openModel = () => {
        const {arrayPush, changeNbrNavtabAddedOfModel, showPopupModelDetail, selectedModel, make, form} = this.props;

        let index= make.models.length;
        arrayPush(form, 'make.models', modelIni);
        selectedModel(index);
        changeNbrNavtabAddedOfModel(1);
        showPopupModelDetail(true);
    };

    changeEndDate = () =>{
        const{change,form,modelField}= this.props
        change(form,`${modelField}.modelGeneralData.modelref`,new Date());
    }

    render() {

        const {intl: {formatMessage}, fetchFullModel, showPopupModelDetail, modelField, initModels, listModels, generalModels, isPopupModelDetailLoade ,indexModel, make} = this.props;
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

        return (<Box  tools={btTools} >
                <PopupModelDetails openNewModel={this.openNewModel}  {...this.props}  onClose={this.closeModel} isPopupModelDetailLoade={isPopupModelDetailLoade}  />
                   <ModelTable  {...this.props} brandRef={make.makeGeneralData.brandRef} changeEndDate={this.changeEndDate}  modelExp={modelField} indexModel={indexModel} isPopupModelDetailLoade={isPopupModelDetailLoade} initModels={initModels} models={listModels}  showPopupModelDetail={ showPopupModelDetail}  fetchModel={fetchFullModel}  generalModels={generalModels} />

            </Box>
        );
    }

}

const mapStateToProps = (state, props) => {

    const {form} = props;
    const selector = formValueSelector(form);
    const make = selector(state, 'make');
    var listModels = [];
    var generalModels =[];
   if( make.models.length ===1) {
       listModels = make.models[0];
       listModels.modelGeneralData && generalModels.push({"modelRef":listModels.modelGeneralData.modelRef, "startDate": listModels.modelGeneralData.startDate,"endDate":listModels.modelGeneralData.endDate,"vehicleType":listModels.modelGeneralData.vehicleType, "iconeDetail":null, "iconeDelete":null});
   }
   else
   {  make.models &&  make.models.map((Model) => {
       Model.modelGeneralData && generalModels.push({"modelRef":Model.modelGeneralData.modelRef, "startDate": Model.modelGeneralData.startDate,"endDate":Model.modelGeneralData.endDate,"vehicleType":Model.modelGeneralData.vehicleType, "iconeDetail":null, "iconeDelete":null});
   });
   }



    const indexModel = state.model.indexModelSelected
    const nbrNavTab=state.model.nbrModelNavTab
    const modelField = state.model.modelField;

    return {
        make,
        generalModels,
        listModels,
        isPopupModelDetailLoade: state.model.isPopupModelDetailLoade,
        indexModel,
        modelField,
        nbrNavTab


    };
};

const mapDispatchToProps = {
    showPopupModelDetail,
    fetchFullModel,
    initModels,
    selectedModel,
    changeNbrNavtabAddedOfModel,
    changePathFileddOfModel,
    change,
    arrayPush,
    arrayRemove
};
export default connect(mapStateToProps, mapDispatchToProps) (ModelContainer);
