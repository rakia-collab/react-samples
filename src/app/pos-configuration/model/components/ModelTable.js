import React from 'react';
import { FormattedMessage, injectIntl} from 'react-intl';
import Griddle from 'griddle-react';
import {
    GlobalMessages,
    withAccessKeysAndCol,
    DateDisplay
} from 'cassiopae-core';
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import messages from "../../Constantes/messages";
import {changeReadOnlyModel, selectedModel, showPopupModelDetail} from "../reducers/actions";





class ModelDelete extends React.Component {


    constructor(props) {
        super(props);

    }

    changeEndDate = () =>{
        const { rowData,metadata: {customComponentMetadata: {change, form, listModels}}} = this.props;
        let indexModel = -1
        let i=0;
        rowData.endDate= new Date();
        if(listModels.length === 1)
        {
            indexModel=0;
        }else {
            listModels.map((Model) => {
                if (Model.modelGeneralData.modelRef === rowData.modelRef) {
                    indexModel = i;
                }
                i = i + 1;
            });
        }
        let modelField = "make.models["+indexModel+"]"
        change(form,`${modelField}.modelGeneralData.endDate`,new Date().getTime());
    }


    render() {

        const { rowData, metadata: {customComponentMetadata: {formatMessage }}} = this.props;

        var button=(
            <OverlayTrigger trigger="hover" placement="top"
                            overlay={<Tooltip>{formatMessage(messages.btDeleteModelTitle)}</Tooltip>}>
            <button type='button' className='btn btn-box-tool' onClick={this.changeEndDate}>
            <i className='fa fa-remove'/>
        </button>
            </OverlayTrigger>)

        if(rowData && rowData.endDate !== undefined && rowData.endDate !== null)
        {
            button=  ( <OverlayTrigger trigger="hover" placement="top"
                                       overlay={<Tooltip>{formatMessage(messages.deletedModelTitle)}</Tooltip>}>
                <div>
                <i className='fa fa-trash'/>
            </div>
            </OverlayTrigger>);
        }
        return (

            <div>
                {button}
            </div>
        );
    }
}


class ModelEdit extends React.Component {


    constructor(props) {
        super(props);

    }


    openModelDetailEdit = () => {
        const { rowData,metadata: {customComponentMetadata: { fetchModel, brandRef, form, pathname, listModels, changeReadOnlyModel, selectedModel, showPopupModelDetail}}} = this.props;
        let params={brandRef:brandRef,modelRef:rowData.modelRef}
            rowData.endDate= new Date();

        if(pathname.includes(brandRef)) {
            fetchModel(params, form);
        }else {
            let  edit=false;
            let indexModelSelected = -1
            let i=0;
            if(listModels.length === 1)
            {
                indexModelSelected=0;
            }else {
                listModels.map((Model) => {
                    if (Model.modelGeneralData.modelRef === rowData.modelRef) {
                        indexModelSelected = i;
                    }
                    i = i + 1;
                });
            }
            selectedModel(indexModelSelected)
            changeReadOnlyModel(edit)
            showPopupModelDetail(true)
        }

    };

    render() {
        const { metadata: {customComponentMetadata: {formatMessage }}} = this.props;

        return (
            <div>
                <OverlayTrigger trigger="hover" placement="top"
                                overlay={<Tooltip>{formatMessage(messages.btmodifyModelTitle)}</Tooltip>}>
                <button type='button' className='btn btn-box-tool' onClick={this.openModelDetailEdit}>
                    <i className='fa fa-edit'/>
                </button>
                </OverlayTrigger>
            </div>
        );
    }
}



class ModelDisplay extends React.Component {


    constructor(props) {
        super(props);

    }

    openModelDetail = () => {
        const { rowData,metadata: {customComponentMetadata: { fetchModel, brandRef, form, pathname, listModels, changeReadOnlyModel, selectedModel, showPopupModelDetail}}} = this.props;
        let params={brandRef:brandRef,modelRef:rowData.modelRef};

        rowData.endDate= new Date();

        let  edit=true;
        if(pathname.includes(brandRef)){
            fetchModel(params, form, edit);
        }else {
            let  edit=true;
            let indexModelSelected = -1
            let i=0;
            if(listModels.length === 1)
            {
                indexModelSelected=0;
            }else {
                listModels.map((Model) => {
                    if (Model.modelGeneralData.modelRef === rowData.modelRef) {
                        indexModelSelected = i;
                    }
                    i = i + 1;
                });
            }
            changeReadOnlyModel(edit)
            selectedModel(indexModelSelected)
            showPopupModelDetail(true)
        }

    };

    closeModelDetail = () => {
        const { metadata: {customComponentMetadata: {showPopupModelDetail}}} = this.props;

        showPopupModelDetail(false);
    };



    render() {
        const { metadata: {customComponentMetadata: {formatMessage}}} = this.props;

        return (
            <div>
                <OverlayTrigger trigger="hover" placement="top"
                                overlay={<Tooltip>{formatMessage(messages.btConsulterModelTitle)}</Tooltip>}>

                <button type='button' className='btn btn-box-tool' onClick={this.openModelDetail}>
                    <i className='fa fa-search-plus'/>
                </button>
                </OverlayTrigger>
            </div>
        );
    }
}
const columns = ['modelRef', 'startDate','endDate', 'iconeDetail', 'iconeDelete','iconeEdit'];

class ModelTable extends React.Component {




    handleSelectModel = (args) => {
        if (this.props.metadata.customComponentMetadata.onClick) {
            this.props.metadata.customComponentMetadata.onClick(this.props.rowData, args);
        }

    }
    render() {
        const {location: {pathname}, listModels, fetchModel, change, generalModels, showPopupModelDetail, brandRef, form, formatMessage, changeReadOnlyModel, selectedModel} = this.props;


        var columnMetadata = [
            {
                columnName: 'modelRef',
                displayName: <FormattedMessage id="conf.tab.model.mmocode.column"
                                               defaultMessage="Référence model"/>
            },
            {
                columnName: 'startDate',
                displayName: <FormattedMessage id="conf.tab.model.startdate.column"
                                               defaultMessage="Date de debut"/>,
                customComponent: DateDisplay

            },
            {
                columnName: 'endDate',
                displayName: <FormattedMessage id="conf.tab.model.enddate.column"
                                               defaultMessage="Date de fin"/>,
                customComponent: DateDisplay


            }
            ,
            {
                columnName: 'iconeDetail',
                displayName: '',
                customComponent: ModelDisplay,
                customComponentMetadata: {
                    fetchModel: fetchModel,
                    brandRef:brandRef,
                    form: form,
                    formatMessage: formatMessage,
                    listModels: listModels,
                    pathname: pathname,
                    showPopupModelDetail: showPopupModelDetail,
                    selectedModel:selectedModel,
                    changeReadOnlyModel: changeReadOnlyModel
                }
            },
            {
                columnName: 'iconeDelete',
                displayName: '',
                customComponent: ModelDelete,
                customComponentMetadata: {
                    form: form,
                    listModels: listModels,
                    change: change,
                    formatMessage: formatMessage
                }
            },
            {
                columnName: 'iconeEdit',
                displayName: '',
                customComponent: ModelEdit,
                customComponentMetadata: {
                    fetchModel: fetchModel,
                    brandRef:brandRef,
                    form: form,
                    formatMessage:formatMessage,
                    listModels: listModels,
                    pathname: pathname,
                    showPopupModelDetail: showPopupModelDetail,
                    selectedModel:selectedModel,
                    changeReadOnlyModel: changeReadOnlyModel
                }
            }



        ];


        let notypemodel = (
            <p className="center-text"><FormattedMessage id="conf.tab.model.nodatamessage"
                                                         defaultMessage="La liste est vide"/></p>);
        return (
            <Griddle
                tableClassName="table table-hover"
                useGriddleStyles={false}
                results={generalModels}
                columns={columns}
                columnMetadata={columnMetadata}
                initialSortAscending={false}
                resultsPerPage={10}
                showFilter={true}
                noDataMessage={notypemodel}


            />
        )

    }
}

export default withAccessKeysAndCol(injectIntl(ModelTable));
