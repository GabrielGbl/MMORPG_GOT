function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, callback){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			collection.insert(usuario);
			mongoclient.close();
		});
	});
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			collection.find(usuario).toArray(function(error, result){
				if(result[0] != undefined){
					req.session.autorizado = true;
					req.session.usuario = result[0].usu_usuario;
					req.session.casa = result[0].usu_casa;
				}

				if(req.session.autorizado){
					res.redirect("jogo");
				}else{
					res.render("index", {validacao:{}, dados:usuario});

				}
			});
			mongoclient.close();
		});
	});
	
};


module.exports = function(){
	return UsuariosDAO;
}