const config = require('../config/index');
const cryptLib = require('@skavinvarnan/cryptlib');
const decrypt = (req, res, next)=> {
  let data = req.rawBody;
  let decryptChiper;
  if(data){
    decryptChiper = cryptLib.decryptCipherTextWithRandomIV(data, config.public_key);
    var buf = Buffer.from(decryptChiper, 'base64');
    req.body = JSON.parse(buf);
  }
  next();
}
module.exports ={
  decrypt:decrypt
}
