import React from 'react';
import {Box, Button} from 'cassiopae-core';
import NavTrimDetails from "./NavTrimDetails";
import messages from "../../Constantes/messages";
import {connect} from "react-redux";
import { OverlayTrigger, Tooltip} from "react-bootstrap";

class TrimLevelContainer extends React.Component {

    constructor(props) {
        super(props);



    }


    render() {


        const {intl: {formatMessage}, id="config.box.trim.sactions", idBtTrim="config.box.trim.button.add"} = this.props;
        const btAddTrimTools=   (       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddTrimTitle)}</Tooltip>}>

                <Button type="button" className="btn-primary btn-box-tool"  onClick={this.openModel}>
                    <i className="fa fa-plus"></i>
                </Button>
            </OverlayTrigger>

        </div>);





        return (
            <Box  title={formatMessage(messages.trimTitle)} id={id} collapsible={true}  >
            <Box id={idBtTrim} withBoder={false} tools={btAddTrimTools}>
                <NavTrimDetails  {...this.props} />
        </Box>
            </Box>)

    }
}

const mapStateToProps = (state, props) => {

    return {



    };
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps) (TrimLevelContainer);

