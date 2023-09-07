
require('dotenv').config({path: './environment-variables/.env'})

const express = require('express')
const cors = require('cors')

const database = require(__dirname + '/database.js')

const server = express()
server.use(cors())

const PORT = process.env.APIPORT || 3001

server.get('/api/thumbnails', async (req, res) => {
    const protagonist = req.query.of || null

    if(['baby', 'mom', 'dad'].indexOf(protagonist) >= 0){
        const result = await database.thumbnails(protagonist)
        console.log(result)
        res.json(result)
    }
    else{
        res.json(null)
    }
})

server.get('/api', async (req, res)=>{
    const result = await database.all()
    console.log(result)
    res.json(result)
})

server.listen(PORT, () => {
    console.log(`Server Is Listening on Port ${PORT}`)
})
