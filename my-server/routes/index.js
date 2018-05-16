const noteRoutes = function(app, db) {
  let student = "";
  let list ={};

  // You'll save our studends here.
  app.post('/students', (req, res) => {
    student = { name: req.body.studentName };
    db.collection('students').insert(student, (err, result) => {
      if (err) {
        res.status(400).send();
        console.log({ 'error': 'An error has occurred' });
      } else {
        res.status(200).send();
        console.log('se guardo el archivo');
      }
    });
  });
  // You'll list our studends here.
  app.get('/students', (req, res) => {
    //res.status(200).send(JSON.stringify({ res: 'you get a list of studends' }));
    list = db.collection('students').find().toArray(function(err, results) {
      if(err) {
        res.status(400).send();
      }
      res.status(200).send(results);
    })
  });
}

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};
