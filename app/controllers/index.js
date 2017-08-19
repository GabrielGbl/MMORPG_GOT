module.exports.home = function(application, req, res){
	res.render('index', {validacao:{}, dados:{}});
}

module.exports.autenticar = function(application, req, res){

	const dadosForm = req.body;

	req.assert('usu_usuario', "Usuário não pode ser vazio").notEmpty();
	req.assert('usu_senha', "Senha não pode ser vazio").notEmpty();

	const erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao:erros, dados:dadosForm});
		return;
	}

	const connection = application.config.dbConnection;
	const UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);

}