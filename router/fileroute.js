const express = require('express')
const router = express.Router()
 
const {localupload , imageupload ,videoupload , imageSizeReducer} = require('../controlers/fileupload')


router.post('/localupload' , localupload)
router.post('/imageupload' ,imageupload)
router.post('/videoupload' ,videoupload)
router.post('/imageSizeReducer' ,imageSizeReducer)
module.exports = router