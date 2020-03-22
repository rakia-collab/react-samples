import React from 'react';
import { FormattedMessage, injectIntl} from 'react-intl';
import Griddle from 'griddle-react';
import {
    GlobalMessages,
    withAccessKeysAndCol,
    DateDisplay
} from 'cassiopae-core';





class ModelDelete extends React.Component {


    constructor(props) {
        super(props);

    }

    changeEndDate = () =>{
        const { rowData,metadata: {customComponentMetadata: {change, form, listModels}}} = this.props;
        var indexModel = -1
        var i=0;
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
        const { rowData} = this.props;
        var button=(  <button type='button' className='btn btn-box-tool' onClick={this.changeEndDate}>
            <i className='fa fa-remove'/>
        </button>)
        if(rowData && rowData.endDate !== undefined && rowData.endDate !== null)
        {
            button=  ( <div>
                <i className='fa fa-trash'/>
            </div>);
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
        const { rowData,metadata: {customComponentMetadata: { fetchModel, brandRef, form}}} = this.props;
        let params={brandRef:brandRef,modelRef:rowData.modelRef}
        fetchModel(params, form);

    };

    render() {

        return (
            <div>
                <button type='button' className='btn btn-box-tool' onClick={this.openModelDetailEdit}>
                    <i className='fa fa-edit'/>
                </button>
            </div>
        );
    }
}



class ModelDisplay extends React.Component {


    constructor(props) {
        super(props);

    }

    openModelDetail = () => {
        const { rowData,metadata: {customComponentMetadata: { fetchModel, brandRef, form}}} = this.props;
        let params={brandRef:brandRef,modelRef:rowData.modelRef}
        let  edit=true;
        fetchModel(params, form, edit);

    };

    closeModelDetail = () => {
        const { metadata: {customComponentMetadata: {showPopupModelDetail}}} = this.props;

        showPopupModelDetail(false);
    };



    render() {
        const { metadata: {customComponentMetadata: {isPopupModelDetailLoade}}} = this.props;

        return (
            <div>
                 <button type='button' className='btn btn-box-tool' onClick={this.openModelDetail}>
                    <i className='fa fa-search-plus'/>
                </button>
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
        const {listModels, fetchModel, change, generalModels, isPopupModelDetailLoade, brandRef, form} = this.props;


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
                    isPopupModelDetailLoade: isPopupModelDetailLoade,
                    brandRef:brandRef,
                    form: form
                }
            },
            {
                columnName: 'iconeDelete',
                displayName: '',
                customComponent: ModelDelete,
                customComponentMetadata: {
                    form: form,
                    listModels: listModels,
                    change: change
                }
            },
            {
                columnName: 'iconeEdit',
                displayName: '',
                customComponent: ModelEdit,
                customComponentMetadata: {
                    fetchModel: fetchModel,
                    isPopupModelDetailLoade: isPopupModelDetailLoade,
                    brandRef:brandRef,
                    form: form
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
