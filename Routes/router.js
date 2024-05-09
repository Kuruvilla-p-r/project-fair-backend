// import express
const express = require('express')

//create router object of express to define path
const userController = require('../Controllers/userController')

const projectController = require('../Controllers/projectController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//create router object of express to define path 
const router = express.Router()

//Register api call
router.post('/register',userController.register)

module.exports = router

//login api call
router.post('/login',userController.login)

//add project api call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


//Get a perticular userproject
router.get('/project/get-a-project',jwtMiddleware,projectController.getAProject)

//Get 3 projects details for home project
router.get('/project/home-Project',projectController.getHomeProjects)

//get all projects
router.get('/project/all-user-Project',jwtMiddleware, projectController.getAllProjects);

// Delete a specific project
router.delete('/project/delete-user-project/:pid', jwtMiddleware, projectController.deleteUserProject);

//update user project
router.put('/project/update-user-project/:pid', jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)

module.exports = router