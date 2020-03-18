import React from 'react';
import { FormattedMessage, injectIntl} from 'react-intl';
import Button from'react-bootstrap';
import {models} from './../../Constantes/models'
import Griddle from 'griddle-react';
import TrimDetail from "./TrimDetail";
import  { showTrimDetail} from "../reducers/actions";
import {connect} from 'react-redux';

export class IconeTrim extends React.Component {


    constructor(props) {
        super(props);
        this.state = {value: props.data};
    }

    handleChange(value) {
        this.setState({value});
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
var    trim=[];
const columns = ['MMOCODE', 'MMTCODE', 'MMOLIBELLE','ICONEMODEL'];
class TrimTableLevel extends React.Component {

    constructor(props) {
        super(props);



    }

    openDetailTrim = (event,value) => {
        trim=value;
        this.props.showTrimDetail(true)
    };

    handleCloseDetail = () =>
    {
        this.props.showTrimDetail(false)
        trim =[{
            "MMOCODE": "",
            "MMOLIBELLE": "",
            "MMODTSTART": "",
            "ICONEMODEL": ""
        }]
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
            },
            {
                columnName: 'ICONEMODEL',
                displayName: '',
                customComponent:  IconeTrim,
                customComponentMetadata: {
                    onClick: this.openDetailTrim
                }

            }


        ];

        let notype = (<p className="center-text"><FormattedMessage id="conf.tab.trim.nodatamessage" defaultMessage="The list is empty"/></p>);
        return (
            <div>
                {   this.props.isTrimDetailLoade &&
                <TrimDetail trim={trim} handleCloseDetail={this.handleCloseDetail} />
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
                noDataMessage={notype}

            />
                </div>
      )

    }
}

const mapStateToProps = (state, props) => {

    return {
        isTrimDetailLoade: state.trim.isTrimDetailLoade,
    };
};

const mapDispatchToProps = {
    showTrimDetail
};
export default connect(mapStateToProps, mapDispatchToProps) (injectIntl(TrimTableLevel));
