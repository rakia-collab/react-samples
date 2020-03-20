import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Box, DateEntry, SelectField, TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import TrimDetail from "./TrimDetail";




class NewTrimContainer extends React.Component {


    render() {

        const {intl: {formatMessage}} = this.props;

        const titleDetail=   (<div className="box-tools-filter pull-left">
            <span  className=" fa fa-edit" />
            {formatMessage(messages.detailTitle)} </div> );
        const trimTitle=   (<div className="box-tools-filter pull-left">
            <span  className="glyphicon glyphicon-th" />
            {formatMessage(messages.trimTitle)} </div> );
        const btTools=   (       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddTrimTitle)}</Tooltip>}>

                <button type="button" className="btn-primary btn-box-tool" >
                    <i className="fa fa-plus"></i>
                </button>
            </OverlayTrigger>
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btModifTrimTitle)}</Tooltip>}>

                <button type="button" className="btn-primary btn-box-tool ">
                    <i className="fa fa-edit"></i>
                </button>
            </OverlayTrigger>

        </div>);


        return (<Box title={trimTitle} type='primary' tools={btTools}>

                <TrimDetail  />


            </Box>
        );
    }
}

export default NewTrimContainer;