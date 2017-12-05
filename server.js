/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const app = express();
const port = 8004;


app.use(bodyParser.json());
/*app.use(function(req, res, next) {
  var whitelist = [
    'http://localhost:8005',
  ];

  var origin = req.headers.origin;

  if (whitelist.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});*/

var data = {
  todos: require('./server/data/todos')
};

var controllers = {
  todos: require('./server/controllers/todos')(data.todos)
};

// ToDo API routes
app.get('/server/api/todos', controllers.todos.getAll);
app.get('/server/api/todos/:id', controllers.todos.getOne);
app.post('/server/api/todos', controllers.todos.create);
app.put('/server/api/todos/:id', controllers.todos.update);
app.delete('/server/api/todos/:id', controllers.todos.delete);


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
