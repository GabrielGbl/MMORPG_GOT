module.exports.home = function(application, req, res){
	res.render('index', {validacao:{}});
}

module.exports.autenticar = function(application, req, res){

	const dadosForm = req.body;

	req.assert('usu_usuario', "Usuário não pode ser vazio").notEmpty();
	req.assert('usu_senha', "Senha não pode ser vazio").notEmpty();

	const erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao:erros});
		return;
	}

	res.render('jogo');

}