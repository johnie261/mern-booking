const express = require('express')
const cors = require('cors')
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();

//app config
//TAgdUF6f3xC3w6jv
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = "wedht657bnk876ewrfghji87658"

// middlewares
app.use(express.json())
app.use('/uploads', express.static(__dirname+'/uploads'))
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

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async(req, res) => {
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await download.image({
    url: link,
    dest: __dirname + '/uploads/' +newName
  })
  res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = []
  for(let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads', ''))
  }
  res.json(uploadedFiles)
})
//listener
app.listen(4000)