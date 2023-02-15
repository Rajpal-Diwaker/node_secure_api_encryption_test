const config = require('../config/index');
const cryptLib = require('@skavinvarnan/cryptlib');
exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: 200,
		message: msg,
		data: data
	};
  var buff = new Buffer(JSON.stringify(resData)).toString("base64");
  let chipher = cryptLib.encryptPlainTextWithRandomIV(buff, config.public_key)
	return res.status(200).json(chipher);
};
exports.errorResponseWithData = function (res, msg, data) {
	var resData = {
		status: 200,
		message: msg,
		data: data
	};
  var buff = new Buffer(JSON.stringify(resData)).toString("base64");
  let chipher = cryptLib.encryptPlainTextWithRandomIV(buff, config.public_key)
	return res.status(200).json(chipher);
};
