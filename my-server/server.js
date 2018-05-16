const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

// port of our app
const port = 8000;
// mongo connnections and database
const dburl = 'mongodb://localhost:27017/students';

app.use(bodyParser.urlencoded({ extended: false }));
// configure header our app
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(dburl, (err, database) => {
  if (err) return console.log(err)

  // Make sure you add the database name and not the collection name
  db = database.db("students")

  require('./routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
