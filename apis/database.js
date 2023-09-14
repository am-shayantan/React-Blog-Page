
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/environment-variables/.env' })

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('database connection successful')
}).catch(err => console.error(err))

const Blogs = mongoose.model(process.env.COLLECTION_NAME, new mongoose.Schema({
    _id: String,
    thumbnailText: String,
    thumbnailImg: String,
    content: Array
}))

const Admin = mongoose.model(process.env.ADMIN_COLLECTION, new mongoose.Schema({
    _id: String,
    password: String
}))

module.exports.all = async () => {
    const result = await Blogs.find()
    console.log(result)
    return result
}

module.exports.thumbnails = async (protagonist) => {
    if (['baby', 'mom', 'dad'].indexOf(protagonist) >= 0)
        return await Blogs.find({ _id: new RegExp('^' + protagonist[0]) }, { content: 0 })
    else
        return null
}

module.exports.blog = async (_id) => {
    return await Blogs.findOne({ _id: _id })
}

module.exports.newBlog = async (protagonist) => {
    if (['baby', 'mom', 'dad'].includes(protagonist)) {
        const _id = protagonist[0] + new Date().getTime()
        if (await Blogs.create({ _id: _id })) {
            return _id
        }
        else {
            return null
        }
    }
    else {
        return null
    }
}

module.exports.idExists = async (_id) => {
    if (await Blogs.findOne({ _id: _id })) return true
    else return false
}

module.exports.deleteBlog = async (_id) => {
    return await Blogs.deleteOne({ _id: _id })
}

module.exports.changeThumbnailText = async (_id, thumbnailText) => {
    return await Blogs.updateOne({_id: _id}, {thumbnailText: thumbnailText})
}
module.exports.changeThumbnailImage = async (_id, thumbnailImg) => {
    return await Blogs.updateOne({_id: _id}, {thumbnailImg: thumbnailImg})
}
module.exports.changeContent = async (_id, content) => {
    return await Blogs.updateOne({_id: _id}, {content: content})
}

module.exports.checkPassword = async (password) => {
    const data = await Admin.findOne()
    const hash = data.password
    return bcrypt.compare(password, hash)
}