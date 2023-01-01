const mongoose = require('mongoose')

const dbUri = process.env.DB_URI
const dbUriLocal = process.env.DB_URI_LOCAL

mongoose.connect(dbUri)
    .then(() => { console.log('connected succefully to marhaba db') })
    .catch((err) => { console.log('something went wrong ' + err) })