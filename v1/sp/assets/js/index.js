/*
* index.js v4.1.0
* Copyright (c) ULM design Co.,Ltd. - http://www.ulm-design.com
* Author: mitsut
*/
/*******************************************************
	
constructor
	
********************************************************/
var Main =(function(){
	
	var MOVIE_W = 560;
	var MOVIE_H = 315;
	var MOVIE_ARR =["*****************","****************"];
	var _currentMovieId =0;
	
	/*******************************************************
	
	init
	
	********************************************************/
	function init(){
		
		//trailer
		$("#trailer-nav p").each(function(i){
			$(this).click(function(){
				if( i != _currentMovieId){
					var path = "//www.youtube.com/embed/"+MOVIE_ARR[i]+"?rel=0";
					$("#trailer").attr("src",path);
					var _old = _currentMovieId;
					$("#trailer-nav p").eq(_old).removeClass("trailer-selected");
					$("#trailer-nav p").eq(i).addClass("trailer-selected");
					_currentMovieId = i;
				}
			});
		});
		
		
		$(window).bind("resize",__resize);
		__resize();
	}
	/*******************************************************
	
	__resize
	
	********************************************************/
	function __resize(){
		
		var w = $(window).width();
		var movieW = w*0.8 >>0;
		var movieH = MOVIE_H*(movieW/MOVIE_W) >>0;
		$("#trailer").css({"width":movieW,"height":movieH});		
	}
	return{
		init:init
	}
	
	
})();


$(document).ready( function() {							
	Main.init();
});