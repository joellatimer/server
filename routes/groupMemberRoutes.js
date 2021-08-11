const express = require('express')
const groupMemberControllers = require('../controllers/groupMemberControllers')
// const checkAuthMiddleware = require('../middleware/checkAuth')

const router = express.Router()

router.get('/:groupId', groupMemberControllers.showGroupMembers)
 
module.exports = router