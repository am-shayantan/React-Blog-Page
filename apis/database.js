const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/BabyBlog')

const Blogs = mongoose.model('blogs', new mongoose.Schema({
    _id: String,
    thumbnailText: String,
    thumbnailImg: String,
    content: Array
}))

module.exports.all = async () => {
    return await Blogs.find()
}

module.exports.thumbnails = async(protagonist) => {
    if(['baby', 'mom', 'dad'].indexOf(protagonist) >= 0)
        return await Blogs.find({_id: new RegExp('^' + protagonist[0])}, {content: 0})
    else
        return null
}

module.exports.blog = async(_id) => {
    return await Blogs.find({ _id : _id})
}