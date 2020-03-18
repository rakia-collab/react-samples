export const SHOW_TRIM_DETAIL = 'TRIM/SHOW_TRIM_DETAIL';

export function showTrimDetail(show){
    return {
        type: SHOW_TRIM_DETAIL,
        trimload: show
    };
}