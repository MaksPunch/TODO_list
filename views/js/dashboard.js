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
	value.addEventListener('click', () => {
		document.querySelector(`form#${value.id}`).submit();
	})
})

