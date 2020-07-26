const DEFAULT_ERROR_CODE = 'UNKWN'

const ERRORS = {
  [DEFAULT_ERROR_CODE]: 'Error Unknown',
  NO_DIR: 'Starting files directory is missing',
  NO_FILE: 'The file requested is missing',
  ENOENT: 'No such file or directory',
  ORDER_ITEMS_LENGTH: 'The length of the items in the order is wrong'
}

const makeError = (errorCode = DEFAULT_ERROR_CODE, details) => {
  const defaultError = ERRORS[DEFAULT_ERROR_CODE]
  const expectedError = ERRORS[errorCode]

  const _errorCode = expectedError ? errorCode : DEFAULT_ERROR_CODE
  const _error = expectedError || defaultError
  const _details = details && typeof details === 'string' ? `: ${details}` : ''

  const error = new Error(`[${_errorCode}] ${_error}${_details}`)
  error.code = _errorCode

  return error
}

module.exports = {
  DEFAULT_ERROR_CODE,
  ERRORS,
  makeError
}
