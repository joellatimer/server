
const db = require('../database')



function showGroupMembers(req, res){
    db.all(`SELECT * FROM members  WHERE groupId = ? ORDER BY lastName, firstName`, 
    req.params.groupId, 
    function (err, members) {
        if(err){
            res.status(400).json({
                "error": err.message
            })
            return
        }
        res.status(200).json({members})
    })
}

module.exports = {
    showGroupMembers:showGroupMembers
}