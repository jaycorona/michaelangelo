/************************************************


index.js v1.0.0
Copyright (c) ULM design Co.,Ltd. - http://www.ulm-design.com


************************************************/



/*--------------------------
global
--------------------------*/
var WINDOW;
var WRAPPER;
var DOCUMENT;
var DEF_W =1024;
var DEF_H =800;
var IS_TEST = false;

var MAIN_W = 820;
var MAIN_H = 500;

var BG_W = 1920;
var BG_H = 1080;


function getContentsSize(){
	
	var w = WINDOW.width();
	var h = WINDOW.height();
	w = w > DEF_W ? w : DEF_W;
	h = h > DEF_H ? h : DEF_H;
	return({"w":w,"h":h});
}




/*******************************************************
	
constructor
	
********************************************************/
var Main =(function(){
	
	
	/*--------------------------
  	cookie
  	--------------------------*/
  	var _isVisited = false;
	var _cookieName =Config.getCookie();
	
	
	/*--------------------------
  	loadImg
  	--------------------------*/
	var _allImgNum = 0;
	var _imgLoadedNum = 0;
	
	
	/*--------------------------
  	params
  	--------------------------*/
	var _isInit =false;
	var _ua;
	var _isPlayingMovie =false;
	
	var MOVIE_W = 853;
	var MOVIE_H = 480;
	var YOUTUBE_URL ="movie/index.html";
	
	var _stats;
	
	
	/*******************************************************
	
	@init
	
	********************************************************/
	function init(){
		
		//colorbox
		//$.fn.colorbox.settings.bgOpacity = "0.93";
		
		Utils.init();
		_ua = Utils.getBrowser();
		
		WINDOW =$(window);
		DOCUMENT = $(document);
		WRAPPER = $("#wrapper");
				
		/*-----------------------------------
		stats
		------------------------------------*/
		if(IS_TEST && _ua.name.indexOf("IE") ==-1){
			initStats();
		}
		
		/*----------------------------------
		cookie
		----------------------------------*/
		var cookie =$.cookie(_cookieName);
		if(cookie ==Config.getCookieValue()){
			_isVisited =true;
		};
		
		
		$(window).bind("resize",__resize);
		__resize();
		
		
		
		/*----------------------------------
		loadImg
		----------------------------------*/
		var images = $("img");
		var txt = $("#progress-txt");
		
		if( _ua.name == "IE7" || _ua.name == "IE8"){
			
			txt.css({"display":"none"});
			
		}else{
			
			_allImgNum = images.length;
			images.each(function(){
								 
				if(_ua.name=="Firefox"){
					$(this).load(function(){
						_imgLoadedNum++;
						txt.text(String( Math.floor((_imgLoadedNum/_allImgNum)*100)+"%" ));
					})
				}else{
					$(this).imagesLoaded(function(){
						_imgLoadedNum++;
						txt.text(String( Math.floor((_imgLoadedNum/_allImgNum)*100)+"%" ));
					})
				}
			})
			
		};
		
		
		
		/*----------------------------------
		onLoadImg
		----------------------------------*/
		$(window).load(function(){
			
			setTimeout(__resize,100);
			
			if(!IS_TEST){
				$("#progress-txt").text("100%");
				hidePreloader();
			}else{
				$("#preloader").css({"display":"none"});
				$('#wrapper').css({"display":"block"});
				setConfig();
			};
		});
		
	};
	
	
	/*******************************************************
	
	@hidePreloader
	
	********************************************************/
	function hidePreloader(){
		$("#preloader-anime").delay(500).fadeOut(100);
		$('#preloader').delay(600).animate({"opacity":0}, 1000, 'linear',function(){
			$('#preloader').remove();
			$('#wrapper').css({"display":"block"});
			__resize();
			setConfig();
		});
	};



	/*******************************************************
	
	config
	
	********************************************************/
	function setConfig(){
		
		//stats
		if(IS_TEST){
			window.requestAnimFrame = (function() {
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
						window.setTimeout(callback, 1000/60);
					};
			})();
		};
		
		__resize();
		
	};



	/*******************************************************
	
	@onInitIndex
	
	********************************************************/
	function onInitIndex(){
		
		
		if(_isVisited == false){
			if(!IS_TEST){
				showMovie();
			}else{
				onInit();
			}
		}else{
			onInit();
		}
		
	};



	/*******************************************************
	
	@showContents
	
	********************************************************/
	function showContents(__id){
		
		switch(__id){
			case 0:
			break;
			case 1:
			break;
			case 2:
			break;
			default:
			break;
		}
		
	}



	/*******************************************************
	
	@showMovie
	
	********************************************************/
	function showMovie(__id){
		
		if(_isPlayingMovie) return;
		
		_isPlayingMovie = true;
				
		$.colorbox({
			iframe:true,
			href:YOUTUBE_URL,
			scrolling:false,
			width:MOVIE_W,
			height:MOVIE_H+34,
			opacity:0.93,
			speed:600,
			onClosed: function() {
				onClosedMovie();
			}
		});
	};
	
	
	
	/*******************************************************
	
	@onCompleteMovie
	
	********************************************************/
	function onCompleteMovie(){
		if(_isInit == false && _isVisited == false){
			$.colorbox.close();
		}
	}



	/*******************************************************
	
	@onClosedMovie
	
	********************************************************/
	function onClosedMovie(){
		
		_isPlayingMovie =false;
		
		if(_isInit == false){
			onInit();
		}else{
		}
	}



	/*******************************************************
	
	@onInit
	
	********************************************************/
	function onInit(){
		
		_isInit = true;		
		
		if(IS_TEST){
			render();
		}
		$.cookie(_cookieName, Config.getCookieValue(), { expires: 3 });
	}



	/*******************************************************
	
	resize
	
	********************************************************/
	function __resize(){
		
		var w = WINDOW.width();
		var h = WINDOW.height();
		w = w > DEF_W ? w : DEF_W;
		h = h > DEF_H ? h : DEF_H;
		
		if(w <= DEF_W){
			$("html").css({"overflow-x":"auto"});
		}else{
			$("html").css({"overflow-x":"hidden"});
		}
		
		if(h <= DEF_H){
			$("html").css({"overflow-y":"auto"});
		}else{
			$("html").css({"overflow-y":"hidden"});
		}
		
		
		$("#wrapper").css({"width":w,"height":h});
		
		var footerH = $("#footer").height();
		
		var mainH = (h - footerH);
		var mainX = (w - MAIN_W)/2;
		var mainY = (mainH - MAIN_H)/2;
		
		$("#main").css({"width":w,"height":mainH});
		$("#main-container").css({"top":mainY,"left":mainX});
		
		var bgW = BG_W;
		var bgH = BG_H;
		if(bgW < w){
			bgW = w;
			bgH = BG_H(bgW / BG_W);	
		}
		var bgX = (w - bgW)/2;
		var bgY = (h - bgH)/2;
		$("#bg-container").css({"width":w,"height":h});
		$("#bg").css({"width":bgW,"height":bgH,"top":bgY,"left":bgX});
	};



	/*---------------------------------------------
	PRIVATE
	---------------------------------------------*/
	function render(){
		requestAnimFrame(render);
		if(_stats){
			_stats.update();
		}
	};
	
	
	/*---------------------------------------------
	@STATS
	---------------------------------------------*/
	function initStats(){
		stats = new Stats();
  		stats.domElement.style.position = 'fixed';
  		stats.domElement.style.left = '0px';
  		stats.domElement.style.top = '0px';
  		document.body.appendChild(stats.domElement);
	};
	
	
	return{
		init:init,
		__resize:__resize,
		showMovie:showMovie,
		onCompleteMovie:onCompleteMovie
	}
	
})();



/*******************************************************
	
@ready
	
********************************************************/
$(document).ready(function(e) {
    Main.init();
});


