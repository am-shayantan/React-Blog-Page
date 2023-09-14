
const fs = require('fs')
const path = require('path')

module.exports.deleteImages = (images) => {
    images?.forEach(image => {
        if(image){
            const filePath = path.join(__dirname, '..', 'public', 'images', image)
            console.log(images)
            fs.unlink(filePath, function(err) {
                if(err && err.code == 'ENOENT') {
                    // file doens't exist
                    console.log(`${image} not found`);
                } else if (err) {
                    // other errors, e.g. maybe we don't have enough permission
                    console.error(`Error occurred while trying to remove ${image}`);
                } else {
                    console.log(`${image} deleted`);
                }
            })
        }
    });
}

module.exports.deleteVideos = (videos) => {
    videos.forEach(video => {
        const filePath = path.join(__dirname, '..', 'public', 'videos', video)
        fs.unlink(filePath, function(err) {
            if(err && err.code == 'ENOENT') {
                // file doens't exist
                console.info(`${video} not found`);
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error(`Error occurred while trying to remove ${video}`);
            } else {
                console.info(`${video} deleted`);
            }
        })
    })
}