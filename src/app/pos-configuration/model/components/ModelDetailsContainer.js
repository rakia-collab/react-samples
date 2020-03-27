import React from 'react';
import messages from '../../Constantes/messages';
import {Button, Div, notify} from 'cassiopae-core';
import {button, OverlayTrigger, Tooltip} from "react-bootstrap";
import NavTabDetailModel from "./NavTabDetailModel";


const modelIni ={"modelGeneralData":{"modelRef":null,"startDate":null,"endDate":null,"vehicleType":null},"modelotherdata":{"regularinspectionmodel":null,"rbpvehicletype":null,"transactionfeesperspective":null,"specialconstructionmachinery":null,"kindsconstructionmachinery":null,"segment":null,"industrialmaterial":null,"vehiclecategory":null,"dateupdate":null,"userupdate":null,"year":null,"bssregistered":null,"bssgeneralpurpose":null,"bssrate":null,"bssassetsegment":null,"bssassetdetailtype":null,"bssassettype":null,"tiresize":null},"modelLevels":[{"code":null,"levelDesignations":null}]};
class ModelDetailsContainer extends React.Component {


    handledAddNewModel = () =>
    {
        const { form, arrayPush, showPopupModelDetail, selectedModel, make, changeNbrNavTabAddedOfModel, nbrNavTab, changeReadOnlyModel} = this.props;
        changeReadOnlyModel(false)
        let index= make.models.length;
        let nomberTabAdded=nbrNavTab+1
            arrayPush(form, 'make.models', modelIni);
            selectedModel(index);
        changeNbrNavTabAddedOfModel(nomberTabAdded);
        showPopupModelDetail(true);
    }

    handledValidate =()=>
    {
        const {make} = this.props;
       if(validateModel(make))
       {

           const {showPopupModelDetail, changeNbrNavTabAddedOfModel, changeNbrNavTabAddedOfTrim, selectedTrim, selectedModel} = this.props;
           changeNbrNavTabAddedOfModel(0);
           changeNbrNavTabAddedOfTrim(0);
           selectedTrim(0);
           selectedModel(0);
           notify.show("validation of model is succes", notify.SUCCESS);
           showPopupModelDetail(false);
       }
      else{
           notify.show("Model ref required", notify.ERROR);
       }

    }

    render() {
        const { intl, form, nbrNavTab } = this.props;


        const btAddModel=nbrNavTab?(<div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{intl.formatMessage(messages.btAddModelTitle)}</Tooltip>}>


            <button type="button" className="btn-primary btn-box-tool"  onClick={this.handledAddNewModel}>
                <i className="fa fa-plus"></i>
            </button>
            </OverlayTrigger>
        </div>):[];
        return (
            <div className='thumbnail'>
                    {btAddModel}

               <NavTabDetailModel {...this.props}  form={form} intl={intl}     />
                <OverlayTrigger trigger="hover" placement="top"
                                overlay={<Tooltip>{intl.formatMessage(messages.btsaveModelTitle)}</Tooltip>}>


                <center>
                        <Button className="btn-danger " onClick={this.handledValidate} >  {this.props.intl.formatMessage(messages.btValidateTitle)}</Button>
                    </center>
                </OverlayTrigger>

                </div>

        );
    }
}

export default ModelDetailsContainer;
export const validateModel = (make) => {
let error= true;
    let {models} = make;
    (models || []).forEach((item, index) => {
        let {modelGeneralData} = item;
      if (!modelGeneralData.modelRef) {
            error = false

        }
        if(!error)
        {
            return false;
        }

    });
    return error;
};