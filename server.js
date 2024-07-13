const app = require('./src/app')

const PORT = 3055

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

//* sigint is a signal that is sent to the process when you press ctrl+c
process.on('SIGINT', () => {
	console.log('Server is shutting down...')
	server.close(() => {
		console.log('Server is closed')
		process.exit(0)
	})
})
