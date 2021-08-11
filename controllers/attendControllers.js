const db = require('../database')
const Validator = require('fastest-validator')

function showAll(req, res){
    db.all(`SELECT * FROM ATTENDS`, [], (err, attends) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({attends})
    })
}
function showAttendsByMeeting(req, res){
    console.log(req.params.id)
    db.all(`SELECT * FROM attends WHERE meetingId = ?`, [req.params.id], (err, results) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({
            attends:results
        })
    })
}


module.exports = {
    showAll:showAll,
    showAttendsByMeeting:showAttendsByMeeting
}