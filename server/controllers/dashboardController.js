var mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'todoList'
});

const priorityColor = (prio) => {
  prio = prio.toLowerCase()
  if (prio == 'высокий приоритет' || prio == 'высокий') return 'red'
  else if (prio == 'низкий приоритет' || prio == 'низкий') return 'green'
  else if (prio == 'средний приоритет' || prio == 'средний') return 'yellow'
  
} 

exports.addTask = (req, res) => { 
  if (!req.body) return res.sendStatus(400)
  const user = {
    id: null,
    priority: req.body.priority,
    info: req.body.info,
    dl: req.body.deadline,
    header: req.body.name,
    worker: req.body.worker,
    tag: req.body.tag,
    color: priorityColor(req.body.priority),
    progress: 0,
    openStatus: 1,
    expandStatus: 0
  }
  const sql =`INSERT INTO tasksList SET ` + connection.escape(user);
  connection.query(sql, user, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  })
}

exports.deleteTask = (req, res) => {
  const sql = `DELETE FROM tasksList WHERE id = ` + req.params.id
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Deleted task with id ' + req.params.id)
  })
  res.redirect(303, '/dashboard')
}

exports.updateTask = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const user = {
    info: req.body.info,
    dl: req.body.deadline,
    worker: req.body.worker,
    tag: req.body.tag,
    openStatus: req.body.progressBar == 100 ? 0 : 1,
    progress: req.body.progressBar,
    priority: req.body.priority,
    color: priorityColor(req.body.priority) 
  }
  const sql = `UPDATE tasksList SET ` + connection.escape(user) + ` WHERE id = ` + req.params.id
  connection.query(sql, (err, result) => {
    if (err) throw err;
  })
  res.redirect(303, `/dashboard/taskDescription/`+req.params.id)
}

exports.closeTask = (req, res) => {
  const sql = `UPDATE tasksList SET progress = 100, openStatus = 0 WHERE id = `+req.params.id;
  connection.query(sql, (err, result) => {
    if (err) throw err
  })
  res.redirect('/dashboard')
}

exports.addTaskPageRedirect = (req, res) => {
  res.redirect('./addTaskPage')
}

exports.taskDescriptionRedirect = (req, res) => {
  res.redirect(`/dashboard/taskDescription/${req.params.id}`)
}

exports.closedTaskRedirect = (req, res) => {
  res.redirect('./closedTasks')
}

exports.dashboardRedirect = (req, res) => {
  res.redirect('/dashboard')
}


exports.getDashboard = (req, res) => {
    connection.query('SELECT * FROM tasksList', (err, results) => {
      if (err) throw err;
      res.render('dashboard', {
        title: "TODO list",
        tasksList: results,
        openTasks: results.filter((a)=>a.openStatus==true),
        closedTasks: results.filter((a)=>a.openStatus==false)
      })
  })
}

exports.getClosedTasks = (req, res) => {
  connection.query('SELECT * FROM tasksList', (err, results) => {
    if (err) throw err;
    res.render('closedTasks', {
      title: "TODO list",
      tasksList: results,
      openTasks: results.filter((a)=>a.openStatus==true),
      closedTasks: results.filter((a)=>a.openStatus==false)
    })
  })
}

exports.getTaskDescription = (req, res) => {
  connection.query('SELECT * FROM tasksList', (err, results) => {
    if (err) throw err;
    res.render('taskDescription', {
      title: "TODO list",
      tasksList: results,
      openTasks: results.filter((a)=>a.openStatus==true),
      closedTasks: results.filter((a)=>a.openStatus==false),
      taskId: req.params.id
    })
})
}

exports.getAddTaskPage = (req, res) => {
  connection.query('SELECT * FROM tasksList', (err, results) => {
    if (err) throw err;
    res.render('addTask', {
      title: "TODO list",
      tasksList: results,
      openTasks: results.filter((a)=>a.openStatus==true),
      closedTasks: results.filter((a)=>a.openStatus==false)
    })
})
}