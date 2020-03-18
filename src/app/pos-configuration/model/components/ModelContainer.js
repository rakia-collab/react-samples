import React from 'react';
import {Box,TextEntry} from 'cassiopae-core';
import messages from '../../Constantes/messages';
import {change,formValueSelector } from 'redux-form';
import ModelTable from './ModelTable';
import { Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import PopupModelDetails  from './PopupModelDetails';
import {showPopupModelDetail,fetchModel, initModels} from "../reducers/actions";
import {connect} from 'react-redux';

 class ModelContainer extends React.Component {


    constructor(props) {
        super(props);

    }

    closeModel = () => {
        this.props.showPopupModelDetail(false);
    };

    openModel = () => {
        this.props.showPopupModelDetail(true);
    };

     openNewModel = () => {
         this.props.fetchModel(null)
         this.props.showPopupModelDetail(true);
     };
    render() {

        const {intl: {formatMessage}, fetchModel,  showPopupModelDetail,modelField, initModels, listModels, generalModels, isPopupModelDetailLoade,indexModel,form} = this.props;
        const titleModelInfo=   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            {formatMessage(messages.ModelInfoTitle)} </div> );

        const btTools=   (       <div className="box-tools-filter pull-right">
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btAddModelTitle)}</Tooltip>}>

                <button type="button" className="btn-primary btn-box-tool"  onClick={this.openNewModel}>
                    <i className="fa fa-plus"></i>
                </button>
            </OverlayTrigger>

        </div>);

        return (<Box  tools={btTools} >
                <PopupModelDetails form={form}   onClose={this.closeModel} isPopupModelDetailLoade={isPopupModelDetailLoade}  intl={this.props.intl}  />
                   <ModelTable  modelExp={modelField} indexModel={indexModel} isPopupModelDetailLoade={isPopupModelDetailLoade} initModels={initModels} models={listModels}  showPopupModelDetail={ showPopupModelDetail}  fetchModel={fetchModel}  generalModels={generalModels} />

            </Box>
        );
    }

}

const mapStateToProps = (state, props) => {

    const {form} = props;
    const selector = formValueSelector(form);

    const make = selector(state, 'make');
    var listModels = make.listmodels;
    var generalModels=[];
    listModels &&  listModels.map((Model) => {
        generalModels.push(Model.modelgeneraldata)
    });

    var indexModel = state.model.indexModelSelected
    const modelField = `make.listmodels[${indexModel}]`;

    return {
        generalModels,
        listModels,
        isPopupModelDetailLoade: state.model.isPopupModelDetailLoade,
        indexModel:indexModel,
        modelField


    };
};

const mapDispatchToProps = {
    showPopupModelDetail,
    fetchModel,
    initModels
};
export default connect(mapStateToProps, mapDispatchToProps) (ModelContainer);
