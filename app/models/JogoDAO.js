function JogoDAO(connection){
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("jogo", function(error, collection){
			collection.insert({
				usuario:usuario,
				moeda:15,
				suditos:10,
				pergaminhos:5,
				defesa:Math.floor(Math.random() * 1000),
				ataque:Math.floor(Math.random() * 1000),
				sabedoria:Math.floor(Math.random() * 1000),
				magia:Math.floor(Math.random() * 1000)
			});
		});
	});
};

JogoDAO.prototype.iniciaJogo = function(usuario, casa, req, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("jogo", function(error, collection){
			collection.find({usuario : usuario}).toArray()
			.then(function(result){
				res.render('jogo', {casa:casa, dadosJogo:result[0]});
				mongoclient.close();
			});
		});
	});
};

module.exports = function(){
	return JogoDAO;
}