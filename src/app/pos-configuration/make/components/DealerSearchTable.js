import React from 'react';
import {injectIntl} from 'react-intl';
import MediaQuery from 'react-responsive';
import Griddle from 'griddle-react';
import {Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import Debug from 'debug';
import PatternGenerator from '../../../core/components/lib/responsiveGriddle';
import {Box, Loader, TextEntry, SelectField} from 'cassiopae-core';
import {getBootstrapResolution} from '../../../core/utils/Utils';
import messages from '../../Constantes/messages';
import {change, Field, } from 'redux-form';
import NewDealer from './NewDealer';
const debug = Debug('Common:Actor:ActorSearchTable');


const Columns = {
    ActorName: 'actnom',
    ActorCode: 'actcode',
    ActorNationalId: 'actsiret',
    ActorType: 'acttype',
};
const defaultColumns = [Columns.ActorName, Columns.ActorCode, Columns.ActorNationalId, Columns.ActorType];
const results =[{actnom:'BUGUET', actcode:'A00000110', actsiret:'44888094800014', acttype:'PM'},
    {actnom:'Willems_Borrower', actcode:'A00000256', actsiret:'80476976800016', acttype:'PART'},
    {actnom:'MOTORCY', actcode:'WFR0250363', actsiret:'3,12E+13', acttype:'PM'}];
const defaultColumnMetadata = [
    {
        columnName: Columns.ActorName,
        displayName: 'actnom',
    },
    {
        columnName: Columns.ActorCode,
        displayName: 'actcode',
    },
    {
        columnName: Columns.ActorNationalId,
        displayName: 'actsiret',
    },
    {
        columnName: Columns.ActorType,
        displayName: 'acttype',
    },
];


class DealerSearchTable extends React.Component {

    state = { DISPLAYED_COLUMN_CODES: defaultColumns,
        COLUMN_META_DATA: defaultColumnMetadata,
        ShowAddRow:false};

    handleRowClick = (row, proxy) => {
        debug('handleRowClick', 'row=', row, 'proxy=', proxy);
        let {onCityClick} = this.props;

        if (onCityClick) {
            onCityClick(row.props.data);
        }
    };


    handleRowAdd = () => {
        this.setState({ShowAddRow:true});
    };

    handleClose = () => {
        this.setState({ShowAddRow:false});
    };

    actorFilter = (results, filter) => {
        debug('actorFilter', 'results=', results, 'filter=', filter);
        let {listTypes, listTitles} = this.props;
        let {DISPLAYED_COLUMN_CODES} = this.state;

        let serialize = value => value ? value.toString().toLowerCase() : '';
        let IsFilterInValueFromList = (value, list) => serialize(value ? (list.find(type => type.code === value) || {label: ''}).label : '').includes(serializedFilter);

        let serializedFilter = serialize(filter);
        let columns = DISPLAYED_COLUMN_CODES.concat(Columns.ActorPosition);

        return results.filter(item => {
            const isNotFoundable = columns.every(key => {

                const value = item[key];

                let serializedValue = serialize(value);

                if (serializedValue.includes(serializedFilter)) {
                    return false;
                }

                switch (key) {
                    case Columns.ActorType:
                        if (IsFilterInValueFromList(value, listTypes)) {
                            return false;
                        }
                        break;

                }
                return true;
            });
            return !isNotFoundable;
        });
    };

    render() {
        let {DISPLAYED_COLUMN_CODES, COLUMN_META_DATA} = this.state;
        const {
            id = 'pos.common.actor.ActorSeachTable',
            intl, intl: {formatMessage}, listTypes, dealers=results, hideTitle, title,isMobile=true
        } = this.props;
        const  {ShowAddRow}= this.state;
        let ready = DISPLAYED_COLUMN_CODES && COLUMN_META_DATA ;
        if (!ready) {
            return <Loader/>;
        }
        const btTools=   (
            <div className="box-tools-filter pull-right">
                <OverlayTrigger trigger="hover" placement="top"
                                overlay={<Tooltip>Ajouter Dealer</Tooltip>}>

                    <button type="button"  className="btn-primary btn-box-tool"  onClick={this.handleRowAdd}>
                        <i className="fa fa-plus"></i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger trigger="hover" placement="top"
                                overlay={<Tooltip>Fermer</Tooltip>}>

                    <button type="button" className="btn-primary btn-box-tool" onClick={this.handleClose}>
                        <i className="fa fa-remove"></i>
                    </button>
                </OverlayTrigger>
            </div>);
        const titleDealerInfo=   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { formatMessage(messages.dealerSearchTitle)}
        </div>);

        return (
            <Box id={id} type='primary'  title={titleDealerInfo} tools={btTools}>
                {ShowAddRow &&
                <NewDealer intl={intl} handleClose={this.handleClose}/>
                }
                <div className="box-search">
                    <MediaQuery query={'(max-width: ' + getBootstrapResolution('sm') + ')'}>
                        {
                            (isMobile) => {
                                return <Griddle id={id + '.table'}
                                                tableClassName='table table-hover'
                                                useGriddleStyles={false}
                                                results={dealers}
                                                initialSort={Columns.Cpoville}
                                                sortAscending={false}
                                                columns={DISPLAYED_COLUMN_CODES}
                                                columnMetadata={COLUMN_META_DATA}
                                                onRowClick={this.handleRowClick}
                                                resultsPerPage={isMobile ? 30 : 20}
                                                useCustomPagerComponent={true}
                                                showFilter={true}
                                                useCustomFilterer={true}
                                                customFilterer={this.actorFilter}
                                                customRowComponent={PatternGenerator}
                                                useCustomRowComponent={isMobile}
                                                customRowComponentClassName='griddle-body-custom'
                                                filterPlaceholderText='Filter results'
                                                globalData={{
                                                    'metadata': COLUMN_META_DATA,
                                                    onClick: this.handleRowClick,
                                                }}/>

                            }
                        }
                    </MediaQuery>
                </div>
            </Box>
        );
    }
}

export default injectIntl(DealerSearchTable);
