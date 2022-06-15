const express = require('express')
const groupMemberControllers = require('../controllers/groupMemberControllers')
const checkAut = require('../middleWare/checkAuth')

const router = express.Router()

router.get('/:groupId', groupMemberControllers.showGroupMembers)
 
module.exports = router