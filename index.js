//loads .env file contents into process.env by default
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

const db = require('./DB/connection')

const router = require('./Routes/router')

const appMiddleware = require('./Middlewares/appMiddleware')

//create a backend application express
const sbServer = express()//Creates an Express application

//use cors
sbServer.use(cors())
sbServer.use(express.json())//Returns middleware that only parse json ->build-in middleware
sbServer.use(appMiddleware)
sbServer.use(router)
sbServer.use('/uploads',express.static('./uploads'))//image exporting to frontend
//port creation
const PORT = 4000 || process.env.PORT

//server listening
sbServer.listen(PORT,()=>{
    console.log("listening on port" + PORT );
})

//localhost : 4000 -> res sbServer is started
sbServer.get('/',(req,res)=>{
    res.send(`<h1>Salon Booking Server Started</h1>`)
})