'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')
const encrypt = require('../../middlewares/encrypt');

router.post('/register', encrypt.decrypt,   validator(create), authController.register) // validate and register
router.post('/login', encrypt.decrypt, authController.login) // login
router.get('/confirm', encrypt.decrypt, authController.confirm)

// Authentication example
router.get('/user',  auth(), authController.user)
router.get('/secret2', auth(['admin']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only user can access' })
})

module.exports = router
