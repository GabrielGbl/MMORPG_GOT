$(document).ready(function(){
	//BOTÃO PARA SAIR DA APLICAÇÃO E ENCERRAR A SESSÃO
		$('#btn-sair').click(function(){
	 		window.location.href = '/sair';
		});

	//SCRIPT PARA FUNCIONAMENTO DOS TOOLTIPS DA APLICAÇÃO	
		$('[data-toggle="tooltip"]').tooltip(); 	
 	
 	//SCRIPT PARA EFEITO DE IMAGEM NA SELEÇÃO DA CASA NO CADASTRO
		$(".img-check").click(function(){
			$('.img-check').removeClass("check");
			$(this).toggleClass("check");
		});

	//SCRIPT PARA FECHAR A DIV DE PERGAMINHOS E ALDEÕES NO MOBILE
	  	$('.fechar').click(function(){
	  		$('#acoes-mobile').hide();
	  	});

	 //SCRIPT PARA VERIFICAR MUDANÇA NA LARGURA DA JANELA E ADAPTAR A DIV A NOVA LARGURA
	  	let largura = $(window).width();
	  	$(window).resize(function(){
	 		largura = $(window).width();
	 		if(largura < 768){ 			
	 			$('#acoes-mobile').css('width',largura);
	 		}
	 	});

	//BOTÃO PARA CARREGAR VIA AJAX A PÁGINA SÚDITOS DENTRO DA PÁGINA PRINCIPAL DO JOGO
	//E VERIFICAR SE VAI CARREGAR NA DIV NORMAL OU PARA MOBILE
	 	$('#btn-suditos').click(function(){  	
	  		if(largura < 768){
	 			$('#acoes-mobile').show();
	 			$('#acoes-mobile').css('width',largura);
	 			$.ajax({
	 				url: '/suditos',
	 				type: "get"
		 		})
		 		.done(function(data) {
		 			$('#acoes-mobile').html(data);
		 		})
		 		.fail(function() {
		 			console.log("error");
		 		})
		 		.always(function() {

		 		});	 
	 		}else{
	 			$('#acoes-mobile').hide();
	 			$('#acoes').show();
			   	$.ajax({
		 			url: '/suditos',
		 			type: "get"
		 		})
		 		.done(function(data) {
		 			$('#acoes').html(data);
		 		})
		 		.fail(function() {
		 			console.log("error");
		 		})
		 		.always(function() {
		 			
		 		});
		 	}	   
	    });  

	//BOTÃO PARA CARREGAR VIA AJAX A PÁGINA PERGAMINHOS DENTRO DA PÁGINA PRINCIPAL DO JOGO
	//E VERIFICAR SE VAI CARREGAR NA DIV NORMAL OU PARA MOBILE	
	 	$('#btn-pergaminhos').click(function(){
	 		if(largura < 768){
	 			$('#acoes-mobile').show();
	 			$('#acoes-mobile').css('width',largura);
	 			$.ajax({
	 				url: '/pergaminhos',
	 				type: "get"
		 		})
		 		.done(function(data) {
		 			clearTimeout(timerId);
		 			cronometro();
		 			$('#acoes-mobile').html(data);		 			
		 		})
		 		.fail(function() {
		 			console.log("error");
		 		})
		 		.always(function(){

		 		});

	 		}else{
	 			$('#acoes-mobile').hide();
	 			$('#acoes').show();
			   	$.ajax({
		 			url: '/pergaminhos',
		 			type: "get"
		 		})
		 		.done(function(data) {
		 			clearTimeout(timerId);
		 			cronometro();
		 			$('#acoes').html(data);		 			
		 		})
		 		.fail(function() {
		 			console.log("error");
		 		})
		 		.always(function() {
		 			
		 		});
		 	}	   
	    });  

}); //FIM DOCUMENT LOAD

//FUNÇÃO PARA ATUALIZAR OS SEGUNDOS DAS AÇÕES NOS PERGAMINHOS
	let timerId = null;

 	function cronometro(){
 		$('.tempo_restante').each(function(){
 			let segundos = $(this).html();
 			let segundos_atuais = parseInt(segundos) - 1;
 			if(segundos_atuais < 0){
 				window.location.href = "/jogo?msg=C";
 			}else{
 				$(this).html(segundos_atuais); 
 			} 			
 		});

 		timerId = setTimeout('cronometro()', 1000);
 	}
