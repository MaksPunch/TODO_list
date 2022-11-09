const express = require('express')

const app = express()
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const {variables, findTask} = require(path.join(__dirname, "db/variables.js"));
const dashboard = variables();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.set('view engine', 'pug')

app.use('/dashboard', function (request, response) {
  response.render('dashboard', dashboard)
})

app.use('/static', express.static(path.join(__dirname, "img")));

app.use('/', function (request, response) {
  response.send('Главная страница')
})

app.listen(3000, () => {
  console.log('server started')
})

