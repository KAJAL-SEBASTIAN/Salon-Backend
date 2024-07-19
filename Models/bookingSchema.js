const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    services:{
        type:Array,
        required:true
       },
        date:{
            type:String,
            required:true
        },
        userTime:{
            type:String,
            required:true
        },
        totalServices:{
            type:String,
            required:true
        },
        totalPrice:{
            type:String,
            required:true
        },

})

const bookings = mongoose.model("bookings",bookingSchema)

module.exports = bookings