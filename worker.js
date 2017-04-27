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
		res.render('index.ejs', {consumers: data});	
	});	
});

app.put('/consumers', (req, res) => {
	Consumers.findOneAndUpdate({name: req.body.name}, {email:req.body.email}, {'upsert': false}, (err, consumer) => {
		if(err) {
			console.log(err);
		}
		res.redirect('/');
	});
});

app.post('/consumers', (req, res) => {
	Consumers.create(req.body, (err, consumer) => {
		if(err) {
			return console.log(err);
		}
		res.redirect('/');
	});
});

app.delete('/consumers', (req, res) => {
	Consumers.findOneAndRemove({name: req.body.name}, {'upsert': false}, (err, consumer) => {
		if(err) {
			console.log(err);
		}
		// @todo:res.json()
		// res.json(consumer);
		res.redirect('/');
	});
});

const httpPort = 3000;
const httpsPort = 3443;

http.createServer(app).listen(httpPort, () => {
	console.log('listening on:' + httpPort);
});
