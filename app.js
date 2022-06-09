
const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')
const app = express()
const groupRoutes = require('./routes/groupRoutes')
const memberRoutes = require('./routes/memberRoutes')
const meetingRoutes = require('./routes/meetingRoutes')
const groupMemberRoutes = require('./routes/groupMemberRoutes')
const attendsRoutes = require('./routes/attendsRoutes')

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
//     next();
// })
app.use(morgan('dev'))

app.use(express.urlencoded())
app.use(express.json())



app.use('/groups', groupRoutes)
app.use('/members', memberRoutes)
app.use('/groupMembers', groupMemberRoutes)
app.use('/meetings',meetingRoutes)
app.use('/attends',attendsRoutes)






module.exports = a
