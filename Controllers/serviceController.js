const services = require('../Models/serviceSchema')

//add the service details
   exports.addUserService = async(req,res)=>{
    console.log("Inside addUserService");

    //get userId
    const userId = req.payload

    //get serviceImage
    const serviceImage = req.file.filename
     //get service details
     const {type,title,time,price} =req.body

     console.log(userId,type,title,time,price,serviceImage);

     //logic for adding service details

    //res.status(200).json("Add user service request received")
     try{
       // if title is present in mongodb
       const existingService = await services.findOne({title})
       if(existingService){
       return res.status(402).json("Service already exists")
       }
       else{
        //if title is not present in mongodb then create new service details and save them in mongodb
        const newService = new services({
           type,title,time,price,serviceImage,userId
        });
        await newService.save()//save new service to mongodb
       return res.status(200).json(newService)//response send to client
       }

     }
     catch(err){
       return res.status(404).json({message:err.message})
     }
}

//get all user-services
exports.getAllUserServices = async (req,res)=>{
  //get userId
  const userId = req.payload;
  //get all services of particular user
  try{
      //api call
      const userService = await services.find({userId})
      res.status(200).json(userService)//send all services to frontend
  }
  catch(err){
    res.status(401).json("Internal server error" +err.message);
    }
}

// //get all services
exports.getAllServices = async(req,res)=>{
    const searchKey =req.query.search

    const query ={
      type:{
         $regex:searchKey,
        $options:"i"
        }
    }
  try{
const allServices = await services.find(query)
res.status(200).json(allServices)//send all services to frontend
  }
  catch(err){
    res.status(401).json("Internal server error" +err.message);
  }
}

//update service details
exports.updateService= async(req,res)=>{
     const {type,title,time,price,serviceImage} = req.body
     const uploadImage = req.file?req.file.filename:serviceImage
     userId = req.payload
     const {pid} = req.params
     try{
      //find the particular service and update the service setails then save to mongodb
        const updateService = await services.findByIdAndUpdate({_id:pid},{type,title,time,price,serviceImage:uploadImage,userId})
      //to save the service details to mongodb
        await updateService.save()
        //response send back to client
        res.status(200).json(updateService)
     }
     catch(err){
      res.status(401).json("Internal server error" +err.message);
     }
}


//delete serveric
exports.deleteService = async(req,res)=>{
  const {pid} =req.params;
  try{
     const deleteUserService = await services.findOneAndDelete({_id:pid})
     res.status(200).json(deleteUserService)
  }
  catch(err){
    res.status(401).json("Internal server error" +err.message);
  }
}
