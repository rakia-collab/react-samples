import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {omitBy, isNil} from 'lodash';

import DealerSearchTable from './DealerSearchTable';

class DealerSearchContainer extends React.Component {

    static propTypes = {
        filters: PropTypes.object,
    };


    componentWillMount() {
        let {filters, fetchCities} = this.props;

        const cleanFilters = omitBy(filters, isNil);
        // fetchCities(cleanFilters);

    }

    componentWillReceiveProps(nextProps) {
        let {currentBrand, filters, fetchCities} = this.props;
        const cleanFilters = omitBy(filters, isNil);
        if (nextProps.currentBrand !== currentBrand) {
            //    fetchCities(cleanFilters);
        }
    }

    render() {
        let {
            cities=[], listTypes=[], listTitles, title, hideTitle, gridBodyHeight, onCityClick, accessKeys, filters,
            actorsFetched=[], hideAddButton,
        } = this.props;

        return (
            <div className='actor-search-content'>
                <DealerSearchTable title='titre'
                                 hideTitle={false}
                                 gridBodyHeight={gridBodyHeight}
                                 cities={cities}
                                 listTypes={listTypes}
                                 listTitles={listTitles}
                                 onCityClick={onCityClick}
                                 actorsFetched={actorsFetched}/>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {


    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DealerSearchContainer));
