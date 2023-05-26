import express from "express"
import multer from 'multer'
import FilesSchema from './FilesSchema.js'

const upload = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/')
    },
    filename: function (req, file, cb) {
        if (file.originalname.length > 25) {
            var extension = file.originalname.split(".")
            const filename = 'image-' + Date.now() + '.' + extension[extension.length - 1]
            cb(null, filename);
        } else {
            cb(null, file.originalname);
        }
    }
})


var single = multer({ storage: storage }).single('file')
var multi = multer({ storage: storage }).array('files')

// upload.post('/single-file', single, (req, res) => {
//     const createFile = new FilesSchema({
//         filename: req.file.filename,
//         filetype: req.file.mimetype,
//         filesize: req.file.size,
//         filepath: req.file.path,
//         destination: req.file.destination,
//         originalname: req.file.originalname,

//     })
//     const data = createFile.save()
//     return res.status(200).send(req.file.filename)

// })
upload.post('/single-file', multi, (req, res) => {
    console.log(req.files)
    const createFile = new FilesSchema({
        filename: req.files.filename,
        filetype: req.files.mimetype,
        filesize: req.files.size,
        filepath: req.files.path,
        destination: req.files.destination,
        originalname: req.files.originalname,

    })
    const data = createFile.save()
    return res.status(200).send(req.file.filename)

})
export default upload
