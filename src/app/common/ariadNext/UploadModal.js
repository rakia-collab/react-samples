import React from 'react';
import {Button, Modal} from "react-bootstrap";
import classNames from "classnames";
import QRCode from "qrcode.react";
import {injectIntl} from "react-intl";
import Debug from "debug";
import {connect} from "react-redux";
import axios from "axios";
import moment from "moment";
import {Field, Form, reduxForm} from "redux-form";

import {
    isValidTelephoneNo,
    normalizePhone,
    TextEntry,
    GlobalMessages,
    notify,
    SmallProgressLoader,
    fetchReferenceTableWithParams,
    getReferenceTable,
} from 'cassiopae-core';

import {FEMALE, MALE, OTHER} from '../actor/actorUtils';
import messages from "./messages";
import {tables} from "../../common/utils/tables";

import './uploadModal.less';

import COUNTRIES from './Countries_3to2.json';

const ARIADNEXT_FORM = 'ariadnext';

export const REPORT_TYPE = 'REPORT';
export const CANCEL_OCR = 'CANCEL';
const POOL_INTERVAL_MS = 5 * 1000;

const PDF_MIME_TYPE = 'application/pdf';
const APPLICATION_STREAM = 'application/octet-stream';

const TRANSFORM_NATIONALITY = {
    'FRA': 'FR',
    'ESP': 'ES',
    'UKD': 'UK',
};

const TRANSFORM_DOCIDTYPE = {
    'ID': 'CARDI',
    'PAS': 'PASS',
    'KBIS': 'EXTK',
//    'TITSEJ': 'TITSEJ'
};

const DOCUMENT_PARTS = {
    'RECTO': {name: 'Identity card 2.jpg', type: 'IDENTITY-RECTO-CARD'}, // MAPPED TO VERSO because of ARIADNEXT BUG !!
    'VERSO': {name: 'Identity card 1.jpg', type: 'IDENTITY-VERSO-CARD'},
};

const GENDER_TYPES = [
    {code: MALE, label: 'male'},
    {code: FEMALE, label: 'female'},
];

const WS_BASE = '/ariadnext';

const debug = Debug('pos:common:ariadNext:UploadModal');

class UploadModal extends React.Component {

    state = {
        url: undefined,
        status: undefined
    };

    componentDidMount() {
        const {dispatch, useMobilePhone} = this.props;
        dispatch(fetchReferenceTableWithParams(tables.LANTUSPARAM, {tusnom: 'NATIONALITY'}));
        dispatch(fetchReferenceTableWithParams(tables.LANTUSPARAM, {tusnom: 'DOCIDTYPE'}));
        dispatch(fetchReferenceTableWithParams(tables.LANTTRPARAM, {ttrnom: 'GENDER'}));

        this._clearQRCode();

        if (!useMobilePhone) {
            this._uploadQRCode();

        } else {
            this.setState({
                status: 'MOBILE'
            });
        }
    }

    componentWillUnmount() {
        this._clearInterval();
        this._clearObjectURLS();
    }


    _clearObjectURLS() {
        const pdfURL = this._pdfURL;
        if (pdfURL) {
            this._pdfURL = undefined;

            URL.revokeObjectURL(pdfURL);
        }

        const pdfDownload = this._pdfDownload;
        if (pdfDownload) {
            this._pdfDownload = undefined;

            URL.revokeObjectURL(pdfDownload);
        }

        const qs = document.querySelectorAll('.modal-pdf-links');
        qs.forEach((child) => child.parentNode.removeChild(child));
    }

    handleValidate = () => {
        const {informations} = this.state;

        debug('handleValidate', 'informations=', informations);

        debug('handleValidate');
        this._clearInterval();
        this._clearObjectURLS();
        const {onValidate} = this.props;
        onValidate && onValidate(informations);
    };

    handleClose = () => {
        const {informations} = this.state;
        debug('handleClose', 'informations=', informations);
        this._clearInterval();
        this._clearObjectURLS();
        const {onClose} = this.props;
        onClose && onClose(informations);
    }

    handleSaveOrOpenPdf = () => {

    };

    handleDownloadPdf = () => {
        const {pdfContent} = this.state;
        const {hasMSSaveOrOpenBlob} = this.props;

        if (hasMSSaveOrOpenBlob) {
            const name = moment().format('YYYYMMDD') + ' - Report.pdf';
            const blobObject = new Blob([pdfContent], {type: APPLICATION_STREAM});
            window.navigator.msSaveBlob(blobObject, name);
            return;
        }

        if (!this._pdfDownload) {
            const name = moment().format('YYYYMMDD') + ' - Report.pdf';

            const blob = new File([pdfContent], name, {type: APPLICATION_STREAM});

            this._pdfDownload = URL.createObjectURL(blob);
            this._pdfFilename = name;
        }

        const qs = document.querySelectorAll('.modal-pdf-links');
        qs.forEach((child) => child.parentNode.removeChild(child));

        const link = document.createElement('a');
        link.setAttribute('class', 'modal-pdf-links');
        link.href = this._pdfDownload;
        link.download = this._pdfFilename;
        link.target = 'pos_ariadnext_download';
        document.body.appendChild(link);
        link.click();

        // window.open(this._pdfDownload, 'pos_ariadnext_download');
    };

    handleShowPdf = () => {
        const {pdfContent} = this.state;
        const {hasMSSaveOrOpenBlob} = this.props;

        if (hasMSSaveOrOpenBlob) {
            const name = moment().format('YYYYMMDD') + ' - Report.pdf';
            const blobObject = new Blob([pdfContent], {type: PDF_MIME_TYPE});
            window.navigator.msSaveOrOpenBlob(blobObject, name);
            return;
        }

        if (!this._pdfURL) {
            const blob = new Blob([pdfContent], {type: PDF_MIME_TYPE});

            this._pdfURL = URL.createObjectURL(blob);
        }

        window.open(this._pdfURL, 'pos_ariadnext_pdf');
    };

    componentWillReceiveProps(newProps) {
        debug('componentWillReceiveProps', 'newProps=', newProps, 'props=', this.props);

        if (newProps.show && !this.props.show) {
            this._clearQRCode();

            newProps.reset(); // Reset the form

            if (!newProps.useMobilePhone) {
                this._uploadQRCode();

            } else {
                this.setState({
                    status: 'MOBILE',
                });
            }

        } else if (!newProps.show) {
            this._clearInterval();
        }
    }

    _clearInterval() {
        const resultTimeoutId = this._resultTimeoutId;
        if (resultTimeoutId) {
            this._resultTimeoutId = undefined;
            clearTimeout(resultTimeoutId);
        }

        const timerId = this._timerId;
        if (timerId) {
            this._timerId = undefined;
            clearInterval(timerId);
        }
    }

    _clearQRCode() {
        this.setState({
            url: undefined,
            uid: undefined,
            status: undefined,
            informations: undefined,
            loadingPdf: undefined,
            pdfContent: undefined,
            waitingSMS: undefined,
        });

        this._clearInterval();
    }

    _uploadQRCode(mobilePhone) {
        const {pollingMs, locale, ocrConfig} = this.props;

        let language;
        const exp = /^([^-_]+)/.exec(locale);
        if (exp) {
            language = exp[1].toUpperCase();
        }

        const params = {language};
        if (mobilePhone) {
            if (ocrConfig.forceMobileNumberPrefix) {
                const e = /^([^0][\d]+|0[^0][\d]+)$/.exec(mobilePhone);
                if (e) {
                    mobilePhone = ocrConfig.forceMobileNumberPrefix + e[1];
                }
            }

            params.phone = mobilePhone;
        }

        axios.get(`${WS_BASE}/newUploadLink`, {params}).then((result) => {
            debug('_uploadQRCode', 'uid=', uid, 'status=', result.status, 'result=', result.data);

            if (result.status < 200 || result.status >= 300) {
                notify.show(messages.canNotGetURL, notify.ERROR);
                return;
            }

            const r = result.data;
            const {url, uid} = r;

            debug('_uploadQRCode', 'uid=', uid, 'result=', result.data);

            this.setState({url, uid});

            this._timerId = setInterval(this._poolStatus, pollingMs || POOL_INTERVAL_MS);
            this._poolStatus();

        }, (error) => {
            console.error("_uploadQRCode", "error=", error);

            notify.show(messages.canNotGetURL, notify.ERROR);
        });
    }

    _poolStatus = () => {
        const {url, uid, status} = this.state;

        debug('_poolStatus', 'url=', url, 'uid=', uid);
        if (!url || !uid) {
            return;
        }

        if (status === 'SUCCESS' || status === 'USER') {
            return;
        }

        axios.get(`${WS_BASE}/files/${normalizeParam(uid)}/status`).then((wsResult) => {
            const {uid, status, result} = wsResult.data;

            debug('_poolStatus', 'uid=', uid, 'result=', wsResult.data);

            if (this.state.status === status || this.state.uid !== uid || status === 'USER') {
                return;
            }

            this._processStatusChanged(status, result);

        }, (error) => {
            console.error('poolStatus of url=', url, 'error=', error);
        });
    };

    _processStatusChanged(status, result) {
        debug('_processStatusChanged', 'status=', status, 'result=', result);

        this.setState({status});

        switch (status) {
            case 'CREATED':
            case 'CLICKED':
            case 'CAPTURE_ONGOING':
                return;

            case 'SUCCESS':
                this._clearInterval();
                this._prepareResult(result);
                return;
        }
    }

    _prepareResult(result) {
        const {analysisResults, cisData: {cisFileUid} = {}} = result;
        const ret = {documents: []};
        const {ocrConfig, rolcode} = this.props;
        debug('_prepareResult', 'cisFileUid=', cisFileUid, 'analysisResults=', analysisResults, 'rolcode=', rolcode);
        let current_dmacat = null;
        let filePrefix = rolcode;
        if (ocrConfig && ocrConfig.mapRolcodeDmaCat) {
            let mapRoleCateg = ocrConfig.mapRolcodeDmaCat;
            current_dmacat = mapRoleCateg && mapRoleCateg[rolcode];
        }
        if (ocrConfig && ocrConfig.mapRolcodeFilePrefix) {
            let mapRolePrefix = ocrConfig.mapRolcodeFilePrefix;
            filePrefix = (mapRolePrefix && mapRolePrefix[rolcode]) || rolcode;
        }

        if (cisFileUid) {
            axios.get(`${WS_BASE}/files/${normalizeParam(cisFileUid)}`).then((wsResult) => {
                debug('_prepareResult', '/file cisFileUid=', cisFileUid, 'wsResult=', wsResult);

                const {documents = [], lastReportStatus, lastReport} = wsResult.data;

                debug('_prepareResult', 'cisFileUid=', cisFileUid, 'lastReportStatus=', lastReportStatus);


                if (lastReportStatus === 'NONE') {
                    this._resultTimeoutId = setTimeout(() => {
                        this._prepareResult(result);
                    }, 2000);
                    return;
                }

                ret.reportStatus = lastReportStatus;

                if (lastReport && lastReport.customerIdentities) {

                    lastReport.customerIdentities.forEach(({identityData, addressData = {}}) => {
                        if (!identityData) {
                            return;
                        }

                        const {birthDay, birthMonth, birthPlace, birthYear, firstNames, gender, lastName, nationality} = identityData;
                        const {zipCode, lines, city, fullAddress} = addressData;

                        if (birthDay && birthMonth && birthYear) {
                            ret.birthDate = new Date(birthYear.value, birthMonth.value - 1, birthDay.value);
                        }
                        if (birthPlace) {
                            ret.birthPlace = birthPlace.value;
                        }
                        if (firstNames) {
                            ret.firstName = firstNames.values.join(' ');
                        }
                        if (lastName) {
                            ret.lastName = lastName.value;
                        }
                        if (zipCode) {
                            ret.zipCode = zipCode.value;
                        }
                        if (city) {
                            ret.city = city.value;
                        }
                        if (fullAddress && fullAddress.values && fullAddress.values.length > 1) {
                            ret.addressData = fullAddress.values;
                        } else if (lines) {
                            ret.addressData = lines.values.join(' ');
                        }
                        if (gender) {
                            if (ocrConfig && ocrConfig.genders) {
                                const g = ocrConfig.genders[String(gender.value)];
                                if (g) {
                                    ret.gender = g.gender;
                                    ret.apatitre = g.apatitre;
                                }

                            } else {
                                switch (gender.value) {
                                    case 'F':
                                        ret.gender = FEMALE;
                                        ret.apatitre = 'MME';
                                        break;
                                    case 'M':
                                        ret.gender = MALE;
                                        ret.apatitre = 'M';
                                        break;
                                    default:
                                        ret.gender = OTHER;
                                        ret.apatitre = 'O';
                                        break;
                                }
                            }
                        }
                        if (nationality) {
                            let n = nationality.value;

                            if (ocrConfig && ocrConfig.nationalities) {
                                n = ocrConfig.nationalities[n];

                            } else {
                                const n2 = COUNTRIES.TRIGRAMPAYS[n.toUpperCase()];
                                if (n2) {
                                    n = n2;
                                }
                            }

                            ret.nationality = n;
                        }
                    });

                    debug('_prepareResult', 'lastReport ret=', ret, 'lastReport=', lastReport.customerIdentities);
                }

                this.setState({
                    loadingPdf: true,
                    informations: ret,
                    status: 'USER'
                });

                const ps = [];
                ps.push(axios.get(`${WS_BASE}/files/${normalizeParam(cisFileUid)}/report`, {
                    responseType: 'arraybuffer'

                }).then((result) => {
                        this.setState({
                            loadingPdf: false,
                            pdfContent: result.data,
                        });

                        let dmatype;
                        const dmatypes = ocrConfig.dmatypes;
                        if (dmatypes) {
                            dmatype = dmatypes[REPORT_TYPE];
                            if (!dmatype) {
                                return;
                            }
                        }

                        const contentType = result.headers['content-type'];

                        const doc = {
                            type: REPORT_TYPE,
                            dmatype,
                            dmacat: current_dmacat,
                            data: result.data,
                            contentType,
                            name: filePrefix + '-' + moment().format('YYYYMMDD') + ' - Report.pdf'
                        };

                        ret.documents.push(doc);

                        return doc;

                    }, (error) => {
                        this.setState({
                            loadingPdf: false,
                        });

                        console.error('Can not get PDF report', error);

//                        this.handleClose(ret);
                    }
                ));

                documents.forEach(({uid, type}) => {
                    if (!TRANSFORM_DOCIDTYPE[type]) {
                        return;
                    }

                    this.setState({
                        loadingDocuments: true,
                    });

                    ps.push(axios.get(`${WS_BASE}/documents/${normalizeParam(uid)}`).then((result) => {
                        const {images, lastReport} = result.data;

                        if (lastReport) {
                            const {info, persons, issuance} = lastReport;

                            if (info) {
                                const {personalNumber, documentType, expirationDate} = info;
                                if (documentType && documentType.value) {
                                    let idType = documentType.value;
                                    if (ocrConfig && ocrConfig.docidTypes) {
                                        idType = ocrConfig.docidTypes[idType];
                                    }

                                    ret.idType = idType;
                                }
                                if (personalNumber && personalNumber.value) {
                                    ret.idNumber = personalNumber.value;
                                }
                                if (expirationDate && expirationDate.value) {
                                    ret.idExpiration = new Date(expirationDate.year, expirationDate.month - 1, expirationDate.day);
                                }

                                this.setState({
                                    informations: ret,
                                });
                            }
                        }

                        if (images && images.length) {
                            const is = images.filter((image) => (image.source === 'CROPPED' && DOCUMENT_PARTS[image.documentPart]))
                                .map(({uid: imageUid, documentPart}) => {
                                    let p = axios.get(`${WS_BASE}/documents/${normalizeParam(uid)}/images/${normalizeParam(imageUid)}`, {
                                        responseType: 'arraybuffer'
                                    });

                                    p = p.then((result) => {
                                        let {type, name} = DOCUMENT_PARTS[documentPart];
                                        name = filePrefix + '-' + name;

                                        let dmatype;
                                        const dmatypes = ocrConfig.dmatypes;
                                        if (dmatypes) {
                                            dmatype = dmatypes[type];
                                            if (!dmatype) {
                                                return;
                                            }
                                        }

                                        const contentType = result.headers['content-type'];

                                        const doc = {
                                            type,
                                            data: result.data,
                                            contentType,
                                            name,
                                            dmatype,
                                            dmacat: current_dmacat
                                        };

                                        ret.documents.push(doc);

                                    }, (error) => {
                                        console.error('Can not load image documentUid=', uid, 'imageUid=', imageUid, 'error=', error);
                                    });

                                    return p;
                                });

                            return Promise.all(is);
                        }

                    }, (error) => {
                        console.error('Can not get load document=', uid, 'error=', error);
                    }));
                });

                Promise.all(ps).then(() => {
                    this.setState({
                        loadingDocuments: false,
                    });

//                    this.handleClose(ret);
                });

            }, (error) => {
                console.error('poolStatus of url=', url, 'error=', error);
            });

            return;
        }

        analysisResults.forEach((analysisResult) => {
            const {analysisData, listCapturedDocs, cisData: {cisDocumentUid} = {}} = analysisResult;

            if (!analysisData) {
                return;
            }

            const {docType, owner = {}} = analysisData;
            switch (docType) {
                case "ID":
                    if (owner.firstNames) {
                        ret.firstName = owner.firstNames.join(' ');
                    }
                    if (owner.lastNames) {
                        ret.lastName = owner.lastNames.join(' ');
                    }
                    if (owner.birthDate) {
                        ret.birthDate = new Date(owner.birthDate.year, owner.birthDate.month - 1, owner.birthDate.day);
                    }
                    if (listCapturedDocs) {
                        listCapturedDocs.forEach((doc) => {
                            ret.documents.push({
                                base64: doc,
                                type: docType,
                                sign: cisFileUid + " " + cisDocumentUid
                            });
                        });
                    }
                    break;
            }
        });

        debug('_prepareResult', 'data=', result, 'ret=', ret);
        this.handleValidate(ret);
    }

    handleMobileSubmit = ({mobilePhone}) => {
        const {onMobilePhoneChanged} = this.props;

        onMobilePhoneChanged && onMobilePhoneChanged(mobilePhone);

        this._uploadQRCode(mobilePhone);

        this.setState({
            waitingSMS: true
        });


    };

    handleMobileOk = (event) => {
        const {handleSubmit} = this.props;
        handleSubmit(event);
    };

    validMobilePhone = (value) => {
        if (!value) {
            return GlobalMessages.fieldRequire;
        }

        const {telephoneFormat} = this.props;
        if (telephoneFormat) {
            const r = new RegExp(telephoneFormat, 'g');

            if (!r.test(value)) {
                return GlobalMessages.invalidPhoneNo;
            }

        } else if (!isValidTelephoneNo(value)) {
            return GlobalMessages.invalidPhoneNo;
        }
    };


    render() {
        const {
            show, intl: {formatMessage, formatDate}, skinClass, nationalities, documentTypes, genders,
            handleSubmit, submitting, ocrConfig, invalid,
        } = this.props;
        const {url, status, loadingPdf, loadingDocuments, informations, pdfContent, waitingSMS} = this.state;
        const isReportOnError = (informations && informations.reportStatus == 'ERROR');
        const classes = {
            'ariadnext-modal': true,
            [skinClass]: true
        };

        let trs = [];
        if (status === 'USER' && informations) {
            trs = Object.keys(informations).map((key) => {
                if (key === 'documents') {
                    return null;
                }

                const msg = messages[`key_${key}`];
                if (!msg) {
                    console.error('No message for key=', key);
                    return null;
                }

                let value = informations[key];
                if (Array.isArray(value)) {
                    value = value.join(' ');
                }
                if (value instanceof Date) {
                    value = formatDate(value);

                } else if (value === null || value === undefined) {
                    value = '';

                } else if (typeof (value) === 'number') {
                    value = String(value);
                }

                const plural = messages[`value_${key}`];
                if (plural) {
                    value = formatMessage(plural, {value});

                } else if (key === 'gender') {
                    if (genders) {
                        const n = genders.find((n) => n.code === value);
                        if (n) {
                            value = n.label;
                        }
                    }
                } else if (key === 'nationality') {
                    if (nationalities) {
                        const n = nationalities.find((n) => n.code === value);
                        if (n) {
                            value = n.label;
                        }
                    }
                } else if (key === 'idType') {
                    if (documentTypes) {
                        const n = documentTypes.find((n) => n.code === value);
                        if (n) {
                            value = n.label;
                        }
                    }
                }

                return <tr key={key}>
                    <th>{formatMessage(msg)}</th>
                    <td>{value}</td>
                </tr>
            });
        }


        return (<Modal show={show} onHide={this.handleClose} bsSize="large"
                       className={classNames(classes)}
                       aria-labelledby="qr-modal-title-lg">
            <Modal.Header>
                <Button className="qr-modal-header-button" onClick={this.handleClose} ref="close">
                    <i className="fa fa-close"/>
                </Button>

                <Modal.Title id="qr-modal-title-lg">
                    {formatMessage(messages.modalTitle)}
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                {!status &&
                <SmallProgressLoader className='loading-circle qr-image'>
                    <div className='qr-message'>
                        {formatMessage(messages.waitForQR)}
                    </div>
                    <img src='img/AriadNEXT/passport.svg'/>
                </SmallProgressLoader>
                }
                {status === 'CREATED' && ocrConfig.hideQRCode && [
                    <div className='qr-message' key='message'>
                        {formatMessage(messages.readQRCodeWithSMS2)}
                    </div>,
                    <div className='mobile-logo' key='logo'>
                        <img className='created-logo' src='img/AriadNEXT/ID.svg'/>
                    </div>
                ]}
                {status === 'CREATED' && !ocrConfig.hideQRCode && [
                    <div className='qr-message' key='message'>
                        {!waitingSMS && formatMessage(messages.readQRCodeWithMobile)}
                        {waitingSMS && formatMessage(messages.readQRCodeWithSMS)}
                    </div>,

                    <div className='qr-code' key='code'>
                        {url &&
                        <QRCode value={url} size={256}/>}
                    </div>,

                    <div className='qr-url' key='url'>
                        <a href={url} target='_blank'>{formatMessage(messages.clickHere)}</a>
                    </div>,
                ]}
                {status === 'CLICKED' &&
                <SmallProgressLoader className='loading-circle qr-image'>
                    <div className='qr-message'>
                        {formatMessage(messages.waitForScan)}
                    </div>
                    <img src='img/AriadNEXT/ID.svg'/>
                </SmallProgressLoader>
                }
                {status === 'CAPTURE_ONGOING' &&
                <SmallProgressLoader className='loading-circle qr-image'>
                    <img src='img/AriadNEXT/IDVerso.svg'/>
                    <div className='qr-message'>
                        {formatMessage(messages.captureOngoing)}
                    </div>
                </SmallProgressLoader>
                }
                {status === 'SUCCESS' &&
                <SmallProgressLoader className='loading-circle qr-image'>
                    <img src='img/AriadNEXT/success.png'/>
                    <div className='qr-message'>
                        {formatMessage(messages.success)}
                    </div>
                </SmallProgressLoader>
                }
                {status === 'USER' &&
                <div className='informations'>
                    <table className='table'>
                        <col className='key-column'/>
                        <col className='value-column'/>
                        <tbody>
                        {trs}
                        </tbody>
                    </table>
                </div>
                }
                {status === 'MOBILE' &&
                <Form className='mobile' onSubmit={handleSubmit(this.handleMobileSubmit)}>
                    <div className='mobile-inputs'>
                        <Field name='mobilePhone'
                               title={formatMessage(messages.mobileMessage)}
                               component={TextEntry}
                               disabled={waitingSMS}
                               validate={this.validMobilePhone}
                               normalize={normalizePhone}
                        />
                    </div>
                    <div className='mobile-logo'>
                        <img src='img/AriadNEXT/ID.svg'/>
                    </div>
                </Form>
                }

            </Modal.Body>
            <Modal.Footer>
                {loadingPdf && <Button key='loadingPdf' bsStyle='default' disabled={true}>
                    <i className={"fa fa-circle-o-notch fa-spin fa-1x fa-fw"}/>
                    {formatMessage(messages.loadingPdf)}
                </Button>}
                {pdfContent &&
                <Button key='showPdf' bsStyle='default' onClick={this.handleShowPdf}>
                    {formatMessage(messages.showPdf)}
                </Button>}
                {pdfContent &&
                <Button key='downloadPdf' bsStyle='default' onClick={this.handleDownloadPdf}>
                    {formatMessage(messages.downloadPdf)}
                </Button>}
                {informations && <Button key='validate' bsStyle='primary' onClick={this.handleValidate}
                                         disabled={loadingDocuments || loadingPdf || isReportOnError}>

                    {(loadingDocuments || loadingPdf) && <i className={"fa fa-circle-o-notch fa-spin fa-1x fa-fw"}/>}
                    {formatMessage(messages.valid)}
                </Button>}
                {status === 'MOBILE' &&
                <Button key='mobile' bsStyle='default' onClick={this.handleMobileOk}
                        disabled={waitingSMS || submitting || invalid}>
                    {formatMessage(messages.mobileButton)}
                </Button>}
                <Button key='close' bsStyle='default' onClick={this.handleClose}>
                    {formatMessage(messages.close)}
                </Button>
            </Modal.Footer>
        </Modal>);
    }
}

function normalizeParam(param) {
    return param.replace(/\-/g, '@');
}

function mapStateToProps(state, props) {
    const {authentication: {skinClass, user: {locale}, options}} = state;
    const {mobilePhone} = props;

    const telephoneFormat = options.telephoneFormat || '';
    const hasMSSaveOrOpenBlob = !!(window.navigator && window.navigator.msSaveOrOpenBlob);

    return {
        initialValues: {
            mobilePhone
        },

        skinClass,
        locale,
        hasMSSaveOrOpenBlob,
        nationalities: getReferenceTable(state, tables.LANTUSPARAM, {tusnom: 'NATIONALITY'}).data,
        documentTypes: getReferenceTable(state, tables.LANTUSPARAM, {tusnom: 'DOCIDTYPE'}).data,
        genders: getReferenceTable(state, tables.LANTTRPARAM, {ttrnom: 'GENDER'}).data,
        //genders: GENDER_TYPES,  // Empty table :-(
        telephoneFormat
    };
}

UploadModal = reduxForm({
    form: ARIADNEXT_FORM,
    enableReinitialize: true,
})(UploadModal);

export default connect(mapStateToProps)(injectIntl(UploadModal));
