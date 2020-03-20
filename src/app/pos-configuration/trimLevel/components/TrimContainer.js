import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {Row, Col, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import {Box} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import TrimTableLevel from "./TrimTableLevel";
import {connect} from 'react-redux';
import  {showTrimDetail} from "../reducers/actions";





class TrimContainer extends React.Component {


    openDetailTrim = (event,value) => {

        this.props.showTrimDetail(true)
    };
    render() {

        const {intl: {formatMessage},isTrimDetailLoade,showTrimDetail} = this.props;


        const trimTitle=   (<div className="box-tools-filter pull-left">
            <span  className="glyphicon glyphicon-th" />
            {formatMessage(messages.trimTitle)} </div> );
        const btToolsTrim=  (<div>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
                1
            </button>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
                2
            </button>
            <button type="button" className="btn-primary btn-danger btn-box-tool"  >
                3
            </button>
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