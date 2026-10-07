const fs = require("fs")

function deletePic(path){
    try {
        fs.unlinkSync(path)
    } catch (error) {
        
    }
}

module.exports = deletePic