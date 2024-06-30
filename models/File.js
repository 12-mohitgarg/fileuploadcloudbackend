const mongoose = require('mongoose')


const file = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    imageurl:{
        type:String,
        
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("File" , file)