const data = require('./data')


module.exports = function (app) {

  app.get('/data', (require, result) => {
    result.send(data)
  })
}
