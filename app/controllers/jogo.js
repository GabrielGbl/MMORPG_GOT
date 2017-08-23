module.exports.jogo = function(application, req, res){	
	if(req.session.autorizado !== true){
		res.render('error');
		return;
	}	
	let msg = '';
	
	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);
	let usuario = req.session.usuario;
	let casa = req.session.casa;

	JogoDAO.iniciaJogo(usuario, casa, msg, res);		
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', { validacao:{}, dados:{}});
	});
}

module.exports.suditos = function(application, req, res){
	if(req.session.autorizado !== true){
		res.render('error');
		return;
	}			
	res.render('suditos');
}

module.exports.pergaminhos = function(application, req, res){
	if(req.session.autorizado !== true){
		res.render('error');
		return;
	}			

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	let usuario = req.session.usuario;
	JogoDAO.getAcao(usuario, res);
}

module.exports.ordenar_acao_suditos = function(application, req, res){
	if(req.session.autorizado !== true){
		res.render('error');
		return;
	}			

	let dadosAcao = req.body;

	req.checkBody("acao","Ação é obrigatório").notEmpty();
	req.checkBody("quantidade", "Quantidade é obrigatório").notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			res.redirect('jogo?msg=A');
			return;	
		}
		
		const connection = application.config.dbConnection;
		const JogoDAO = new application.app.models.JogoDAO(connection);

		dadosAcao.usuario = req.session.usuario;
		JogoDAO.acao(dadosAcao);

		res.redirect('jogo?msg=B')
	});	
}


module.exports.revogar_acao = function(application, req, res){
	let url_query = req.query;

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	let _id = url_query.id;
	
	JogoDAO.revogarAcao(_id, res);
}