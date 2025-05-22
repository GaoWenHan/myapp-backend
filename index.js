require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

const dataSchema = new mongoose.Schema({
  username: String,
  password: String
})

const Data = mongoose.model('Data', dataSchema,'Data')


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/List', async (req, res) => {
 const data = await Data.find()
  res.json({
    code:200,
    message:"success",
    data
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
