import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import ReactFlagsSelect from '../../components/ReactFlagsSelect';

import {
    Col,
    Row,
    TextEntry,
    TextEntryField,
    normalizeEmail,
    Box,
    GlobalLabelMessages as labels,
    GlobalPlaceholderMessages as placeholders,
    InternationalPhoneField,
    SelectField
} from 'cassiopae-core';
import {Field, Form, reduxForm} from "redux-form";
import messages from '../../Constantes/messages';
class CategoriePopup extends React.Component {
  render() {
        let {onClose, showModal} = this.props;
      const titleCategorieInfo=   (<div className="box-tools-filter pull-left">
          <span  className="fa fa-tasks"/>
          Ajouter Categorie
      </div>);
      return (

              <Modal ref='modal' className='skin-sopra large-modal' show={showModal}  onHide={onClose} >
                  <Box type='primary'  title={titleCategorieInfo} >
              <Row xs={12}>
                     <Col xs={6}>
                         <Col className='reactflag'>
                             <div className='text-left'>
                                 <label>country</label>
                             </div>
                             <ReactFlagsSelect defaultCountry="FR"/>

                         </Col>

                         <Field name='acacode'
                                title='Acacode'
                                component={TextEntry} />

                     </Col>
                      <Col xs={6}>


                          <Field name='acadescription'
                                 title='Acadescription'
                                 component={TextEntry}
                          />
                      </Col>


                  </Row>
                      <Row>
                          <Button  className="btn-primary  pull-right"
                                   onClick={this.props.handleClose}>
                              Ajouter
                          </Button>
                      </Row>
                  </Box>
              </Modal>

      );
    }
}

export default injectIntl(CategoriePopup);
