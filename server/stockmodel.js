const mongoose = require('mongoose')

const currentTime = new Date();

const currentOffset = currentTime.getTimezoneOffset();

const ISTOffset = 330;   // IST offset UTC +5:30 

const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

const currentDate = ISTTime.toISOString();

const stockmodel = new mongoose.Schema({
    stockname :{
        type : String,
        required : true
    },
    incharge :{
        type : String,
        required : true
    },
    quantity :{
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true
    },
    available :{
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    },
    // date:String,
    dept : String,
    invoice : String,
    supplier : String,
    
})



module.exports = mongoose.model('Stocks',stockmodel)




