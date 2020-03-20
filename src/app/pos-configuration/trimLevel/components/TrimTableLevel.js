import React from 'react';
import { FormattedMessage, injectIntl} from 'react-intl';
import Button from'react-bootstrap';
import {models} from './../../Constantes/models'
import Griddle from 'griddle-react';
import TrimDetail from "./TrimDetail";

const columns = ['MMOCODE', 'MMTCODE', 'MMOLIBELLE','ICONEMODEL'];


class IconeTrim extends React.Component {


    constructor(props) {
        super(props);
    }



    render() {




        return (
            <div className="box-tools-filter pull-right">

            <Button type='button' className='btn btn-box-tool' onClick={(event) => this.props.metadata.customComponentMetadata.onClick(event, this.props.rowData, this.props.metadata.columnName)}>
                <i className='fa fa-edit'/>
            </Button>
                </div>
        )
    }
}


class TrimTableLevel extends React.Component {

    constructor(props) {
        super(props);



    }

    openDetailTrim = (event,value) => {

        this.props.showTrimDetail(true)
    };

    handleCloseDetail = () =>
    {
        this.props.showTrimDetail(false)

    }




    render() {



        var columnMetadata = [
            {
                columnName: 'MMOCODE',
                displayName: <FormattedMessage id="conf.tab.trim.mmocode.column"
                                               defaultMessage="Make code"/>
            },
            {
                columnName: 'MMTCODE',
                displayName: <FormattedMessage id="conf.tab.trim.mmtcode.column"
                                               defaultMessage="Model code"/>
            },
            {
                columnName: 'MMOLIBELLE',
                displayName: <FormattedMessage id="conf.tab.trim.mmolibelle.column"
                                               defaultMessage="Nom model"/>
            }


        ];

        let notype = (<p className="center-text"><FormattedMessage id="conf.tab.trim.nodatamessage" defaultMessage="The list is empty"/></p>);
        return (
            <div>
                {  this.props.isTrimDetailLoade &&
                <TrimDetail  handleCloseDetail={this.handleCloseDetail} openDetailTrim={this.openDetailTrim} isPopupModelDetailLoade={this.props.showTrimDetail} />
                }
            <Griddle
                tableClassName="table table-hover"
                useGriddleStyles={false}
                results={models}
                columns={columns}
                columnMetadata={columnMetadata}
                initialSort='MMOLIBELLE'
                initialSortAscending={false}
                showPager={false}
                noDataMessage={notype}       />
                </div>
      )

    }
}



export default (injectIntl(TrimTableLevel));