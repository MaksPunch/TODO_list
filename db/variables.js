const tasksData = [
    {
      id: 0,
      priority: 'Высокий приоритет',
      info: `Создать дизайн сайта в фигме, с анимациями, переходами на другие страницы. Каждую страницу размещать по горизонтали. Цвета преимущественно - серый, чёрный и белый. Шрифт - comfortaa`,
      dl: '28.05.2022 15:00',
      header: 'Создать дизайн сайта',
      worker: 'Дмитрий Фролов',
      tag: 'Дизайн',
      color: 'red',
      openStatus: true,
      expandStatus: false,
      progress: 60,
    },
    {
      id: 1,
      priority: 'Высокий приоритет',
      info: `Сверстать макет по созданному дизайну. Использовать HTML, CSS и JS, без использования сторонних фреймворков`,
      dl: '14.06.2022 15:00',
      header: 'Написать код для сайта',
      worker: 'Николай ашапатов',
      tag: 'Код',
      color: 'red',
      openStatus: true,
      expandStatus: false,
      progress: 40,
    },
    {
      id: 2,
      priority: 'Низкий приоритет',
      info: `Добавить разнообразный контент по теме оптики. Контентом могут быть статьи, блоги, товары, рецензии и т.д.`,
      dl: '28.05.2023 15:00',
      header: 'Добавить контент на главную страницу',
      worker: 'Тарасов Максим',
      tag: 'Прочее',
      color: 'green',
      openStatus: true,
      expandStatus: false,
      progress: 30,
    },
  ]

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

module.exports = {variables, tasksData, priorityColor};