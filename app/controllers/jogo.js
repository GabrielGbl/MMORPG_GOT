module.exports.jogo = function(application, req, res){	
	if(req.session.autorizado !== true){
		res.render('error');
		return;
	}			

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);
	let usuario = req.session.usuario;
	let casa = req.session.casa;

	JogoDAO.iniciaJogo(usuario, casa, req, res);
		
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', { validacao:{}, dados:{}});
	});
}

module.exports.suditos = function(application, req, res){
	res.render('suditos', { validacao:{}, dados:{}});
}

module.exports.pergaminhos = function(application, req, res){
	res.render('pergaminhos', { validacao:{}, dados:{}});
}

module.exports.ordenar_acao_suditos = function(application, req, res){
	
	let dadosAcao = req.body;

	req.checkBody("acao","Ação é obrigatório").notEmpty();
	req.checkBody("quantidade", "Quantidade é obrigatório").notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			res.redirect('jogo');
			return;	
		}
		res.send('Tudo ok!');
	});

	
}