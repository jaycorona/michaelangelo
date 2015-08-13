var Common =(function(){
	
	
  	var _isVisited = false;
	var _ua;
	
	
	/*******************************************************
	
	@init
	
	********************************************************/
	function init(){
		
		Utils.init();
		_ua = Utils.getBrowser();
		
		if(_ua.iOS != true && _ua.name !="Android"){
			changeImg();
		};
	};
	
	
	return{
		init:init
	}
	
})();


$(document).ready(function(e) {
    Common.init();
});


