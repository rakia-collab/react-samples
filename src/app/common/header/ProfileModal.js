import React from 'react';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import {defineMessages, injectIntl} from 'react-intl';
import {fetchReferenceTable, getReferenceTable, Select2, authenticationActions} from 'cassiopae-core';
import {connect} from 'react-redux';

import {tables} from '../utils/tables';

import SkinItem from './SkinItem';
//import {removeCache} from '../../reducers/authentication';

const messages = defineMessages({
    usLabel: {id: 'core.locale.option.us', defaultMessage: 'English (US)'},
    ukLabel: {id: 'core.locale.option.uk', defaultMessage: 'English (UK)'},
    ieLabel: {id: 'core.locale.option.ie', defaultMessage: 'English (IE)'},
    ecLabel: {id: 'core.locale.option.ec', defaultMessage: 'English (China)'},
    frLabel: {id: 'core.locale.option.fr', defaultMessage: 'French (France)'},
    frenLabel: {id: 'core.locale.option.enfr', defaultMessage: 'English (France)'},
    brLabel: {id: 'core.locale.option.br', defaultMessage: 'Portuguese (Brazil)'},
    deLabel: {id: 'core.locale.option.de', defaultMessage: 'German (Germany)'},
    itLabel: {id: 'core.locale.option.it', defaultMessage: 'Italian (Italy)'},
    esLabel: {id: 'core.locale.option.es', defaultMessage: 'Spanish (Spain)'},
    nlLabel: {id: 'core.locale.option.nl', defaultMessage: 'Dutch (Dutch)'},
    zhLabel: {id: 'core.locale.option.zh', defaultMessage: 'Chinese (France)'},
    ccLabel: {id: 'core.locale.option.cc', defaultMessage: 'Chinese (China)'},
    esptLabel: {id: 'core.locale.option.espt', defaultMessage: 'Spanish (Portugal)'},
    selectASkin: {id: 'core.locale.skins.title', defaultMessage: 'Select a skin'},
    nameProfile: {id: 'core.profile.modeal.title', defaultMessage: '{name} profile'},
    selectLocale: {id: 'core.locale.select.title', defaultMessage: 'Select locale'},
    close: {id: 'core.local.modal.btn.close', defaultMessage: 'Close'}
});

let skins = ['blue', 'red', 'jade', 'cass', 'black', 'yellow', 'purple', 'green', 'blue-light', 'black-light', 'red-light', 'yellow-light', 'purple-light', 'oil'];

//adding WS Skins
skins = skins.concat(['white-100_102', 'grey-101', 'green-103', 'white-104_105', 'blue-106', 'sopra', 'white-2', 'red-black']);

//Make the skins list
skins = skins.reduce((skinsList, skinName, key) => {
    skinsList.push({
        'key': key + 1,
        skinClass: `skin-${skinName}`,
        'name': skinName.split('-').reduce((name, word) => `${name} ${word}`)
    });
    return skinsList;
}, []);

const ID = 'ProfileModal';

class ProfileModal extends React.Component {

    componentWillMount() {
        let {fetchReferenceTable} = this.props;
        fetchReferenceTable(tables.LOCALS);
    }

    handelLocalChanged = (event, value) => {
        let {onLocaleChange} = this.props;
        const {removeCache} = authenticationActions;
        onLocaleChange(event, value);
        removeCache();
    };


    render() {
        let {locals} = this.props;

        let {
            id = ID, intl: {formatMessage}, showSkinSelector, onSkinChange, onClose, username, showModal, hideLanguageSelector,
            locale
        } = this.props;

        let skinItems = skins.map((skin) => <SkinItem {...skin} onClick={onSkinChange}/>);
        let skinSelector = null;
        if (showSkinSelector) {
            skinSelector = (
                <FormGroup>
                    <ControlLabel>
                        {formatMessage(messages.selectASkin)}
                    </ControlLabel>
                    <ul className='list-unstyled row'>
                        {skinItems}
                    </ul>
                </FormGroup>
            );
        }
        return (
            <Modal show={showModal} onHide={onClose} id={id}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {formatMessage(messages.nameProfile, {name: username})}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !hideLanguageSelector &&
                        <Select2
                            id={id + '.LocaleSelect'}
                            value={locale}
                            options={locals}
                            inputName="locale"
                            onChange={this.handelLocalChanged}
                            title={formatMessage(messages.selectLocale)}/>
                    }
                    {skinSelector}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} className='pull-left'>
                        {formatMessage(messages.close)}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {

    let locals = (getReferenceTable(state, tables.LOCALS).data || []).map(option => {
        if (option.code) {
            return {
                ...option,
                code: option.code.replace('_', '-')
            };
        }
        return option;
    });

    return {
        locals
    };
};

const mapDispatchToProps = {
    fetchReferenceTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProfileModal));
