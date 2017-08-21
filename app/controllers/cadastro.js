module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao:{}, dados:{}, usuario:{}});
}

module.exports.cadastrar = function(application, req, res){

	let dadosForm = req.body;

	req.assert('usu_nome', 'Nome é obrigatório.').notEmpty();
	req.assert('usu_usuario', 'Usuário é obrigatório.').notEmpty();
	req.assert('usu_senha', 'Senha é obrigatório.').notEmpty();
	req.assert('usu_senha', 'Senha mínimo de 8 caracteres.').len(8,20);
	req.assert('usu_casa', 'Escolha da casa é obrigatório.').notEmpty();

	let erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao:erros, dados:dadosForm, usuario:{}});
		return;
	}

	const connection = application.config.dbConnection;
	const UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	const JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.gerarParametros(dadosForm.usu_usuario);
	UsuariosDAO.inserirUsuario(dadosForm, req, res);
	

}