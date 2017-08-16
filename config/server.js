const express = require('express');
const consign = require('consign')

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));

consign()
	.include('./app/routes')
	.then('./app/controllers')
	.then('./app/models')
	.into(app);


module.exports = app;

