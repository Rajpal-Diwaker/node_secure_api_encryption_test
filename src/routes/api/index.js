const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const config = require('../../config/index');
const cryptLib = require('@skavinvarnan/cryptlib');
router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status
router.use('/auth', authRouter) // mount auth paths

//encrypt cypher
router.post('/encrypt', (req, res) =>{
    let text = req.rawBody;
    let data = cryptLib.encryptPlainTextWithRandomIV(text, config.public_key);
    return res.json({data: data})
})

//decrypt cypher
router.post('/decrypt', (req, res) =>{
    let text = req.rawBody;
    data = cryptLib.decryptCipherTextWithRandomIV(text, config.public_key);
    return res.json({data: data })
})

//decrypt cypher with base64
router.post('/decryptWithBase', (req, res) =>{
  let data = req.rawBody;
  let decryptChiper;
  if(data){
    decryptChiper = cryptLib.decryptCipherTextWithRandomIV(data, config.public_key);
    var buf = Buffer.from(decryptChiper, 'base64');
    req.body = JSON.parse(buf);
  }
  return res.json(req.body)
})

//encrypt cypher with base64
router.post('/encryptWithBase', (req, res) =>{
  var buff = new Buffer(req.rawBody).toString("base64");
  let chipher = cryptLib.encryptPlainTextWithRandomIV(buff, config.public_key)
  return res.json(chipher)
})

//encrypt base64
router.post('/encryptBase64', (req, res)=>{
  var buff = new Buffer(req.rawBody).toString("base64");
  return res.send(buff);
})

//decrypt base64
router.post('/decryptBase64', (req, res)=>{
  var buf = Buffer.from(req.rawBody, 'base64');
  return res.send(buf);
})
module.exports = router
