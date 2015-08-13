var Config=(function(){
					 
	var IS_CHANGE_IMAGE = true;
	var HASH_SCROLL = false;
	var IS_DEBUG = true;
	
	var COOKIE="miche-project";
	var COOKIE_VALUE="v1";
	
	
	function isChangeImage(){
		return IS_CHANGE_IMAGE;
	}
	
	
	function hashScroll(){
		return HASH_SCROLL;
	}
	
	
	function isDebug(){
		return IS_DEBUG;
	}
	
	
	function getCookie(){
		return COOKIE;
	}
	
	
	function getCookieValue(){
		return COOKIE_VALUE;
	}
	
	
	return{
		isChangeImage:isChangeImage,
		hashScroll:hashScroll,
		isDebug:isDebug,
		getCookie:getCookie,
		getCookieValue:getCookieValue
	};
})();