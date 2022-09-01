const mongoose = require('mongoose')


const itemmodel = new mongoose.Schema({
    itemname :{
        type : String,
        required : true
    },
    available : String,
    date : {
        type : Date,
        default : Date.now
    },
    dept : String
    
})



module.exports = mongoose.model('items',itemmodel)




