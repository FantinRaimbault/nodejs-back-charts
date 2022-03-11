const mongoose = require('mongoose')
// mongoose configuration
mongoose.set('debug', String(process.env.DEBUG_MONGO) === 'true')
mongoose.set('strictQuery', false)

// connect database
mongoose.connect('mongodb://127.0.0.1:27017/hackathon')

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open')
})

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})
