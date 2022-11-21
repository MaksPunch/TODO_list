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
  res.redirect('/dashboard')
})

app.post('/deleteTask/:id', (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for(let i = 0; i < fileObj.length; i++) {
      if (fileObj[i].id == req.params.id) fileObj.splice(i, 1);
    }
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard')
})

app.post('/updateTask/:id', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)
  let prev = file[req.params.id];
  const user = {
    id: prev.id,
    priority: prev.priority,
    info: req.body.info || prev.info,
    dl: req.body.deadline || prev.deadline,
    header: prev.header,
    worker: req.body.worker || prev.worker,
    tag: req.body.tag || prev.tag,
    color: prev.color,
    openStatus: true,
    expandStatus: false,
    progress: 0
  }
  jsonfile.readFile(filePath, (err, obj) => {
    if (err) throw err
    let fileObj = obj;
    for (let i = 0; i < fileObj.length; i++) {
      if(fileObj[i].id == req.params.id) {
        fileObj[i] = user
      }
    }
    file.push(user);
    jsonfile.writeFile(filePath, fileObj, { spaces: 2 }, (err) => {
      if (err) throw err;
    })
  })
  res.redirect('/dashboard')
})

app.post('/closeTask/:id', (req, res) => {
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

app.post('/resetTask/:id', (req, res) => {
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

