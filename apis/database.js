
const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/environment-variables/.env'})

const mongoose = require('mongoose')

let mongoDB = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@127.0.0.1:27017/BabyBlog?authMechanism=DEFAULT&authSource=${process.env.DB_NAME}`

mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('database connection successful')
}).catch(err => console.error(err))

const Blogs = mongoose.model(process.env.COLLECTION_NAME, new mongoose.Schema({
    _id: String,
    thumbnailText: String,
    thumbnailImg: String,
    content: Array
}))

module.exports.all = async () => {
    const result = await Blogs.find()
    console.log(result)
    return result
}

module.exports.thumbnails = async(protagonist) => {
    if(['baby', 'mom', 'dad'].indexOf(protagonist) >= 0)
        return await Blogs.find({_id: new RegExp('^' + protagonist[0])}, {content: 0})
    else
        return null
}

module.exports.blog = async(_id) => {
    return await Blogs.findOne({ _id : _id})
}