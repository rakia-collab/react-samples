import React from 'react';
import {FormattedHTMLMessage, injectIntl} from 'react-intl';
import {Button, Col, Grid, Modal, Row} from 'react-bootstrap';
import cls from 'classnames';
import Debug from 'debug';

import {formatMPx, formatSize} from '../../core/utils/formatter';
import {ResizerDetection, constructImageFromFile, resizeImage} from 'cassiopae-core';

import {messages} from './messages';
import './imageResizer.less';

const Base64ArrowImage = 'data:image/png;base64,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';

const debug = Debug('pos:common:images:ImageResizerModal');

export const ONE_MPX = 1000 * 1000;
export const MAX_PIXELS = ONE_MPX * 4;
export const DEFAULT_QUALITY = 70;

const ANIMATION_STEP = ONE_MPX / 5;

class ImageResizerModal extends React.Component {

    state = {maxPixels: MAX_PIXELS, currentPixels: MAX_PIXELS};

    handleClose = (event) => {
        debug('handleClose', 'event=', event);
        let {onClose} = this.props;

        onClose();
    };

    handleUploadOriginal = () => {
        debug('handleUploadOriginal');
        let {onClose, file} = this.props;

        onClose(file);
    };

    handleUploadResized = () => {
        debug('handleUploadResized');
        let {onClose} = this.props;
        let {resizedInformations: {file}} = this.state;

        onClose(file);
    };

    componentWillReceiveProps(newProps) {
        let {file} = this.props;

        if (newProps.file !== file) {
            this.setState({
                image: undefined,
                resizedFile: undefined,
                resizedInformations: undefined,
                maxPixels: MAX_PIXELS,
                currentPixels: MAX_PIXELS
            });
            this._loadFile(newProps.file);
        }
    }

    componentWillMount() {
        this.arrowImage = new Image();
        this.arrowImage.src = Base64ArrowImage;
    }

    componentDidMount() {
        const {file} = this.props;
        debug('componentDidMount', 'file=', file);

        this._loadFile(file);
    }

    _loadFile(file) {
        debug('_loadFile', 'file=', file);
        let {maxPixels} = this.state;

        if (this._loadingImageProcess) {
            this._loadingImageProcess.abort();
        }

        if (!file) {
            this.setState({
                image: undefined,
                resizedInformations: undefined
            });
            return;
        }

        this._loadingImageProcess = constructImageFromFile(file);

        this._loadingImageProcess.promise.then((image) => {
            debug('_loadFile', 'image=', image, 'width=', image.width, 'height=', image.height);

            this._loadingImageProcess = undefined;
            this.setState({image}, this._drawCanvas);

            this._processResizing(file, image, maxPixels);

        }, (error) => {
            alert('Bad image !');
            console.error(error);
            this.handleClose();
        });
    }

    componentWillUnmount() {
        this._canvas = undefined;

        if (this._animationTimerId) {
            clearTimeout(this._animationTimerId);
            this._animationTimerId = undefined;
        }

        if (this._loadingImageProcess) {
            this._loadingImageProcess.abort();
            this._loadingImageProcess = undefined;
        }
    }

    _processResizing(file, image, requestedMPX) {
        debug('_processResizing', 'image=', image, 'requestedMPX=', requestedMPX);

        resizeImage(image, {maxPixels: requestedMPX, fileName: file.name, quality: DEFAULT_QUALITY}).then((result) => {
            debug('_processResizing', 'result=', result);
            const {blob, name, file: newFile, type, width, height, scale, params} = result;

            this.setState({
                resizedInformations: {
                    width, height,
                    file: newFile,
                    mpx: formatMPx(width, height),
                    size: formatSize(newFile.size),
                    percent: Math.floor((newFile.size / file.size - 1) * 100)
                }
            });
        });
    }

    _drawCanvas = () => {
        const {_canvas: canvas} = this;

        const rect = document.querySelector('.image-aspect-ratio').getBoundingClientRect();

        debug('_drawCanvas', 'canvas=', canvas, 'rect.width=', rect.width, 'rect.height=', rect.height, 'state=', this.state);


        if (!canvas) {
            return;
        }

        if (!canvas.getContext) {
            return;
        }

        const {image, currentPixels} = this.state;
        if (!image) {
            return;
        }

        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.clearRect(0, 0, rect.width, rect.height);

        const div12 = rect.width / 12;

        const ms = Math.sqrt(currentPixels / (image.width * image.height));

        const s1 = (10 * div12) / Math.max(image.width, image.height);
        const s2 = s1 * ms;
        const w1 = image.width * s1;
        const h1 = image.height * s1;
        const w2 = image.width * s2;
        const h2 = image.height * s2;

        debug('_drawCanvas', 's1=', s1, 's2=', s2, 'w1=', w1, 'h1=', h1, 'w2=', w2, 'h2=', h2, 'div12=', div12, 'ms=', ms);

        ctx.globalAlpha = 0.2;
        ctx.drawImage(image, (rect.width - w1) / 2, div12, w1, h1);

        ctx.globalAlpha = 1;
        ctx.drawImage(image, (rect.width - w2) / 2, div12 + h1 - h2 / 2, w2, h2);

        ctx.drawImage(this.arrowImage, (rect.width - w2) / 2 - 16, div12 + h1 - h2 / 2 - 16, 32, 32);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, (rect.width - w2) / 2 + w2, div12 + h1 - h2 / 2); // sets scale and origin
        ctx.rotate(90 * Math.PI / 180.0);
        ctx.drawImage(this.arrowImage, -16, -16, 32, 32);
        ctx.restore();

        ctx.restore();
    };

    _setCanvas = (canvas) => {
        debug('_setCanvas', 'canvas=', canvas);

        this._canvas = canvas;
    };

    handleReduceMore = () => {
        let {file} = this.props;
        const {image, maxPixels} = this.state;

        const newPixels = maxPixels - ONE_MPX;
        if (newPixels <= 0) {
            return;
        }

        this.setState({maxPixels: newPixels, resizedInformations: undefined}, () => {
            this._startAnimation();
            this._processResizing(file, image, maxPixels);
        });
    };

    handleReduceLess = () => {
        let {file} = this.props;
        let {maxPixels, image} = this.state;

        const newPixels = maxPixels + ONE_MPX;
        if (newPixels >= image.width * image.height) {
            return;
        }

        this.setState({
            maxPixels: newPixels,
            resizedInformations: undefined
        }, () => {
            this._startAnimation();
            this._processResizing(file, image, maxPixels);
        });
    };

    _startAnimation = () => {
        let {currentPixels, maxPixels} = this.state;
        this._animationTimerId = undefined;

        if (maxPixels === currentPixels) {
            return;
        }

        if (currentPixels < maxPixels) {
            currentPixels = Math.min(maxPixels, currentPixels + ANIMATION_STEP);

        } else {
            currentPixels = Math.max(maxPixels, currentPixels - ANIMATION_STEP);
        }

        this.setState({currentPixels}, this._drawCanvas);

        this._animationTimerId = setTimeout(this._startAnimation, 100);
    };

    render() {
        const {show, intl: {formatMessage}, file, skinClass} = this.props;
        const {image, maxPixels, resizedInformations = {}} = this.state;

        if (!file) {
            return null;
        }

        const classes = {
            'resize-image-modal': true,
            [skinClass]: !!skinClass
        };

        const originalInformations = {
            size: formatSize(file.size)
        };

        let decreaseMpx;
        let increaseMpx;
        if (image) {
            originalInformations.width = image.width;
            originalInformations.height = image.height;
            originalInformations.mpx = formatMPx(image.width, image.height);

            let curMpx = image.width * image.height;
            decreaseMpx = (maxPixels - ONE_MPX) >= ONE_MPX;
            increaseMpx = (maxPixels + ONE_MPX) < curMpx;
        }

        return (
            <Modal show={!!show} onHide={(event) => this.handleClose(false)} bsSize='large'
                   className={cls(classes)}
                   aria-labelledby='resize-image-modal-title-lg'>
                <Modal.Header>
                    <Modal.Title>
                        {formatMessage(messages.title)}
                    </Modal.Title>
                    <Button ref='close' className='resize-image-modal-header-button'
                            onClick={(event) => this.handleClose(false)}>
                        <i className='fa fa-close'/>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Grid fluid={true}>
                        <Row>
                            <Col md={4} xs={12} className='image-resizer-canvas'>
                                <div className='image-aspect-ratio'>
                                    <canvas ref={this._setCanvas}/>
                                    <ResizerDetection onResize={this._drawCanvas}/>
                                </div>
                            </Col>
                            <Col md={8} xs={12}>
                                <Row>
                                    <Col xs={12}>
                                        <label className='resize-description'>
                                            <FormattedHTMLMessage {...messages.description} />
                                        </label>
                                    </Col>
                                    <Col xs={12}>

                                        <label className='resize-original-desc'>
                                            {(!originalInformations.width) ?
                                                <FormattedHTMLMessage {...messages.originalInfo}
                                                                      values={originalInformations}/> :
                                                <FormattedHTMLMessage {...messages.originalInfoEx}
                                                                      values={originalInformations}/>}
                                        </label>
                                    </Col>
                                    <Col xs={12}>
                                        <label className='resize-original-desc'>
                                            {
                                                (!resizedInformations.width) ?
                                                    <FormattedHTMLMessage {...messages.computingResizedInfo}
                                                                          values={resizedInformations}/> :
                                                    <FormattedHTMLMessage {...messages.resizedInfo}
                                                                          values={resizedInformations}/>
                                            }
                                        </label>
                                    </Col>
                                    <Col xs={12} className='resize-buttons'>
                                        <Button key='reduceMore' onClick={this.handleReduceMore}
                                                disabled={!decreaseMpx}>
                                            {formatMessage(messages.reduceMore)}
                                        </Button>
                                        <Button key='reduceLess' onClick={this.handleReduceLess}
                                                disabled={!increaseMpx}>
                                            {formatMessage(messages.reduceLess)}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button key='uploadResized'
                            bsStyle='primary'
                            disabled={!resizedInformations || !resizedInformations.file}
                            onClick={this.handleUploadResized}>
                        {formatMessage(messages.uploadResizedImage)}
                    </Button>
                    <Button key='uploadOriginal'
                            bsStyle='primary'
                            onClick={this.handleUploadOriginal}>
                        {formatMessage(messages.uploadOriginalImage)}
                    </Button>
                    <Button key='cancel'
                            bsStyle='default'
                            onClick={this.handleClose}>
                        {formatMessage(messages.cancelUpload)}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default injectIntl(ImageResizerModal);
