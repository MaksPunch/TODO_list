const postReq = async () => {
	const form = document.querySelector('.addTaskForm')
	const formData = new URLSearchParams(new FormData(form))

	return await fetch(`/dashboard/addTask`, {
		method: "POST",
		body: formData
	})
    .then(res => {
        if (res.redirected) {
            res.text(200)
        }
    })
}

document.querySelector('.addTask_btn').addEventListener('click', (e) => postReq())