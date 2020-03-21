import React from 'react';
import messages from '../../Constantes/messages';
import {Button} from 'cassiopae-core';
import {button} from "react-bootstrap";
import NavTabTrimLevel from "./NavTabTrimLevel";
import NavTabDetailModel from "./NavTabDetailModel";

const modelIni ={"modelGeneralData":{"modelRef":null,"startDate":null,"endDate":null,"vehicleType":null},"modelOtherData":{"regularinspectionmodel":null,"rbpvehicletype":null,"transactionfeesperspective":null,"specialconstructionmachinery":null,"kindsconstructionmachinery":null,"segment":null,"industrialmaterial":null,"vehiclecategory":null,"dateupdate":null,"userupdate":null,"year":null,"bssregistered":null,"bssgeneralpurpose":null,"bssrate":null,"bssassetsegment":null,"bssassetdetailtype":null,"bssassettype":null,"tiresize":null},"modelDesignationByLanguage":[{"lancode":null,"designation":null}],"modelLevels":[{"code":null,"levelDesignations":null}],"filteringByProduct":[{"product":null,"flagReturn":null,"user":null,"updateDate":null,"startDate":null,"endDate":null}],"filteringByAssetClass":[{"assetClass":null,"country":null,"flagdefault":null}],"filteringByCategory":[{"category":null,"flagdefault":null}]};
class ModelDetailsContainer extends React.Component {


    handledAddNewModel = () =>
    {
        const { form, arrayPush, showPopupModelDetail, selectedModel, make, changeNbrNavtabAddedOfModel, nbrNavTab} = this.props;

        let index= make.models.length;
        let nombreTabAdded=nbrNavTab+1
            arrayPush(form, 'make.models', modelIni);
            selectedModel(index);
        changeNbrNavtabAddedOfModel(nombreTabAdded);
        showPopupModelDetail(true);
    }

    handledValidate =()=>
    {
        const {showPopupModelDetail, changeNbrNavtabAddedOfModel} = this.props;
        changeNbrNavtabAddedOfModel(0)
        showPopupModelDetail(false);
    }

    render() {
        const { intl, form } = this.props;


        const btAddModel=(<div className="box-tools-filter pull-right">
            <button type="button" className="btn-primary btn-box-tool"  onClick={this.handledAddNewModel}>
                <i className="fa fa-plus"></i>
            </button>
        </div>)
        return (
            <div className='thumbnail'>
                    {btAddModel}

               <NavTabDetailModel {...this.props}  form={form} intl={intl}     />

                    <center>
                        <Button className="btn-danger " onClick={this.handledValidate} >  {this.props.intl.formatMessage(messages.btValidateTitle)}</Button>
                    </center>

                </div>

        );
    }
}

export default ModelDetailsContainer;
