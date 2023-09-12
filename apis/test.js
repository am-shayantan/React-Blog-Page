
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '..', 'temp.txt')

fs.unlink(filePath, function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(`removed`);
    }
})