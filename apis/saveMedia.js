
const path = require('path')

module.exports.saveImages = (images) => {
    const uniqueId = new Date().getTime()
    var counter = 0
    var resultantArray = []
    images?.forEach(image => {
        var imageName = image.name
        imageName = imageName.split('.')
        imageName[0] = `${uniqueId}-${++counter}`
        imageName = imageName.join('.')
        const filePath = path.join(__dirname, '..', 'public', 'images', imageName)
        image.mv(filePath, (err) => {
            if(err){
                console.error(err)
            }
        })
        resultantArray.push(imageName)
    })

    return resultantArray
}

module.exports.saveVideos = (videos) => {
    const uniqueId = new Date().getTime()
    var counter = 0
    var resultantArray = []
    videos.forEach(video => {
        var videoName = video.name
        videoName = videoName.split('.')
        videoName[0] = `${uniqueId}-${++counter}`
        videoName = videoName.join('.')
        const filePath = path.join(__dirname, '..', 'public', 'videos', videoName)
        video.mv(filePath, (err) => {
            if(err){
                console.error(err)
            }
        })
        resultantArray.push(videoName)
    })

    return resultantArray
}