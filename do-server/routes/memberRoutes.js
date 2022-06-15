const express = require('express')
const memberControllers = require('../controllers/memberControllers')
const checkAuth = require('../middleWare/checkAuth')

const router = express.Router()

router
    .post('/', memberControllers.save)
    .get('/:id', memberControllers.showOne)
    .get('/',  memberControllers.showAll)
    .patch('/:id',   memberControllers.update)
    .delete('/:id', memberControllers.destroy)
 

module.exports = router