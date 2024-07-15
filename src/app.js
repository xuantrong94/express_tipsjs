const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const { checkOverload } = require('./helpers/check.connect')
const routes = require('./routes')

const app = express()

//TODO init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

//TODO init db

require('./dbs/init.mongodb')
// checkOverload()

//TODO routes
app.use('', routes)

//TODO handling errors

module.exports = app
