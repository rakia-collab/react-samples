import React from 'react';
import {injectIntl} from 'react-intl';
import MediaQuery from 'react-responsive';
import Griddle from 'griddle-react';
import {Row, Col, OverlayTrigger, Tooltip, Button} from "react-bootstrap";
import Debug from 'debug';
import PatternGenerator from '../../../core/components/lib/responsiveGriddle';
import {Box, Loader, TextEntry, SelectField} from 'cassiopae-core';
import {getBootstrapResolution} from '../../../core/utils/Utils';
import messages from '../../Constantes/messages';
import {change, Field, } from 'redux-form';
import BrandTraduction from './BrandTraduction';
import countries from '../../Constantes/countries';
const debug = Debug('Common:Actor:ActorSearchTable');

class CountryDisplay extends React.Component {
    render() {
        return (
            <div> <img
        className="flag-select__option__icon"
        src={`src/www/img/flags/${this.props.rowData.lancode.toLowerCase()}.svg`}/>
        <span className="flag-select__option__label">
         {  countries[this.props.rowData.lancode] }
									</span>
        </div>
        );
    }
}

class IconDisplay extends React.Component {
    render() {
        return (
            <div className="box-tools-filter pull-right">

                <Button type='button' className='btn btn-box-tool'>
                    <i className='fa fa-edit'/>
                </Button>
            </div>)
    }
}

const Columns = {
    Lancode: 'lancode',
    Brand: 'brand',
    Icon:'icon'
};
const defaultColumns = [Columns.Lancode, Columns.Brand, Columns.Icon];
const results =[{lancode:'FR', brand:'DAF fr', icon:''},
    {lancode:'TN', brand:'DAF Tunis', icon:''}];

const defaultColumnMetadata = [
    {
        columnName: Columns.Lancode,
        displayName: 'lancode',
        customComponent: CountryDisplay
    },
    {
        columnName: Columns.Brand,
        displayName: 'brand',
    },
    {
        columnName: Columns.Icon,
        displayName: IconDisplay,

    }
];
var    lancode=[];




class NewLabel extends React.Component {

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
            <Box id={id} type='primary'  title="Label Traduction" tools={btTools}>
                {ShowAddRow &&
                <BrandTraduction intl={intl} handleClose={this.handleClose}/>
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
                                                customRowComponent={PatternGenerator}
                                                useCustomRowComponent={isMobile}
                                                customRowComponentClassName='griddle-body-custom'
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

export default injectIntl(NewLabel);
