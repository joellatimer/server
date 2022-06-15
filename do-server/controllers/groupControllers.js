
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const db = require('../database')

//TODO Disallow crash when erroneous groupname is sent
function register(req, res) {
   
    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
           db.run(`INSERT INTO groups (groupName, password)VALUES (?,?)`,
            [req.body.groupName, hash],
            function (err, result) {
                if (err){
                    res.status(400).json({
                        "error": err.message
                    })
                }
                res.status(201).json ({
                    "id": this.lastID
                })
            })
            
        }) 
    })  
}
    
// TODO setup jwt expirations


function login(req, res){
    const query = `SELECT * FROM groups WHERE groupName = ?`
    db.get(query, [req.body.groupName], (err, rows) => {
            if(rows === null){
                res.status(401).json({
                    message:"Invalid credentials"
                })
            } else 
            { groupId = rows.id
                bcryptjs.compare(
                    req.body.password, 
                    rows.password, 
                    function(err, rows){
                        if(rows){
                            const token = jwt.sign({
                                groupName: req.body.groupName,
                                exp:Math.floor(Date.now()/1000)+(60*60*24)
                                },'process.env.SECRET',
                                    function(err, token,rows){
                                        res.status(200).json({
                                            message: "Authentication successful",
                                            token:token,
                                            groupName: req.body.groupName,
                                            id: groupId
                                            
                                        })
                                    }
                                )
                        }else{
                           res.status(401).json({
                               message:"Invalid credentials"
                           }) 
                        }
                    }    
                )
             }
        }
    )   
        
}

function showAll(req, res){
    db.all(`SELECT groups.groupName FROM groups`, [], (err,rows) => {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({rows})
    })
}

function changePassword(req, res){
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(req.body.password, salt)
    const updatedPassword = hash
    
  

    const schema = {
        password:{type:"string", optional: false,  max:"100"},
    }
   
    // const v = new Validator()
    // const validationResponse = v.validate(updatedPassword, schema)
    // if(validationResponse !== true){
    //     return res.status(400).json({
    //         message:"Validation failed",
    //         errors: validationResponse
    //     })
    // }

    db.run
    (
        `UPDATE groups SET groupName=?, password=? WHERE groups.id = ?`,
        [req.body.groupName, updatedPassword, req.params.id],
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

function showOne(req, res){
    const params = [req.params.id]
    console.log(params)
    db.get(`SELECT groups.groupName FROM groups WHERE id = ?`, [params],
    (err, row) => {
        if(err){
            res.status(400).json({
                "error":err.message
            })
            return
        }
        res.status(200).json({row})
        
           
    })
}

function destroy(req, res){
    db.run(`DELETE FROM groups WHERE id = ?`, [req.params.id],
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
    register: register,
    login:login,
    destroy:destroy,
    showAll:showAll,
    showOne: showOne,
    changePassword:changePassword

}
