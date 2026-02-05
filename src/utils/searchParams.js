export const urlParams = window.location.search
export const urlParamsFormatted = urlParams.includes('event_id') ? urlParams.replace('event_id=', '').replace('?', '') : ''
