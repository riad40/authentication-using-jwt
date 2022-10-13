require('dotenv').config()
const db = require('./config/config_db')
const mongoose = require('mongoose')
const express = require('express')


const app = express()

// middlwares for handling or parsing incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const authRouter = require('./routes/auth')
const managerRouter = require('./routes/manager')
const customerRouter = require('./routes/customer')
const deliveryRouter = require('./routes/delivery')

app.use('/api/auth', authRouter)
app.use('/api/user/manager', managerRouter)
app.use('/api/user/customer', customerRouter)
app.use('/api/user/delivery', deliveryRouter)

    
const port = process.env.PORT

app.listen(port, (err) => {
    !err ? console.log('app running on port ' + port) : console.log(err)
})