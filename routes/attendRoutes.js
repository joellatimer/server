const express = require('express')
const attendControllers = require('../controllers/attendControllers')
// const checkAuthMiddleware = require('../middleware/checkAuth')

const router = express.Router()

router
    .get('/',  attendControllers.showAll)
    .get('/:id', attendControllers.showAttendsByMeeting)
   
    
 

module.exports = router