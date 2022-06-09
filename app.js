
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const groupRoutes = require('./routes/groupRoutes')
const memberRoutes = require('./routes/memberRoutes')
const meetingRoutes = require('./routes/meetingRoutes')
const groupMemberRoutes = require('./routes/groupMemberRoutes')
const attendsRoutes = require('./routes/attendsRoutes')


app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers','Origin ,X-Requested-With,Content-Type, Access,Authorization'
    );

    if(req.Method==='OPTIONS'){
        req.header('Access-Control-Allow-Methods','POST,PUT,PUSH,PATCH,DELETE,GET');
        return res.status(200).json({})
    }

    next()
})
app.use(morgan('dev'))

app.use(express.urlencoded())
app.use(express.json())



app.use('/groups', groupRoutes)
app.use('/members', memberRoutes)
app.use('/groupMembers', groupMemberRoutes)
app.use('/meetings',meetingRoutes)
app.use('/attends',attendsRoutes)






module.exports = a
