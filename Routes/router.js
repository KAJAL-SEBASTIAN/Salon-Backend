const express = require('express');

const userController = require('../Controllers/userController')

const serviceController = require('../Controllers/serviceController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

const bookingController = require('../Controllers/bookingController')

//create router object of express to define path
const router = new express.Router()


//create router object to define path


//Register API path - http://localhost:4000/register - 
router.post('/register',userController.register)


//Login API path - http://localhost:4000/login -
router.post('/login',userController.login)

//Add user service API path - http://localhost:4000/service/add
router.post('/service/add',jwtMiddleware,multerConfig.single('serviceImage'),serviceController.addUserService)

//get all user services API path - http://localhost:4000/service/all-user-services
router.get('/service/all-user-services',jwtMiddleware,serviceController.getAllUserServices)

//get all services path - http://localhost:4000/service/all-service
router.get('/service/all-service',serviceController.getAllServices)

//update service -  http://localhost:4000/service/update-service/6748393993
router.put('/service/update-service/:pid',jwtMiddleware,multerConfig.single('serviceImage'),serviceController.updateService)

//delete service -  http://localhost:4000/service/delete-service/6748393993222
router.delete('/service/delete-service/:pid',jwtMiddleware,serviceController.deleteService)

//Add user booking API path - http://localhost:4000/booking/add
router.post('/booking/add',jwtMiddleware,bookingController.addUserBooking)

//get all user bookings API path - http://localhost:4000/booking/all-user-bookings
router.get('/booking/all-user-bookings',bookingController.getAllUserBooking)

module.exports = router