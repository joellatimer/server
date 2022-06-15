
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const groupRoutes = require('./routes/groupRoutes')
const memberRoutes = require('./routes/memberRoutes')
const meetingRoutes = require('./routes/meetingRoutes')
const groupMemberRoutes = require('./routes/groupMemberRoutes')
const attendsRoutes = require('./routes/attendsRoutes')
const req = require('express/lib/request')
const res = require('express/lib/response')



    
        
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
})
app.use(morgan('dev'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/groups', groupRoutes)
app.use('/members', memberRoutes)
app.use('/groupMembers', groupMemberRoutes)
app.use('/meetings',meetingRoutes)
app.use('/attends',attendsRoutes)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'))
    app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'))
}





module.exports = app
