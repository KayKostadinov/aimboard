const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const connectDB = require('./config/db')

connectDB()

app.get('/', (req, res)=> {
    res.send('Howdy')
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})