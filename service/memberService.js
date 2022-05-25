const db = require('../database')




async function showAll () {
    try {
        const response = await new Promise((resolve, reject)=>{
             const query = "SELECT * FROM members"
            db.all(query, (err, results)=>{
            if(err) reject(new Error(err.message))
            resolve(results)
        })
        
        })
        console.log(response)
        return response
       
    } catch (error) {
        console.log(error)
    }
  
}

module.exports = memberServices