const express = require('express')

const app = express()
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require('body-parser')
const {variables, tasksData, priorityColor} = require(path.join(__dirname, "db/variables.js"));
const dashboard = variables();
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.set('view engine', 'pug')

app.post('/addTask', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  tasksData.push({
    id: tasksData.length,
    priority: req.body.priority,
    info: req.body.info,
    dl: req.body.deadline,
    header: req.body.name,
    worker: req.body.worker,
    tag: 'Дизайн',
    color: priorityColor(req.body.priority),
    openStatus: true,
    expandStatus: false,
    progress: 0
  })
  res.redirect('/dashboard')
})

app.get('/dashboard', function (request, response) {
  response.render('dashboard', dashboard)
})

app.use('/static', express.static(path.join(__dirname, "img")));

app.get('/', function (request, response) {
  response.send('Главная страница')
})

app.listen(3000, () => {
  console.log('server started')
})

