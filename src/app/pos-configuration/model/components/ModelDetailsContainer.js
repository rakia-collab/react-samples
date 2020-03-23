import React from 'react';
import messages from '../../Constantes/messages';
import {Button, Div} from 'cassiopae-core';
import {button, OverlayTrigger, Tooltip} from "react-bootstrap";
import NavTabDetailModel from "./NavTabDetailModel";

const modelIni ={"modelGeneralData":{"modelRef":null,"startDate":null,"endDate":null,"vehicleType":null},"modelOtherData":{"regularinspectionmodel":null,"rbpvehicletype":null,"transactionfeesperspective":null,"specialconstructionmachinery":null,"kindsconstructionmachinery":null,"segment":null,"industrialmaterial":null,"vehiclecategory":null,"dateupdate":null,"userupdate":null,"year":null,"bssregistered":null,"bssgeneralpurpose":null,"bssrate":null,"bssassetsegment":null,"bssassetdetailtype":null,"bssassettype":null,"tiresize":null},"modelDesignationByLanguage":[{"lancode":null,"designation":null}],"modelLevels":[{"code":null,"levelDesignations":null}],"filteringByProduct":[{"product":null,"flagReturn":null,"user":null,"updateDate":null,"startDate":null,"endDate":null}],"filteringByAssetClass":[{"assetClass":null,"country":null,"flagdefault":null}],"filteringByCategory":[{"category":null,"flagdefault":null}]};
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
        const {showPopupModelDetail, changeNbrNavTabAddedOfModel} = this.props;
        changeNbrNavTabAddedOfModel(0)
        showPopupModelDetail(false);
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
