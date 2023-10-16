var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const createTodo = require('../nodejs/crud/create');
const getTodos = require('../nodejs/crud/read');
const updateTodo = require('../nodejs/crud/update');
const deleteTodo = require('../nodejs/crud/delete');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add bodyParser middleware for parsing JSON
app.use(bodyParser.json());

// Routes for your CRUD operations
app.post('/todos', (req, res) => {
  const todo = req.body;
  createTodo(todo, (results) => {
    res.send(results);
  });
});

app.get('/todos', (req, res) => {
  getTodos((results) => {
    res.send(results);
  });
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  updateTodo(id, updatedTodo, (results) => {
    res.send(results);
  });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  deleteTodo(id, (results) => {
    res.send(results);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
