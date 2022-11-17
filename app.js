const express = require('express')

const app = express()
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const jsonfile = require("jsonfile")
var bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

const filePath = "./db/tasks.json"

let file = jsonfile.readFileSync(filePath)

const variables = () =>  {
  return {
    title: 'TODO list',
    tasksList: file,
    openTasks: file.filter((a)=>(a.openStatus==true)),
    closedTasks: file.filter((a)=>a.openStatus==false)
  }
}

const priorityColor = (prio) => {
  if (prio == 'Высокий приоритет') return 'red'
  else if (prio == 'Низкий приоритет') return 'green'
  else if (prio == 'Средний приоритет') return 'yellow'
} 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.set('view engine', 'pug')

app.post('/addTask', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  const user = {
    id: file.map((a)=>a.openStatus).length,
    priority: req.body.priority,
    info: req.body.info,
    dl: req.body.deadline,
    header: req.body.name,
    worker: req.body.worker,
    tag: req.body.rag,
    color: priorityColor(req.body.priority),
    openStatus: true,
    expandStatus: false,
    progress: 0
  }
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    fileObj.push(user);
    file.push(user);
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard')
})

app.get('/dashboard', function (request, response) {
  response.render('dashboard', variables())
})

app.use('/static', express.static(path.join(__dirname, "img")));

app.get('/', function (request, response) {
  response.send('Главная страница')
})

app.listen(3000, () => {
  console.log('server started')
})

