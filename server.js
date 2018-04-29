const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
      
          console.log('saved to database')
              res.redirect('/')
        })
  })

app.get('/', (req, res) => {
  console.log("GET /");
  db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
          // renders index.ejs
          res.render('index.ejs', {quotes: result})
      })
  })

MongoClient.connect('mongodb://mongo:27017/integration_tests', (err, client) => {
  if (err) return console.log(err)
    db = client.db('star-wars-quotes') 
      app.listen(3000, () => {
          console.log('listening on 3000')
        })
  })
