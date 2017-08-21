module.exports.jogo = function(application, req, res){	
	if(req.session.autorizado){
		res.render('jogo', {casa:req.session.casa});
	}else{
		res.render('error');
	}	
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', { validacao:{}, dados:{}});
	});
}