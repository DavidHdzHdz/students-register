const noteRoutes = function(app, db) {
  let student = "";
  let list ={};
  const ObjectId = require('mongodb').ObjectID;

  // You'll save our studends here.
  app.post('/students', (req, res) => {
    student = { name: req.body.studentName };
    db.collection('students').insert(student, (err, result) => {
      if (err) {
        res.status(400).send(err);
        console.log({ 'error': 'An error has occurred' });
      } else {
        res.status(200).send(student);
        console.log('se guardo el archivo');
      }
    });
  });

  // You'll list our studends here.
  app.get('/students/:id/', (req, res) => {
    const id = req.params.id;
    if(id!=='0') {
      const details = { '_id': new ObjectId(id) };
      db.collection('students').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Note ' + id + ' deleted!');
        }
      });
    }
    else {
      //res.status(200).send(JSON.stringify({ res: 'you get a list of studends' }));
      list = db.collection('students').find().toArray(function(err, results) {
        if(err) {
          res.status(400).send(err);
        }
        res.status(200).send(results);
      })
    }
  });
}

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};
