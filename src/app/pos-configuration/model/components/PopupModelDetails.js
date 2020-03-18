import React from 'react';
import {Modal, Button} from "react-bootstrap";
import messages from '../../Constantes/messages';
import ModelDetails from'./ModelDetails'


class PopupModelDetail extends React.Component {



    render() {
        const { isPopupModelDetailLoade, onClose,intl,form  } = this.props;

        const titlePopup =   (<div className="box-tools-filter pull-left">
            <span  className="fa fa-tasks"/>
            { intl.formatMessage(messages.detailModelTitle)}
        </div>)

        return (
            <Modal ref='modal' className='skin-sopra large-modal' show={isPopupModelDetailLoade}  onHide={onClose} >
                <Modal.Header closeButton>
                    {titlePopup}
                    </Modal.Header>
            <ModelDetails form={form} intl={intl}  />
            </Modal>
        );
    }
}

export default PopupModelDetail;
