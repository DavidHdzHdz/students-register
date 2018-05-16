const noteRoutes = function(app, db) {
  // configure header our app
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // You'll save our studends here.
  app.post('/studends', (req, res) => {
    console.log(req.body);
    console.log(req.body.studentName);
    res.send(JSON.stringify({ res: 'you send a new studend' }));
  });
  // You'll list our studends here.
  app.get('/studends', (req, res) => {
    res.send(JSON.stringify({ res: 'you get a list of studends' }));
  });
}

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};
