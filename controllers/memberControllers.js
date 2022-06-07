const db = require('../database')
const Validator = require('fastest-validator')


function save(req, res){
    const member = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateJoined: req.body.dateJoined,
        groupId: req.body.groupId
    }
    const schema = {
        firstName:{type:"string", optional: false,  max:"100"},
        lastName:{type:"string", optional: false,  max:"100"},
        dateJoined:{type:"string", optional: false, max:"12"},
        groupId:{type:"number", optional:false}

    }
    const v = new Validator()
    const validationResponse = v.validate(member, schema)
    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors: validationResponse
        })
    }
    db.run(`INSERT INTO members (firstName, lastName, dateJoined, groupId) VALUES (?,?,?,?)`,
    [req.body.firstName, req.body.lastName, req.body.dateJoined, req.body.groupId],
    function (err, result) {
        if (err){
            res.status(400)
            .json({
               " error": err.message
                
            })
            return
        }
        res.status(201).json ({
            member:member
        })
    })
}


function showAll(req, res){
    db.all(`SELECT * FROM members ORDER BY lastName`, [], (err,members) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({members})
    })
}

function showOne(req, res){
    const params = [req.params.id]
    console.log(params)
    db.get(`SELECT * FROM members WHERE id = ?`, [params], (err, row) => {
        if(err){
            res.status(400).json({
                "error":err.message
            })
            return
        }
        res.status(200).json({row})
        
           
    })
}

function update(req, res){
    const member = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateJoined: req.body.dateJoined,
        groupId: req.body.groupId
    }
    const schema = {
        firstName:{type:"string", optional: true,  max:"100"},
        lastName:{type:"string", optional: true,  max:"100"},
        dateJoined:{type:"string", optional: true, max:"12"}

    }
    const v = new Validator()
    const validationResponse = v.validate(member, schema)
    if(validationResponse !== true){
        return res.status(400).json({
            message:"Validation failed",
            errors: validationResponse
        })
    }
    db.run
    (
        `UPDATE members 
        SET firstName = ?, lastName = ?, dateJoined = ?, groupId = ? 
        WHERE members.id = ?`,
        [req.body.firstName, req.body.lastName, req.body.dateJoined,req.body.groupId, req.params.id],
        function (err, result) {
            if(err){
                res.status(400).json({
                    "eror": res.message
                })
            return
            }
            res.status(200).json({
                updatedID:this.changes
            })
        }
    )
}

function destroy(req, res){
    console.log(req.params.id)
    db.run(`DELETE FROM members WHERE id = ?`, [req.params.id],
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

module.exports = {
    save:save,
    showOne:showOne,
    update:update,
    destroy:destroy,
    showAll:showAll
}