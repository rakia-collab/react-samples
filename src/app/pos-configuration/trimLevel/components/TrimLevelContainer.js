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


        const {intl: {formatMessage}, nbrNavTab} = this.props;
        const btAddTrimTools=   (       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddTrimTitle)}</Tooltip>}>

                <Button type="button" className="btn-primary btn-box-tool"  onClick={this.openModel}>
                    <i className="fa fa-plus"></i>
                </Button>
            </OverlayTrigger>

        </div>);


        let nbrnewTrims=[];
        if(nbrNavTab>0) {
            for (let i = 1; i <= nbrNavTab; i++) {
                nbrnewTrims.push(
                    <button type="button" className="btn-primary btn-danger btn-box-tool">
                        {i}
                    </button>
                );
            }
        }
        const   btToolsTrim  =(<div>
            {nbrnewTrims}
        </div>);


        const detailtrimTitle=   (<div className="box-tools-filter pull-left">
            <span  className="glyphicon glyphicon-th" />
            {formatMessage(messages.detailTrimTitle)} </div> );
        return (
            <Box  title={detailtrimTitle}  type='primary' tools={btAddTrimTools}>
            <Box  withBoder={false} tools={btToolsTrim}>
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

