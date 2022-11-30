const deleteReq = (id) => {
	return fetch(`/dashboard/deleteTask/${id}`, {
		method: "DELETE"
	})
    .then(res => {
        if (res.redirected) {
            window.location.href = '/dashboard';
        }
    })
}

let deleteBtns = document.querySelectorAll('.delete_task_btn')

deleteBtns.forEach( (val) => {
	val.addEventListener('click', (e) => deleteReq(val.id.match(/[0-9]+/gi).join('')))
})