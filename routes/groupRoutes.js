const express = require('express')
const groupControllers = require('../controllers/groupControllers')
const router = express.Router()

router
  .post('/register', groupControllers.register)
  
  .post('/login', groupControllers.login)
  .delete('/:id', groupControllers.destroy)
  .get('/', groupControllers.showAll)
  .put('/:id', groupControllers.changePassword)

module.exports = router