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