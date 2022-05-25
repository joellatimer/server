
const db = require('../database')
const Validator = require('fastest-validator')

function save(req, res){
    const meetings = {
        dateMeeting: req.body.dateMeeting,
        typeMeeting: req.body.typeMeeting,
        groupId: req.body.groupId
    }
    const schema = {
        dateMeeting:{type:"string", optional: false,  max:"50"},
        typeMeeting:{type:"string", optional: true, max:"50"},
        groupId:{type:"number", optional:false}

    }
    const v = new Validator()
    const validationResponse = v.validate(meetings, schema)
    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors: validationResponse
        })
    }
    db.run(`INSERT INTO meetings (dateMeeting, typeMeeting, groupId) VALUES (?,?,?)`,
    [req.body.dateMeeting, req.body.typeMeeting, req.body.groupId],
    function (err, result) {
        if (err){
            res.status(400).json({
                "error": err.message
            })
        }
        res.status(201).json ({
            meetings:meetings
        })
    })
   
   db.run(`INSERT INTO Attends(firstName, lastName, meetingId)  SELECT members.firstName, members.lastName, meetings.id FROM meetings LEFT OUTER JOIN members ON meetings.groupId = members.groupid WHERE meetings.id = (Select id FROM meetings WHERE id = (SELECT max(id) FROM meetings))`)
}

function showAll(req, res){
    db.all(`SELECT * FROM meetings`, [], (err, results) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({
            meetings:results
        })
    })
}

function showAllByGroup(req, res){
    console.log(req.params.idd)
    db.all(`SELECT * FROM meetings WHERE groupId = ?`, [req.params.id], (err, results) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({
            meetings:results
        })
    })
}

function destroy(req, res){
    console.log(req.params.id)
    db.run(`DELETE FROM meetings WHERE id = ?`, [req.params.id],
    function (err, result){
        if (err){
            res.status(400).json({"error":res.message})
            return
        }
        res.status(200).json({
            message:"Success"
        })
    })
}

module.exports ={
    save:save,
    showAllByGroup:showAllByGroup,
    destroy:destroy,
    showAll:showAll
}