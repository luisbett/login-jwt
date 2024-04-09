const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const router = require('./router')

const app = express()

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(router)

module.exports = app