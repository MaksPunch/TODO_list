const testReq = () => {
	return fetch('/test', {
		method: "DELETE"
	})
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
        })
}

document.querySelector('.test').addEventListener('click', (e) => {
	testReq()
})