const express = require('express')
const groupControllers = require('../controllers/groupControllers')
const checkAuth = require('../middleWare/checkAuth')
const router = express.Router()

router
  .post('/register', groupControllers.register)
  .get('/:id', groupControllers.showOne)
  .post('/login', groupControllers.login)
  .delete('/:id', groupControllers.destroy)
  .get('/', groupControllers.showAll)
  .patch('/:id', groupControllers.changePassword)

module.exports = router