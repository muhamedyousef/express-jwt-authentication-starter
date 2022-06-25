const router = require('express').Router();
const mongoose = require("mongoose");
const Img = mongoose.model('Img');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


var upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req)
    let finalPath = path.join('D:\\work\\express-jwt-authentication-starter' + '/images/' + req.file.filename);
    console.log(finalPath)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(finalPath),
            contentType: path.parse(finalPath).ext //not worhing yet 25/6/2022
        }
    }
    Img.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.status(200).json({success:true,item:item});
        }
    });
});



module.exports = router;