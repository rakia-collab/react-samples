import React from 'react';
import {Box, Button} from 'cassiopae-core';
import NavTrimDetails from "./NavTrimDetails";
import messages from "../../Constantes/messages";
import { OverlayTrigger, Tooltip} from "react-bootstrap";

export var trimIni={"code":null,"levelDesignations":null}
class TrimLevelContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    addTrim=() =>{
        const {arrayPush, form, indexModel, selectedTrim, make, changeNbrNavTabAddedOfTrim, nbrNavTabTrim} = this.props;

            let indexTrim = make.models[indexModel].modelLevels.length;
            let nbrTrimAdded=nbrNavTabTrim +1;
            arrayPush(form, 'make.models[' + indexModel + '].modelLevels', trimIni);
            changeNbrNavTabAddedOfTrim(nbrTrimAdded);
            selectedTrim(indexTrim);
    }

    render() {


        const {intl: {formatMessage}, id="config.box.trim.sactions", idBtTrim="config.box.trim.button.add", readOnly} = this.props;

        const btAddTrimTools=   !readOnly?(       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddTrimTitle)}</Tooltip>}>

                <Button  type="button" className="btn-primary btn-box-tool"  onClick={this.addTrim}>
                    <i className="fa fa-plus"></i>
                </Button>
            </OverlayTrigger>

        </div>):[];


        return (
            <Box  title={formatMessage(messages.trimTitle)} id={id} collapsible={true}  >
            <Box id={idBtTrim} withBoder={false} tools={btAddTrimTools}>
                <NavTrimDetails  {...this.props} />
        </Box>
            </Box>)

    }
}

export default  (TrimLevelContainer);

