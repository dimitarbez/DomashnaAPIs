require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose
	.connect(process.env.DATABASEURL)
	.then(() => {
		console.log('connected to db ' + process.env.DATABASEURL)
	})
	.catch((err) => {
		console.log(err)
	})

app.use(
	require('express-session')({
		secret: 'Zivio je drug tito!',
		resave: false,
		saveUninitialized: false
	})
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

let gatewayRoutes = require('./models/gateway')

app.use(gatewayRoutes)

app.get('*', (req, res) => {
	req.flash('error', 'Route not found!')
	res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
	console.log('app started')
})
