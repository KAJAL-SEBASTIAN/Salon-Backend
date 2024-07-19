const bookings = require('../Models/bookingSchema')

exports.addUserBooking = async (req,res)=>{
    console.log("Inside addUserBoking");

    //get booking details
    const {services,date,userTime,totalServices,totalPrice} = req.body

    console.log(services,date,userTime,totalServices,totalPrice);

    //logic for adding booking details
    // res.status(200).json("Add user booking request received")
    try{
        const newBooking = new bookings({
            services,date,userTime,totalServices,totalPrice
         });
         await newBooking.save()//save new booking to mongodb
        return res.status(200).json(newBooking)//response send to client
    }
    catch(err){
        res.status(404).json({message:err.message});
    }

}

//get all user-services
exports.getAllUserBooking = async (req,res)=>{
    
    //get all bookings of particular user
    try{
        //api call
        const userBooking = await bookings.find()
        res.status(200).json(userBooking)//send all services to frontend
    }
    catch(err){
      res.status(401).json("Internal server error" +err.message);
      }
  }