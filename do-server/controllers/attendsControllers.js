const db = require('../database')
const Validator = require('fastest-validator')

function showAttendsByMeeting(req, res){
    db.all(`SELECT * FROM attends WHERE meetingId = ? ORDER BY lastName`, [req.params.meetingId], (err, row) => {
        if(err){
             res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json(row)
     })
    
}

function update(req, res){
    const attends = {
        id: req.body.id,
        present: req.body.present,
        meetingId: req.body.meetingId
    }    
    const schema = {
        id: {type:"number", optional:true, max:"100"},
        present:{type:"number", optional: true,  max:"2"},
        meetingId:{type:"number", optional:true, max:"100"}
    }
    const v = new Validator()
    const validationResponse = v.validate(attends, schema)
    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors: validationResponse
        })
    }
    

    db.run (
        `UPDATE attends 
        SET present = ? WHERE id = ? AND meetingId = ?`,
        [req.body.present, req.body.id, req.body.meetingId] , 
        function (err, result) {
            if(err){
                res.status(400).json({
                    "eror": res.message
                })
            return
            }
            res.status(200).json({
                updatedPresent:this.changes
            })
        }
    
    )
}

  

module.exports = {
    showAttendsByMeeting: showAttendsByMeeting,
    update: update
}