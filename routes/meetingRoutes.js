const express = require('express')
const meetingControllers = require('../controllers/meetingControllers')
const checkAuthMiddleware = require('../middleware/checkAuth')

const router = express.Router()

router
    .post('/', meetingControllers.save)
    .get('/:id', meetingControllers.showAllByGroup)
    .get('/', meetingControllers.showAll)
    .delete('/:id', meetingControllers.destroy)
 

module.exports = router