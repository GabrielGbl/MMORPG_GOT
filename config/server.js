const express = require('express');
const consign = require('consign');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const expressSession = require('express-session')


const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');



app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(expressSession({
	secret:'oksdaopkdaspkrapoj',
	resave: false, //CRIA UMA SESSÃO NO SERVIDOR SEMPRE QUE TIVER O REQUEST
	saveUninitialized:false //CRIA UMA NOVA SESSÃO SEMPRE QUE FOR MODIFICADA
}));

consign()
	.include('./app/routes')
	.then('./config/dbConnection.js')
	.then('./app/controllers')
	.then('./app/models')
	.into(app);


module.exports = app;

