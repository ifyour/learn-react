const express = require('express');
const mongoose = require('mongoose');

const app = express();
const BD_URL = 'mongodb://localhost:27017/imooc';

mongoose.connect(BD_URL);
mongoose.connection.on('connected', () => {
  console.log('连接 mongodb 成功！！！');
})

// 新增数据模型骨架
const User = mongoose.model('user', new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

// User.create({
//   name: 'tom',
//   age: 3
// }, (err, doc) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(doc)
//   }
// });

app.get('/', (req, res) => {
  res.send('<h1>Hello, express!!</h1>')
})

app.get('/data', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc);
  })
})

app.listen(9093, () => {
  console.log(`node app start at port 9093`);
})