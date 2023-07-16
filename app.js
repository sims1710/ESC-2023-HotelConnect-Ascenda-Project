/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = app;*/


//----------------------------//
//importing modules, syntax --> require(<module name>)
//const readline = require('readline'); //readline reads input from terminal, readline returns object which is assigned to readline var

//const fs = require('fs'); //file system module
const express = require('express');
const app = express();
const path = require('path');

// Configure Express to serve static files
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'js')));
//app.use(express.static(path.join(__dirname, 'css')));

// Read HTML file
//const html = fs.readFileSync('./HomePage.html', 'utf-8');

app.get('/', (req, res) => {
    //res.end(html);
    res.sendFile(path.resolve(__dirname, 'public', 'HomePage.html'));//'./HomePage.html'));
});
// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Creating simple web server
//Import package, HTTP
/*const http = require('http');
const html = fs.readFileSync('./HomePage.html', 'utf-8');

//express middleware
app.use(express.static(path.join(__dirname, 'ESC-Ascenda-Project-2023-main')));

// Step 1: Create server
const server = http.createServer((request, response)=>{ //create server method returns server obj
    let path = request.url;
    //check value of path variable
    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200); //setting status code
        response.end(html);
    } else if (path.toLocaleLowerCase() === '/signup'){
        response.writeHead(200);
        response.end(html);
    } else if (path.toLocaleLowerCase() === '/userguide'){
        response.writeHead(200);
        response.end(html);
    } else{
        response.writeHead(404);
        response.end('Error 404: Page not found.')
    }
    //response.end(path);
}); //call back function is executed everytime a new request hits server, callback func receives 2 params when server is hit

// Step 2: Start server
server.listen(8000, '127.0.0.1', ()=>{
    console.log('Server has started!');
});
//port num, specify host (local), optional call back func which is executed as soon as server starts listening to requests
*/