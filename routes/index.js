var express     = require('express')
var router      = express.Router()
var multer      = require('multer')
var MongoClient = require('mongodb').MongoClient
var assert      =  require('assert')
var path        = require('path')
var url         = 'mongodb://localhost:27017/fileupload_multer';


var storage     = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename:(req, file,cb) => {
    cb(null, Date.now() + '-'+file.originalname)
  }
});

var upload = multer({
      storage: storage, 
      limits:{
        fileSize:1000000
      },
      fileFilter: function(req, file, cb){
          if(!file.originalname.match(/\.(jpg|jpeg|png|gif|docx|doc|mp4)$/))
              return cb( new  Error("Error: File upload only supports the following filetypes - jpg,png,docx"));
          cb(null, true)
      }
}).single('image_name');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/fileupload', (req, res,next) => {
    upload(req, res, function(err){
      if(err)
        return res.end(err.message);

      res.status(200).send({
        message:'Image Upload Successfully! '
      })
    })
})

module.exports = router;
