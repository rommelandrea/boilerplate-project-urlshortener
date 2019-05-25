let mongoose = require('mongoose')

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.Promise = global.Promise

    mongoose.connect(process.env.MONGO_URI, { dbName: 'test', useNewUrlParser: true })
    .then(() => {console.log('Database OK...')})
    .catch((err) => {
      console.log('Database KO...')
      console.error(err)
    })
  }
}
module.exports = new Database()
