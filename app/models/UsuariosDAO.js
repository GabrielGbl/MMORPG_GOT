const crypto = require('crypto');

function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, req, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){

			let senha_criptografada = crypto.createHash("md5").update(usuario.usu_senha).digest("hex");
			usuario.usu_senha = senha_criptografada;
			collection.insert(usuario)
			.then(function(result){
				mongoclient.close();
				if(result){
					req.session.autorizado = true;
					req.session.usuario = usuario.usu_usuario;
					req.session.casa = usuario.usu_casa;
					res.redirect('jogo');
				}else{
					res.render('cadastro',{validacao:{}, dados:{usuario}, usuario:'Houve um problema, tente novamente!'});
				}						
			});			
		});
	});
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			let senha_criptografada = crypto.createHash("md5").update(usuario.usu_senha).digest("hex");
			usuario.usu_senha = senha_criptografada;
			collection.find(usuario).toArray()
				.then(function(result){
					if(result[0] != undefined){
						req.session.autorizado = true;
						req.session.usuario = result[0].usu_usuario;
						req.session.casa = result[0].usu_casa;
					}
					mongoclient.close();
					if(req.session.autorizado){
						res.redirect("jogo");
					}else{
						res.render("index", {validacao:{}, dados:usuario});
					}
				});			
		});
	});	
};


module.exports = function(){
	return UsuariosDAO;
}