
require('dotenv').config({path: './environment-variables/.env'})

const { Schema } = require('mongoose')

const express = require('express')
const cors = require('cors')

const database = require(__dirname + '/database.js')

const server = express()
server.use(cors())

const PORT = process.env.APIPORT || 3001

server.get('/api', async (req, res)=>{
    res.json(await database.all())
})

server.listen(PORT, () => {
    console.log(`Server Is Listening on Port ${PORT}`)
})
