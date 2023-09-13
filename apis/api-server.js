
require('dotenv').config({__dirname: '/environment-variables/.env'})

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { deleteBlog } = require('./database')

const database = require(__dirname + '/database.js')

const server = express()
server.use(express.static('public'))
server.use(cors())
server.use(bodyParser.urlencoded({
    extended: true
}))
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))

const PORT = process.env.APIPORT || 3001

function queryStringGenerator(obj){
    const keys = Object.keys(obj)
    var query = '?'

    keys.forEach(key => {
        if(query === '?'){
            query = `${query}${key}=${obj[key]}`
        }
        else{
            query = `${query}&${key}=${obj[key]}`
        }
    })
    
    return query
}

server.get('/api/thumbnails', async (req, res) => {
    const protagonist = req.query.of || null

    if(['baby', 'mom', 'dad'].indexOf(protagonist) >= 0){
        const result = await database.thumbnails(protagonist)
        // console.log(result)
        res.json(result)
    }
    else{
        res.json(null)
    }
})

server.get('/api/blog', async (req, res) => {
    const _id = req.query._id || null

    if(_id){
        const result = await database.blog(_id)
        // console.log(result)
        res.json(result)
    }
    else{
        res.json(null)
    }
})

server.get('/api', async (req, res)=>{
    const result = await database.all()
    // console.log(result)
    res.json(result)
})

server.get('/new', async ( req, res ) => {
    if(['baby', 'mom', 'dad'].includes(req.query.protagonist)){
        res.render('password', {
            query: `?action=new&protagonist=${req.query.protagonist}`, 
            warning: false
        })
    }
    else{
        res.redirect('*')
    }
})

server.get('/edit', async (req, res) => {
    if(await database.idExists(req.query._id)){
        res.render('password', {
            query: `?action=edit&_id=${req.query._id}`,
            warning: false
        })
    }
    else{
        res.redirect('*')
    }
})

server.get('/delete', async ( req, res ) => {
    if(await database.idExists(req.query._id)){
        res.render('password', {
            query: `?action=delete&_id=${req.query._id}`,
            warning: false
        })
    }
    else{
        res.redirect('*')
    }
})

server.post('/authenticate', async (req, res) => {
    if(await database.checkPassword(req.body.password)){
        if(req.query.action === 'new'){
            const _id = await database.newBlog(req.query.protagonist)
            if(_id){
                res.redirect(`/edit?_id=${_id}`)
            }
            else{
                res.redirect('*')
            }
        }
        else if(req.query.action === 'delete'){
            const _id = req.query._id
            const blog = await database.blog(_id)
            const images = [blog.thumbnailImg]
            const videos = []
            blog.content.forEach(({image, video}) => {
                if(image) {images.push(image)}
                if(video) {videos.push(video)}
            });
            const deleteMedia = require(path.join(__dirname, 'deleteMedia.js'))
            deleteMedia.deleteImages(images)
            deleteMedia.deleteVideos(videos)
            console.log(await database.deleteBlog(_id))
            res.send('done')
        }
        else if(req.query.action === 'edit'){
            res.render('edit', {
                query: `?_id=${req.query._id}`
            })
        }
        else{
            res.redirect('*')
        }
    }
    else{
        res.render('password', {
            query: queryStringGenerator(req.query),
            warning: true
        })
    }
})

server.post('/edit', (req, res) => {
    res.send(`${req.query._id} is edited`)
})

server.all('*', (req, res) => {
    res.status(404).redirect('https://httpstatusdogs.com/404-not-found');
});

server.listen(PORT, () => {
    console.log(`Server Is Listening on Port ${PORT}`)
})
