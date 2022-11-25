const express = require('express')

const app = express()
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const jsonfile = require("jsonfile")
var bodyParser = require('body-parser')
var mysql = require('mysql');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'todoList'
});

const filePath = "./db/tasks.json"

let file = jsonfile.readFileSync(filePath)

connection.connect();

let sqldb = connection.query('SELECT * FROM tasksList',  (err, results, fields) => {
  if (err) throw err
})

connection.end();

let variables = (id) => {
return {
      title: 'TODO list',
      tasksList: file,
      openTasks: file.filter((a)=>a.openStatus==true),
      closedTasks: file.filter((a)=>a.openStatus==false),
      taskId: id || 1
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

app.post('/dashboard/addTask', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const user = {
    id: file.length,
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
})

app.delete('/dashboard/deleteTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for(let i = 0; i < fileObj.length; i++) {
      if (fileObj[i].id == req.params.id) {
        fileObj.splice(i, 1)
        file.splice(i, 1)
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect(303, '/dashboard')
})

app.put('/dashboard/updateTask/:id', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let prev = file[req.params.id];
  console.log(req.body.worker)
  const user = {
    id: prev.id,
    priority: prev.priority,
    info: req.body.info,
    dl: req.body.deadline,
    header: prev.header,
    worker: req.body.worker,
    tag: req.body.tag,
    color: prev.color,
    openStatus: true,
    expandStatus: false,
    progress: req.body.progressBar
  }
  console.log(user)
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i] = user
        file[i] = user
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
})

app.post('/dashboard/closeTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i].openStatus = false
        fileObj[i].progress = 100
        file[i].progress = 100
        file[i].openStatus = false
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard')
})

app.post('/dashboard/resetTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i].openStatus = true
        fileObj[i].progress = 90
        file[i].openStatus = true
        file[i].progress = 90
      }
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard/closedTasks')
})

app.post('/dashboard/addTaskPage', (req, res) => {
  res.redirect('./addTaskPage')
})

app.get('/dashboard/addTaskPage', (req, res) => {
  res.render('addTask', variables())
})

app.post('/dashboard/taskDescription/:id', (req, res) => {
  res.redirect(`/dashboard/taskDescription/${req.params.id}`)
})

app.get('/dashboard/taskDescription/:id', (req, res) => {
  res.render('taskDescription', variables(req.params.id))
})

app.post('/dashboard/closedTasks', (req, res) => {
  res.redirect('./closedTasks')
})

app.get('/dashboard/closedTasks', (req, res) => {
  res.render('closedTasks', variables())
})

app.post('/dashboard', function (request, response) {
  response.redirect('/dashboard')
})

app.get('/dashboard', function (request, response) {
  response.render('dashboard', variables())
})

app.use('/static', express.static(path.join(__dirname, "img")));

app.get('/', function (request, response) {
  response.render('test', variables())
})

app.listen(3000, () => {
  console.log('server started')
})

