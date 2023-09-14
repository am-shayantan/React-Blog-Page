
require(`dotenv`).config({__dirname: `/environment-variables/.env`})

const express = require(`express`)
const cors = require(`cors`)
const fileUpload = require(`express-fileupload`)
const bodyParser = require(`body-parser`)
const path = require(`path`)
const { deleteBlog } = require(`./database`)

const database = require(__dirname + `/database.js`)
const deleteMedia = require(path.join(__dirname, `deleteMedia.js`))
const saveMedia = require(path.join(__dirname, `saveMedia.js`))

const server = express()
server.use(express.static(`public`))
server.use(cors())
server.use(fileUpload())
server.use(bodyParser.urlencoded({
    extended: true
}))
server.set(`view engine`, `ejs`)
server.set(`views`, path.join(__dirname, `views`))

const PORT = process.env.APIPORT || 3001

function queryStringGenerator(obj){
    const keys = Object.keys(obj)
    var query = `?`

    keys.forEach(key => {
        if(query === `?`){
            query = `${query}${key}=${obj[key]}`
        }
        else{
            query = `${query}&${key}=${obj[key]}`
        }
    })
    
    return query
}

server.get(`/api/thumbnails`, async (req, res) => {
    const protagonist = req.query.of || null

    if([`baby`, `mom`, `dad`].indexOf(protagonist) >= 0){
        const result = await database.thumbnails(protagonist)
        // console.log(result)
        res.json(result)
    }
    else{
        res.json(null)
    }
})

server.get(`/api/blog`, async (req, res) => {
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

server.get(`/api`, async (req, res)=>{
    const result = await database.all()
    // console.log(result)
    res.json(result)
})

server.get(`/new`, async ( req, res ) => {
    if([`baby`, `mom`, `dad`].includes(req.query.protagonist)){
        res.render(`password`, {
            query: `?action=new&protagonist=${req.query.protagonist}`, 
            warning: false
        })
    }
    else{
        res.redirect(`*`)
    }
})

server.get(`/edit`, async (req, res) => {
    if(await database.idExists(req.query._id)){
        res.render(`password`, {
            query: `?action=edit&_id=${req.query._id}`,
            warning: false
        })
    }
    else{
        res.redirect(`*`)
    }
})

server.get(`/delete`, async ( req, res ) => {
    if(await database.idExists(req.query._id)){
        res.render(`password`, {
            query: `?action=delete&_id=${req.query._id}`,
            warning: false
        })
    }
    else{
        res.redirect(`*`)
    }
})

server.post(`/authenticate`, async (req, res) => {
    if(await database.checkPassword(req.body.password)){
        if(req.query.action === `new`){
            const _id = await database.newBlog(req.query.protagonist)
            if(_id){
                res.redirect(`/edit?_id=${_id}`)
            }
            else{
                res.redirect(`*`)
            }
        }

        else if(req.query.action === `delete`){
            const _id = req.query._id
            const blog = await database.blog(_id)
            const images = [blog.thumbnailImg]
            const videos = []
            blog.content.forEach(({image, video}) => {
                if(image) {images.push(image)}
                if(video) {videos.push(video)}
            });
            deleteMedia.deleteImages(images)
            deleteMedia.deleteVideos(videos)
            console.log(await database.deleteBlog(_id))
            res.send(`done`)
        }
        else if(req.query.action === `edit`){
            res.render(`edit`, {
                query: `?_id=${req.query._id}`,
                blog: await database.blog(req.query._id)
            })
        }
        else{
            res.redirect(`*`)
        }
    }
    else{
        res.render(`password`, {
            query: queryStringGenerator(req.query),
            warning: true
        })
    }
})

server.post(`/edit`, async (req, res) => {
    const { contentLength } = req.body
    const _id = req.query._id
    const blog = await database.blog(_id)

    if(req.body.thumbnailText){
        const result = await database.changeThumbnailText(_id, req.body.thumbnailText)
    }
    if(req.files && req.files.thumbnailImg){
        console.log(blog)
        deleteMedia.deleteImages([blog.thumbnailImg])
        const thumbnailImg = req.files.thumbnailImg

        const [ thumbnailImgName ] = saveMedia.saveImages([thumbnailImg])
        const result = await database.changeThumbnailImage(_id, thumbnailImgName)
        console.log('result')
        console.log(result)
        console.log(await database.blog(_id))
    }

    if(contentLength > 0){

        const images = []
        const videos = []
    
        blog.content?.forEach((each, i) => {
            if(each.image){
                images.push(each.image)
            }
            if(each.video){
                videos.push(each.video)
            }
        })
    
        deleteMedia.deleteImages(images)
        deleteMedia.deleteVideos(videos)

        const content = []
        for(var i=0; i<contentLength; i++){
            content.push({header: null, paragraph: null, image: null, video: null})
        }
        console.log(content)

        for(var i=0; i<contentLength; i++){
            content[i].header = req.body[`header${i}`]
            content[i].paragraph = req.body[`paragraph${i}`]

            if(req.files && req.files[`image${i}`]){
                const [ imageName ] = saveMedia.saveImages([req.files[`image${i}`]])
                content[i].image = imageName
            }
            if(req.files && req.files[`video${i}`]){
                const [ videoName ] = saveMedia.saveVideos([req.files[`video${i}`]])
                content[i].video = videoName
            }
        }

        const result = await database.changeContent(_id, content)
        console.log(result)
    }

    res.send(`edited ${req.query._id}`)
})

server.all(`*`, (req, res) => {
    res.status(404).redirect(`https://httpstatusdogs.com/404-not-found`);
});

server.listen(PORT, () => {
    console.log(`Server Is Listening on Port ${PORT}`)
})