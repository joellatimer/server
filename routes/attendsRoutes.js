const db = require('../database')
const attendsControllers = require('../controllers/attendsControllers')
const checkAuth = require('../middleWare/checkAuth')
const express = require('express')
const router = express.Router()

router
    .get('/:meetingId', attendsControllers.showAttendsByMeeting)
    .patch('/', attendsControllers.update)
   
    
 

module.exports = router