const http = require('http')
const app = require('./app')
const db = require('./database')

require('dotenv').config()

const port = process.env.PORT || 3000


const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
 