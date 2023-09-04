const { Schema } = require('mongoose')

require('dotenv').config({path: './environment-variables/.env'})

const express = require('express')
const server = express()

const database = require(__dirname + '/database.js')

const PORT = process.env.PORT || 3001

server.get('/api', async (req, res)=>{
    res.send(await database.all())
})

server.listen(PORT, () => {
    console.log(`Server Is Listening on Port ${PORT}`)
})
