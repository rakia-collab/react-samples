import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, FormGroup} from 'react-bootstrap';
import DealerSearchContainer from './DealerSearchContainer';
import {
    Box, Loader, fetchReferenceTableWithParams,
    getReferenceTable,
    fetchReferenceTable,Col, TextEntry, Row, SelectField,
} from 'cassiopae-core';
import {Field, Form, reduxForm} from "redux-form";
const TABLE_MIN_HEIGHT = 224;

class DealerSearchPopup extends React.Component {

    state = {
        onEdit: false,
    };

    static propTypes = {
        citySearchFilters: PropTypes.object,
    };

    static defaultProps = {
        citySearchFilters: {},
    };

    handleActorCreationClicked = () => {
        this.setState({onEdit: true})
    };

    render() {
        const {
            newTitle, searchTitle, citySearchFilters, hideAddButton, show, accessKeys, onClose, onCreateActor,
            onCityClick,
        } = this.props;

        const gridBodyHeight = Math.max($(window).height() - 340, TABLE_MIN_HEIGHT);
        //Many containers are passing route in obj format route{path:/actor}

        return (
            <Modal ref='modal' className='skin-sopra large-modal' show={show}  onHide={onClose} >

                <DealerSearchContainer hideTitle={true}
                                       filters={citySearchFilters}
                                       gridBodyHeight={gridBodyHeight}
                                       onCityClick={onCityClick}
                                       hideAddButton={hideAddButton}/>
            </Modal>
        );
    }
}

export default DealerSearchPopup;
