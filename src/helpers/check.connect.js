const { default: mongoose } = require('mongoose')
const os = require('os') 
const process = require('process')
const _SECONDS = 10000
const countConnect = () => {
	const numConnections = mongoose.connections.length
	console.log('::: ~ countConnect ~ numConnections:', numConnections)
}

// check over load
const checkOverload = () => {
	setInterval(() => {
		const numConnections = mongoose.connections.length
		const numCores = os.cpus().length
		const memoryUsage = process.memoryUsage().rss
		console.log(
			'::: ~ setInterval ~ memoryUsage:',
			memoryUsage / 1024 / 1024,
			'MB'
		)
		const maxConnections = numCores * 2
		if (numConnections >= maxConnections) {
			console.error(':: ~ Overload ~ Connection limit reached')
			process.exit(1)
		}
	}, _SECONDS)
}

module.exports = {
	countConnect,
	checkOverload,
}
