
const mongoose = require('mongoose')
const User = require('../models/User')

const boss = 
  {
    name: 'Raul',
    lastName: 'Hernandez',
    email: 'rahm9410@gmail.com',
    role: 'BOSS'
  }

  mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(async () => {
    const user = await User.register(boss, boss.password='1234')
    console.log(`Boss created`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })

