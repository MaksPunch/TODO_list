let switches = document.querySelectorAll('.todo_switch');



switches.forEach( (value) => {
	value.addEventListener('click', () => {
		document.querySelector('.active').classList.remove('active');
		value.classList.add('active');
	})
})