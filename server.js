const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://quotesapp:12345@ds057066.mlab.com:57066/quotesapp', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
      console.log('listening on 3000')
  })
})


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
    console.log(result)
  })
})

