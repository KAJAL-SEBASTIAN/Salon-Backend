const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
   type:{
    type:String,
    required:true
   },
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    serviceImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})

const services = mongoose.model("services",serviceSchema)

module.exports = services