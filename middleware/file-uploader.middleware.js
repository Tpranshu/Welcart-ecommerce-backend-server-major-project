const multer = require("multer")



// npm i multer package install krna hai

function generateUploader(folder) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads/" + folder)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname)

        }
    })
    return multer({ storage: storage })

}
// ab is multer middleware ko route aur controller ke beech me inject kr dege
module.exports = {
    maincategoryUploader: generateUploader("maincategory"),
    subcategoryUploader: generateUploader("subcategory"),
    brandUploader: generateUploader("brand"),
    productUploader: generateUploader("product")
}