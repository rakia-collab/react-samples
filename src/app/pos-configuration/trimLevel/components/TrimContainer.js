import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {Row, Col, OverlayTrigger, Tooltip, button } from "react-bootstrap";
import {Box, DateEntry, SelectField, TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import TrimTableLevel from "./TrimTableLevel";
import {connect} from 'react-redux';
import  {showTrimDetail} from "../reducers/actions";





class TrimContainer extends React.Component {



    render() {

        const {intl: {formatMessage},isTrimDetailLoade,showTrimDetail} = this.props;


        const trimTitle=   (<div className="box-tools-filter pull-left">
            <span  className="glyphicon glyphicon-th" />
            {formatMessage(messages.trimTitle)} </div> );
        const btToolsTrim=   (       <div className="box-tools-filter pull-right">

            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddTrimTitle)}</Tooltip>}>

                <button type="button" className="btn-primary btn-box-tool"    onClick={this.openDetailTrim}  >
                    <i className="fa fa-plus"></i>
                </button>
            </OverlayTrigger>
        </div>);

        return (<Box title={trimTitle} type='primary' tools={btToolsTrim}>

               <TrimTableLevel showTrimDetail={showTrimDetail}  isTrimDetailLoade={isTrimDetailLoade}   />




            </Box>
        );
    }
}

const mapStateToProps = (state, props) => {

    return {
        isTrimDetailLoade: state.trim.isTrimDetailLoade
    };
};

const mapDispatchToProps = {
    showTrimDetail
};
export default connect(mapStateToProps, mapDispatchToProps) (TrimContainer);