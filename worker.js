console.log("worker.js");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;

// app.use((req, res, next) => {
// 	console.log({headers:res.headers, body:req.body})
// });

const httpPort = 3000;
const httpsPort = 3443;

var db;

MongoClient.connect('mongodb://localhost:27017/mastertest', (err, database) => {
	if(err) {
		return console.log(err);
	}
	db = database;
	http.createServer(app).listen(httpPort, ()=>{
		console.log('listening on:' + httpPort);
	});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray(function(err, result){
		if(err) {
			return console.log(err);
		}
		res.render('index.ejs', {quotes:result});
	});
});

app.put('/quotes', (req, res) => {
	db.collection('quotes').findOneAndUpdate({name: 'chris'}, {
		$set:{
			name:req.body.name,
			quote:req.body.quote
		}
	}, {
		sort: {_id: -1},
		upsert: true
	}, (err, result) => {
		if(err) {
			return res.send(err);
		}
		res.send(result);
	});
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if(err) {
			return console.log(err);
		}
		console.log('saved to database');
		res.redirect('/');
	})
});

app.delete('/quotes', (req, res) => {
	db.collection('quotes').findOneAndDelete({name:req.body.name}, (err, result) => {
		if(err) {
			return res.send(500, err);
		}
		res.send("deleted successfully.");
	});
});

