const express = require('express')

const app = express()
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const jsonfile = require("jsonfile")
var bodyParser = require('body-parser')
const dashboardRouter = require('./routes/dashboardRouter.js');
const { connect } = require('http2');

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

var mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'todoList'
});

const filePath = "./db/tasks.json"

let file = jsonfile.readFileSync(filePath)

let variables = (id) => {
return {
      title: 'TODO list',
      tasksList: file,
      openTasks: file.filter((a)=>a.openStatus==true),
      closedTasks: file.filter((a)=>a.openStatus==false),
      taskId: id || 1
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.set('view engine', 'pug')

app.use('/dashboard', dashboardRouter)

app.use('/static', express.static(path.join(__dirname, "img")));

app.get('/', function (request, response) {
  response.render('test', variables())
})

app.listen(3000, () => {
  console.log('server started');
})