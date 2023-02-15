
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const response = require('../middlewares/response')
exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    console.log(body);
    body.activationKey = activationKey
    const user = new User(body)
    const savedUser = await user.save()
    return response.successResponseWithData(res, 'success', { message: 'OK', data: savedUser.transform() })
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return response.successResponseWithData(res, 'sucess', { message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )
    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}
exports.user = async (req, res, next) => {
  try {
    User.find().exec((err, data)=>{
      if(err) return next(err)
      return response.successResponseWithData(res, 'sucess', data)
    })
  } catch (error) {
    next(error)
  }
}
