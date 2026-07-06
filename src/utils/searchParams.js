const getSearchParams = () => {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

export const getUrlParam = (paramName) => {
  return getSearchParams().get(paramName) || ''
}

export const urlParams = window.location.search
export const urlParamsFormatted = getUrlParam('event_id')
