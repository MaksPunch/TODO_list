let statusBarInput = document.querySelector('.statusBar_percent')

statusBarInput.addEventListener('blur', (e) => {
	document.querySelector('.statusBar').style.width = `${e.target.value}%`
})

const deleteReq = (id) => {
	return fetch(`/dashboard/deleteTask/${id}`, {
		method: "DELETE"
	})
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        }
    })
}

document.querySelector('.delete_btn').addEventListener('click', (e) => deleteReq(e.target.id.match(/[0-9]+/gi).join('')))

const putReq = (id) => {
    let priority = document.querySelector('.taskPriorityText').textContent
    document.querySelector('.hiddenInput').value = priority;
	const form = document.querySelector('#updateTaskForm')
	const formData = new URLSearchParams(new FormData(form))

	return fetch(`/dashboard/updateTask/${id}`, {
		method: "PUT",
		body: formData
	})
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url
        }
    })
}
document.querySelector('.update_btn').addEventListener('click', (e) => putReq(e.target.id.match(/[0-9]+/gi).join('')))