const response = require('./response');
const httpStatus = require('http-status')

// hanlde not found error
exports.handleNotFound = (req, res, next) => {
  return response.errorResponseWithData(res,'Requested resource not found',{
    'message': 'Requested resource not found'})
}

// handle errors
exports.handleError = (err, req, res, next) => {
  return response.errorResponseWithData(res, err.message,{
    message: err.message,
    extra: err.extra,
    errors: err
  })
}
