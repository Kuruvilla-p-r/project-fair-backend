//Loads .env file contents into process.env by default. If DOTENV_KEY is present, it smartly attempts to load encrypted .env.vault file contents into process.env.
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import DB
const db = require('./DB/connection')

//import router
const router = require('./Routes/router')

//importing middleware
const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//create a application using express
const pfServer = express()

//use 
pfServer.use(cors())
pfServer.use(express.json())//Returns middleware that only parses

pfServer.use(router)

//used to export image from backend to frontend
pfServer.use('/uploads',express.static('./uploads'))

pfServer.use(applicationMiddleware)

//6 port creation
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log('pfServer listening on port '+PORT)
})

pfServer.get('/',(req,res)=>{
    res.send("Welcome to Project-fair")
})