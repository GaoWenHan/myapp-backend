require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err)
  console.log('Current MONGODB_URI:', process.env.MONGODB_URI ? 'exists' : 'missing')
})

const dataSchema = new mongoose.Schema({
  username: String,
  password: String
})

const Data = mongoose.model('Data', dataSchema,'Data')


app.get('/', (req, res) => {
  res.send('<h1>路同帅先生你好</h1>')
})

app.get('/List', async (req, res) => {
  try {
    const data = await Data.find().maxTimeMS(30000)
    res.json({
      code:200,
      message:"success", 
      data
    })
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).json({
      code: 500,
      message: 'Database operation failed',
      error: err.message
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
