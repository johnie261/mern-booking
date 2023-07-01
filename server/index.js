const express = require('express')
const cors = require('cors')
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//app config
//TAgdUF6f3xC3w6jv
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "wedht657bnk876ewrfghji87658"

// middlewares
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(cookieParser());

//db config
mongoose.connect(process.env.MONGO_URL)

//API endpoints

app.get('/test', (req,res) => {
  res.json('test ok')
})

app.get('/profile', (req,res) => {
  const {token} = req.cookies
  if(token) {
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if (err) throw err
      const {name, email, _id} = await User.findById(userData.id)
      res.json({name, email, _id})
    })
  } else {
    res.json(null)
  }
})

app.post('/register', async(req,res) => {
  const {name, email, password} = req.body
  try {
    const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
      })
      res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.post('/login', async(req, res) => {
  const {email, password} = req.body
  const userDoc = await User.findOne({email})
  if(userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk) {
      jwt.sign({
          email:userDoc.email, 
          id:userDoc._id
        }, jwtSecret, {}, (err, token) => {
        if (err) throw err
        res.cookie('token', token).json(userDoc)
      })
    } else {
      res.status(422).json('password wrong')
    }
  } else {
    res.json('user not found')
  }
})

//listener
app.listen(4000)