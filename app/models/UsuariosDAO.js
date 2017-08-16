function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, callback){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("usuarios", function(error, collection){
			collection.insert(usuario);
		});
	});
};


module.exports = function(){
	return UsuariosDAO;
}