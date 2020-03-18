import React from 'react'
import {Modal,button} from 'react-bootstrap';
import {injectIntl} from 'react-intl';
import StepContainerModal from '../../components/StepContainerModal';
import messages from '../../Constantes/messages';
class popupMakeTrim extends React.Component {




    render() {
        let {intl: {formatMessage},onClose,show} = this.props;

        return (
            <Modal backdrop="true" show={show} animation={true}  onHide={onClose}>
                <Modal.Header  closeButton>
                </Modal.Header>
                <Modal.Body  >
                    <StepContainerModal id='conf.model.step' />
                    <center>
                        <button type="button" className="btn-danger "  >

                            {formatMessage(messages.btValidateTitle)}

                        </button>
                    </center>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        );
    }
}

export default injectIntl(popupMakeTrim);