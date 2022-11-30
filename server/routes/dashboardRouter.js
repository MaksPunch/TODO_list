const express = require('express')
const dashboardController = require('../controllers/dashboardController.js')
const dashboardRouter = express.Router()
var bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

dashboardRouter.post('/addTask', urlencodedParser, dashboardController.addTask)

dashboardRouter.delete('/deleteTask/:id', dashboardController.deleteTask)

dashboardRouter.put('/updateTask/:id', urlencodedParser, dashboardController.updateTask)

dashboardRouter.post('/closeTask/:id', dashboardController.closeTask    )

dashboardRouter.post('/addTaskPage', dashboardController.addTaskPageRedirect)
  
dashboardRouter.post('/taskDescription/:id', dashboardController.taskDescriptionRedirect)

dashboardRouter.post('/closedTasks', dashboardController.closedTaskRedirect)

dashboardRouter.post('/', dashboardController.dashboardRedirect)

dashboardRouter.get('/addTaskPage', dashboardController.getAddTaskPage)
dashboardRouter.get('/closedTasks', dashboardController.getClosedTasks)
dashboardRouter.get('/taskDescription/:id', dashboardController.getTaskDescription)
dashboardRouter.get('/', dashboardController.getDashboard)

module.exports = dashboardRouter;