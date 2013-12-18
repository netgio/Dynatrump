/*
This script depends on Node.js and Express
Install node.js form www.node.org

Install Express by Windows Command Prompt
Type "npm install Express"
 */

var express = require('express');
//var extend = require('extend');
var fs = require('fs');
var file = __dirname + '/data/movies.json';
var movies; 

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  movies = JSON.parse(data);
});

var app = express();
port = process.env.PORT || 8000;

app.configure(function () {
    app.use("/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );
    app.use(express.bodyParser());
});


app.get('/movies/:id', function(req, res) {
	  if(movies.length <= req.params.id || req.params.id < 0) {
		    res.statusCode = 404;
		    return res.send('Error 404: No quote found');
		  }

		  var mov = movies[req.params.id];
		  res.json(mov);
	});

app.get('/movies', function(req, res) {
	  res.json(movies);
	});

app.delete('/movies/:id', function(req, res) {
	  if(movies.length <= req.params.id) {
	    res.statusCode = 404;
	    return res.send('Error 404: No quote found');
	  }

	  movies.splice(req.params.id, 1);
	  res.json(true);
	});

app.post('/movies', function(req, res) {
	  if(!req.is('application/json')) {
	    res.statusCode = 400;
	    return res.send('Error 400: Post syntax incorrect.');
	  }

	  movies.push(req.body);
	  res.json(true);
	  
	});

app.put('/movies/:id', function(req, res) {
	if(movies.length <= req.params.id || req.params.id < 0) {
	    res.statusCode = 404;
	    return res.send('Error 404: No movie found');
	  }
	  console.log(req.body);
	  movies[req.params.id] = req.body;
	  res.json(true);
});


app.listen(port); //the port you want to use
console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");