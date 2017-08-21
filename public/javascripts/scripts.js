$(document).ready(function(){
	$('#btn-sair').click(function(){
	 	window.location.href = '/sair';
	});

	$('[data-toggle="tooltip"]').tooltip(); 	
 	
	$(".img-check").click(function(){
		$('.img-check').removeClass("check");
		$(this).toggleClass("check");
	});



  	$('.fechar').click(function(){
  		$('#acoes-mobile').hide();
  	});

  	let largura = $(window).width();

  	$(window).resize(function(){
 		largura = $(window).width();
 		if(largura < 768){
 			$('#acoes-mobile').css('width',largura);
 		}
 	});

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
	 			console.log("complete");
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
	 			console.log("complete");
	 		});
	 	}	   
    });  
	

 	$('#btn-pergaminhos').click(function(){
 		if(largura < 768){
 			$('#acoes-mobile').show();
 			$('#acoes-mobile').css('width',largura);
 			$.ajax({
 				url: '/pergaminhos',
 				type: "get"
	 		})
	 		.done(function(data) {
	 			$('#acoes-mobile').html(data);
	 		})
	 		.fail(function() {
	 			console.log("error");
	 		})
	 		.always(function() {
	 			console.log("complete");
	 		});	 
 		}else{
 			$('#acoes-mobile').hide();
 			$('#acoes').show();
		   	$.ajax({
	 			url: '/pergaminhos',
	 			type: "get"
	 		})
	 		.done(function(data) {
	 			$('#acoes').html(data);
	 		})
	 		.fail(function() {
	 			console.log("error");
	 		})
	 		.always(function() {
	 			console.log("complete");
	 		});
	 	}	   
    });  
 		
});
