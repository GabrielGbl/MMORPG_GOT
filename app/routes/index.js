module.exports = function(app){

	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/cadastro', function(req, res){
		res.render('cadastro');
	});

	app.get('/jogo', function(req, res){
		res.render('jogo');
	});

}