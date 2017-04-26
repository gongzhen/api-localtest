const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mastertest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

const Consumers = require('./lib/models/consumer')

app.get('/', (req, res) => {
	Consumers.find((err, data) => {
		if(err) {
			return console.log(err);
		}
		console.log(data);
		res.render('index.ejs', {quotes: data});	
	});	
});

app.put('/quotes', (req, res) => {
	var query = {name: "chris"};
	Consumers.findOneAndUpdate(query, {name:'jason borne'}, {'upsert': false}, (err, consumer) => {
		if(err) {
			console.log(err);
		}
		res.json(consumer);
	});
});

app.post('/quotes', (req, res) => {
	Consumers.create(req.body, (err, consumer) => {
		if(err) {
			return console.log(err);
		}
		res.json(consumer);
	});
});

app.delete('/quotes', (req, res) => {
	var query = {name: "chris"};
	Consumers.findOneAndRemove(query, {'upsert': false}, (err, consumer) => {
		if(err) {
			console.log(err);
		}
		res.json(consumer);
	});
});

const httpPort = 3000;
const httpsPort = 3443;

http.createServer(app).listen(httpPort, () => {
	console.log('listening on:' + httpPort);
});
