'use strict'
let switches = document.querySelectorAll('.todo_switch');
let windows = document.querySelectorAll('.todo_container');
let taskDescriptionContainers = document.querySelectorAll('.taskDescription_container');

switches.forEach( (value) => {
	let id = value.id;
	value.addEventListener('click', () => {
		document.querySelector('.active').classList.remove('active');
		value.classList.add('active');
		windows.forEach( (window) => {
			if (window.className != value.id) window.classList.add('hidden');
		});
		document.querySelector('.'+CSS.escape(id)).classList.remove('hidden');
		taskDescriptionContainers.forEach( (task) => {
			task.classList.add('hidden');
		})
	})
})

let expandBtns = document.querySelectorAll('.task_expand');

expandBtns.forEach( (value) => {
	let div = document.querySelector('div#'+value.id+'.task_addition_info_container');
	value.addEventListener('click', () => {
		value.classList.toggle('task_expand_rotate');
		div.classList.toggle('hidden')
	})
})

let taskHeaders = document.querySelectorAll('.task_header');

taskHeaders.forEach( (value) => {
	let taskContainer = document.querySelector('div#'+value.id+'.taskDescription_container');
	let todoWindows = document.querySelectorAll('.todo_container');
	let taskDescription = document.querySelector('.taskDescription');
	value.addEventListener('click', () => {
		taskContainer.classList.remove('hidden');
		todoWindows.forEach ( (todoWindow) => {
			todoWindow.classList.add('hidden');
		})
		taskDescription.classList.remove('hidden');
	})
})