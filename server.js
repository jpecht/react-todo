/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();
const port = 3000;

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(bodyParser.json());

// middleware that came with express-react-webpack boilerplate
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

// middleware that came with jumpcloud ui template
app.use(function(req, res, next) {
  var whitelist = [
    'http://localhost:3000',
  ];

  var origin = req.headers.origin;

  if (whitelist.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});
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
