import React from 'react';
import {injectIntl} from 'react-intl';
import {connect} from 'react-redux';
import {formValueSelector,Field, change} from 'redux-form';
import Debug from 'debug';
import {Box, Col,Row, TextEntry, SelectField, SearchEntryField, SearchEntry,CurrencyEntryField} from 'cassiopae-core';
import DealerSearchPopup from './DealerSearchPopup';


const debug = Debug('pos:customer:ActorNameField');

class DealerField extends React.Component {

    state = {
        searchPopupShow: false,
    };

    handleSearchDealer = () => {
        debug('handleSearchCity');

        this.setState({
            searchPopupShow: true,
        });
    };

    closeDealerModal = () => {
        this.setState({searchPopupShow:false});
    }
    handleSelectDealer = (selectedDealer) => {
        const {form, makeotherdataExp, change} = this.props;
        this.setState({searchPopupShow: false});
        change(form, `${makeotherdataExp}.dealer`,selectedDealer.actcode);

    };

    handleClearDealer= () => {
        const {form, change, makeExp} = this.props;
        change(form, `${makeExp}.dealer`,'');

    };


    handleModalClose = () => {
        this.setState({
            searchPopupShow: false,
        });
    };

    render() {
        const {searchPopupShow} = this.state;
        const {
            id = 'pos.actor.AddressCityField',title, makeotherdataExp, make, readOnly,
            intl: {formatMessage}, form, accessKeys, route, name,
        } = this.props;
        let searchTitle = "";

        const filters = {
            maxlines: 1000,
        };
        return (
            <div>
            <span>
             <SearchEntryField
                 id={id + '.SearchEntry'}
                 key='name'
                 name={`${makeotherdataExp}.dealer`}
                 title='Dealer'
                 placeholder='Dealer'
                 readOnly={readOnly}
                 onSearch={this.handleSearchDealer}
                 onClearInput={this.handleClearDealer}
                 toUpperCase={true}/>
                 <DealerSearchPopup citySearchFilters={filters}
                                    onCityClick={this.handleSelectDealer}
                                    show={searchPopupShow}
                                    hideAddButton={true}
                                    searchTitle='title'
                                    onClose={this.closeDealerModal}
                 />


            </span>

            </div>
        );
    }
}

function mapStateToProps(state, props) {


    return {

    };
}

const mapDispatchToProps = {
    change,

};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DealerField));
