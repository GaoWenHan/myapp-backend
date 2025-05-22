const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/List', (req, res) => {
  res.send({
    code:200,
    data:{
      id:1,
      name:'张三',
      sex:'男',
      age:18
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
