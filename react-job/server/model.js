const mongoose = require('mongoose');
const BD_URL = 'mongodb://localhost:27017/imooc-chat';

mongoose.connect(BD_URL);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    'avatar': {type: String},// 头像
    'desc': {type: String},// 简介
    'title': {type: String},// 职位
    'company': {type: String},
    'money': {type: String}
  },
  chat: {}
}

// 批量创建骨架模型
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
