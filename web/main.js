// const mainDiv = document.querySelector('.content')
const posDiv = document.querySelector('.queue-pos')
const updatedDiv = document.querySelector('.last-updated')


const setPos = (pos) => {
	const now = new Date()
	updatedDiv.innerText = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
	posDiv.innerText = pos
}

const update = () => {
	fetch('/api/pos')
		.then((data) => data.json())
		.then((pos) => {
			setPos(pos)
		})
}

setInterval(update, 1000)

