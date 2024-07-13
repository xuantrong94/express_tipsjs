const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const { checkOverload } = require('./helpers/check.connect')

const app = express()

//TODO init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//TODO init db

require('./dbs/init.mongodb')
// checkOverload()
//TODO routes
app.get('', (req, res, next) => {
	return res.status(200).json({ message: 'Welcome to nodejs' })
})

//TODO handling errors

module.exports = app
