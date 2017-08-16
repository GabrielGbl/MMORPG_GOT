const express = require('express');
const consign = require('consign');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


consign()
	.include('./app/routes')
	.then('./config/dbConnection.js')
	.then('./app/controllers')
	.then('./app/models')
	.into(app);


module.exports = app;

