let ObjectID = require('mongodb').ObjectId;

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
				defesa:Math.floor(Math.random() * 1000),
				ataque:Math.floor(Math.random() * 1000),
				sabedoria:Math.floor(Math.random() * 1000),
				magia:Math.floor(Math.random() * 1000)
			});
		});
	});
};

JogoDAO.prototype.iniciaJogo = function(usuario, casa, msg, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("jogo", function(error, collection){
			collection.find({usuario : usuario}).toArray()
			.then(function(result){
				res.render('jogo', {casa:casa, dadosJogo:result[0], msg:msg});
				mongoclient.close();
			});
		});
	});
};

JogoDAO.prototype.acao = function(dadosAcao){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("acao", function(error, collection){			
			let date = new Date();
			let tempo = null;

			switch(parseInt(dadosAcao.acao)){
				case 1: tempo = 1 * 60 * 60000;
				break;
				case 2: tempo = 2 * 60 * 60000;
				break;
				case 3: tempo = 5 * 60 * 60000;
				break;
				case 4: tempo = 5 * 60 * 60000;
				break;
				case 5: tempo = 10 * 60 * 60000;
				break;
			}

			dadosAcao.acao_termina = date.getTime() + tempo;

			collection.insert(dadosAcao);			
		});

		mongoclient.collection("jogo", function(error, collection){
			let moedas = null;

			switch(parseInt(dadosAcao.acao)){
				case 1: moedas = -2 * dadosAcao.quantidade;
				break; 
				case 2: moedas = -3 * dadosAcao.quantidade;
				break;
				case 3: moedas = -4 * dadosAcao.quantidade;
				break;
				case 4: moedas = -4 * dadosAcao.quantidade;
				break;
				case 5: moedas = -5 * dadosAcao.quantidade;
				break;
			}

			collection.update(
				{ usuario:{$eq : dadosAcao.usuario }},
				{ $inc:{moeda : moedas}}
			);

			mongoclient.close();
		});
	});	
};

JogoDAO.prototype.getAcao = function(usuario, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("acao", function(error, collection){
			let date = new Date();
			let momentoAtual = date.getTime();
			collection.find({usuario:usuario, acao_termina:{$gt:momentoAtual}}).toArray()
			.then(function(result){
				res.render('pergaminhos', {acoes:result})
			});
			mongoclient.close();
		});
	});
};


JogoDAO.prototype.revogarAcao = function(_id, res){
	this._connection.open(function(error, mongoclient){
		mongoclient.collection("acao", function(error, collection){
			collection.remove({_id:ObjectID(_id)}, function(error, result){
				res.redirect('jogo?msg=D');
				mongoclient.close();
			}
			);
		});
	});
};


module.exports = function(){
	return JogoDAO;
}