const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

//app config
//TAgdUF6f3xC3w6jv
const app = express()

// middlewares
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

//db config
mongoose.connect(process.env.MONGO_URL)

//API endpoints

app.get('/test', (req,res) => {
  res.json('test ok')
})

app.post('/register', (req,res) => {
  const {name, email, password} = req.body
  res.json({name, email, password})
})

//listener
app.listen(4000)