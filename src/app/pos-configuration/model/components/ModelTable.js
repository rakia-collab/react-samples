import React from 'react';
import {Link} from 'react-router';
import {FormattedDate, FormattedMessage, injectIntl} from 'react-intl';
import {compose} from 'redux';
import {reduxForm} from 'redux-form';
import {Button} from 'react-bootstrap';
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




    render() {
        const { metadata: {customComponentMetadata: {changeEndDate}}} = this.props;

        return (
            <div>
                <button type='button' className='btn btn-box-tool' onClick={this.changeEndDate}>
                    <i className='fa fa-remove'/>
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
        const { rowData,metadata: {customComponentMetadata: { fetchModel, showPopupModelDetail}}} = this.props;
        fetchModel(rowData.modelref);
        showPopupModelDetail(true);

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
const columns = ['modelRef', 'startDate','endDate', 'iconeDetail', 'iconeDelete'];

class ModelTable extends React.Component {


    componentWillMount() {
       this.props.initModels(this.props.models)
    }

    handleSelectModel = (args) => {
        if (this.props.metadata.customComponentMetadata.onClick) {
            this.props.metadata.customComponentMetadata.onClick(this.props.rowData, args);
        }

    }
    render() {
        const {changeEndDate, fetchModel,  showPopupModelDetail, generalModels, isPopupModelDetailLoade,indexModel} = this.props;
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
                    showPopupModelDetail: showPopupModelDetail,
                    isPopupModelDetailLoade: isPopupModelDetailLoade
                }
            },
            {
                columnName: 'iconeDelete',
                displayName: '',
                customComponent: ModelDelete,
                customComponentMetadata: {
                    fetchModel: changeEndDate,
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
