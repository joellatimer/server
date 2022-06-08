
const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')
const app = express()
const groupRoutes = require('./routes/groupRoutes')
const memberRoutes = require('./routes/memberRoutes')
const meetingRoutes = require('./routes/meetingRoutes')
const groupMemberRoutes = require('./routes/groupMemberRoutes')
const attendsRoutes = require('./routes/attendsRoutes')

// app.use(cors())
app.use(morgan('dev'))

// app.use(express.urlencoded())
app.use(express.json())



app.use('/groups', groupRoutes)
app.use('/members', memberRoutes)
app.use('/groupMembers', groupMemberRoutes)
app.use('/meetings',meetingRoutes)
app.use('/attends',attendsRoutes)






module.exports = app

