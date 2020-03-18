import {fetchReferenceTable} from 'cassiopae-core';

/**
 * Reference tables enum
 *
 * @readonly
 * @enum {string}
 */
export const tables = {
    LANJALON: 'lanjalon',
    LANJALONPOS: 'lanjalonpos',
    COLORJALON: 'colorjalon',
    LANNAP: 'lannap',
    LANASSETCATEGORY: 'lanassetcategory',
    LANTUSPARAM: 'lantusparam',
    LANTTRPARAM: 'lanttrparam',
    TPROFILGESTION: 'tprofilgestion',
    CODEPOSTAL: 'codepostal',
    LANPHASE: 'lanphase',
    LANMAKE: 'lanmake',
    LANMAKEMODEL: 'lanmakmodel',
    LANMAKMODTRIMLEVEL: 'lanmakmodtrimlevel',
    FINANCIALSCALE: 'financialscale',
    CREDITLINE: 'creditline',
    SIRET: 'siret',
    AVTPRESTATION: 'LANAVTPRESTATION',
    TCOMMISSION: 'LANTCOMMISSION',
    LANVARIANT: 'lanvariant',
    LKTUPTACTPG: 'lktuptactpg',
    CATJURIDIQUE: 'catjuridique',
    TCRTRELATIONASC: 'tcrtrelationasc',
    PAYS: 'pays',
    LANDASHBOARD: 'LANDASHBOARD',
    VENDORS: 'VENDORS',
    LANNAF: 'LANNAF',
    CURRENCY: 'SYBDEVISE',
    LANTAXE: 'LANTAXE',
    LANPRICINGCRITERIA: 'lanpricingcriteria',
    UTIACTDEFAULT: 'utiactdefault',
    COMPANY: 'COMPANY',
    BUISNESS_TYPE: 'BUISNESSTYPE',
    PRODUCTS: 'PRODUCTS',
    CURRENCY_FOR_PRODUCT: 'CURRENCY',
    DEPARTMENTS: 'DEPARTMENTS',
    LANPROFITABILITYCRITERION: 'lanprofitabilitycriterion',
    RELATIONVALEURPROFIL: 'RELATIONVALEURPROFIL',
    PROPOSITIONFINANCIERE: 'PROPOSITIONFINANCIERE',
    LANFORMULE: 'LANFORMULE',
    TMINMAXDURATION: 'TMINMAXDURATION',
    FREQUENCY: 'FREQUENCY',
    MILEAGE: 'MILEAGE',
    ACTORTYPE: 'ACTORTYPE',
    LANTMOYENPMT: 'LANTMOYENPMT',
    RIB: 'RIB',
    GROUPE: 'GROUPE',
    MYGROUPS: 'MYGROUPS',
    MYBRANDS: 'MYBRANDS',
    LANTPROFILGESTION: 'LANTPROFILGESTION',
    ICONJALAUDIT: 'ICONJALAUDIT',
    LOCALS: 'LOCALS',
    AJHEMPSECTOR: 'AJHEMPSECTOR',
    AFDWAGEPERIOD: 'AFDWAGEPERIOD',
    LANTRELATION: 'LANTRELATION',
    LANTWORKCATEGORY: 'LANTWORKCATEGORY'
};

export function initRefTables() {
    return (dispatch) => {
        dispatch(fetchReferenceTable(tables.LANJALON));
        dispatch(fetchReferenceTable(tables.LANMAKE));
        dispatch(fetchReferenceTable(tables.LANMAKEMODEL));
        dispatch(fetchReferenceTable(tables.LANMAKMODTRIMLEVEL));
        dispatch(fetchReferenceTable(tables.COLORJALON));
        dispatch(fetchReferenceTable(tables.LOCALS));
        dispatch(fetchReferenceTable(tables.LANPRICINGCRITERIA));
    };
}
