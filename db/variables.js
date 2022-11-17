const jsonfile = require("jsonfile");
const path = require("path");
const tasksData = jsonfile.readFileSync(path.join(__dirname, "/tasks.json"))
   
let openTasks = []
let closedTasks = []

tasksData.forEach( (a) => {
  if (a.openStatus == true) openTasks.push(a.openStatus);
  else closedTasks.push(a.openStatus)
})

const variables = () =>  {
  return {
    title: 'TODO list',
    tasksList: tasksData,
    openTasks: openTasks,
    closedTasks: closedTasks
  }
}

const priorityColor = (prio) => {
  if (prio == 'Высокий приоритет') return 'red'
  else if (prio == 'Низкий приоритет') return 'green'
  else if (prio == 'Средний приоритет') return 'yellow'
} 

module.exports = { variables, tasksData, priorityColor };