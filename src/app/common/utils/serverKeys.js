// CUSTOMER ROLES
export const CLIENT = 'CLIENT';
export const EMPRUNT = 'EMPRUNT';
export const BORROWER = EMPRUNT;
export const ACTIVE = 'ACTIVE';
export const LIST_OF_CUSTOMER_ROLES = [CLIENT, EMPRUNT];

// CO-CUSTOMER ROLES
export const COBORROWER = 'COEMPRU';
export const COCLIEN = 'COCLIEN';
export const LIST_OF_COCUSTOMER_ROLES = [COBORROWER, COCLIEN];

export const CO_ACTORS_MAPPING = {
    [CLIENT]: COCLIEN,
    [EMPRUNT]: COBORROWER,
};

// GARANTOR
export const GARANT = 'GARANT';

// CUSTOMER TYPE
export const LIST_OF_CORPORATE_TYPES = ["PM", "PM1", "PM2", "PM3", "COMP", "EI", "BPART"];
export const LIST_OF_INDIVIDUAL_TYPES = ['PART'];

// CRITERIA FOR DOCUMENTMANAGEMENT
/**
 * @enum {string} FilterCriteriaEnum
 */
export const FilterCriteria = {
    ALL: 'GLOBAL',
    ACTEUR: 'DLDOC',
    FACACT: 'DLINV',
    BRAND: 'BRANDDOC',
};

// TELECOMS
export const TELECOM_ATETYPE_TEL = 'TEL';
export const TELECOM_ATETYPE_TELMOB = 'TELMOB';
export const TELECOM_ATETYPE_TELMOB1 = 'TELMOB1';
export const TELECOM_ATETYPE_TELMOB2 = 'TELMOB2';
export const TELECOM_ATETYPE_MOB = 'MOB';
export const TELECOM_ATETYPE_EMAIL = 'NET';
export const TELECOM_ATETYPE_FAX = 'FAX';
export const TELECOM_ATETYPE_WEBSITE = 'SITE';


// TELECOM TYPE LIST
export const TELECOM_ATETYPE_LIST = [
    TELECOM_ATETYPE_TEL,
    TELECOM_ATETYPE_TELMOB,
    TELECOM_ATETYPE_MOB,
    TELECOM_ATETYPE_EMAIL,
    TELECOM_ATETYPE_FAX,
    TELECOM_ATETYPE_WEBSITE
];

// ADDRESSES
export const ADDRESS_AADTYPE_HOME = '1';
export const ADDRESS_AADTYPE_COMPANY = '2';
export const ADDRESS_AADTYPE_IDCARD = '4';
export const ADDRESS_AADTYPE_OTHER = '99';

// ID DOCUMENTS
export const IDDOCUMENT_AIDTYPE_IDCARD = 'CARDI';


// COUNTRY CODE
export const COUNTRY_CODE_CHINA = 'CN';
export const COUNTRY_CODE_SPAIN = 'ES';

// CONTACTS
export const CONTACT_ACOQUALITE_COMPANY = 'COMP';
export const CONTACT_ACOQUALITE_SELF = 'SELF';

// GENDER
export const FEMALE = 2;
export const MALE = 1;

// CONFIGURATION KEYS
export const DNI_NIF_KEY = 'DNI_NIF';
export const NIE_KEY = 'NIE';

export const PHONE_NUMBER_TYPES = {
    [TELECOM_ATETYPE_TELMOB]: 'MOBILE',
    [TELECOM_ATETYPE_MOB]: 'MOBILE',
    [TELECOM_ATETYPE_TEL]: 'FIXED_LINE',
};

//
/**
 * WHOLESALE DRAW ACTIONS
 *
 * @enum {string} WholeSaleActions
 */
export const Actions = {
    CONVERT: 'CONVERT',
    DOCUMENTS: 'DOCUMENTS',
    SETTLE: 'SETTLE',
    PARTIAL_SETTLE: 'PARTIAL_SETTLE',
    ACTIVATION: 'ACTIVATION',
    CANCEL: 'CANCEL',
    EVENT: 'EVENT',
    DEFAULT: 'DEFAULT',
};

export const Tmffonction = {
    CANCEL: 'CANCEL',
    EVD_MEL: 'EVD_MEL',
    EVD_VENTE: 'EVD_VENTE',
    EVD_PART: 'PARTIAL_SETTLE',
};

export const Phacode = {
    INITIAL: 'INI',
    EN_SERVICE: 'ES',
};

// RESPONSE STATUS
export const cassiopaeWSResponseStatus = {
    PROCEED_SUCCESS: 'OK',
    PROCEED_FAILED: 'KO_ERROR',
};
