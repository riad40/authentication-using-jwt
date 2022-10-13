const mongoose = require('mongoose')

const dbUri = process.env.DB_URI

mongoose.connect(dbUri)
    .then(() => { console.log('connected succefully to marhaba') })
    .catch((err) => { console.log('something went wrong ' + err) })