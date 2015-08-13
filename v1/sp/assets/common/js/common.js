/*
* common.js v4.1.0
* Copyright (c) ULM design Co.,Ltd. - http://www.ulm-design.com
* Author: mitsut
* 
* add #line-btn
*/
/*******************************************************
	
common
	
********************************************************/
var Common =(function(){
	
	
	var _snsData =Config.getSnsData();
	var _snsURL = Config.getURL();
	var _naviData = Config.getNaviData();
	var _bannerData = Config.getBannerData();
	var _bannerDir = Config.getBannerDir();
	
	/*******************************************************
	
	init
	
	********************************************************/
	function init(){
		
		$(window).load(function(){
			
			if(_snsData){
				initSNS();
			}
			
			if(_bannerData){
				initBanner();
			}
		});
		return false;
	}
	
	
	
	/*******************************************************
	
	navi
	
	********************************************************/
	function initNavi(__id){
		
		var target=$("#navi");
		
		var txt ="<ul>";
		
		var len = _naviData.length;
		
		
		for(var i =0; i < len; i++){
			
			var list ="";
			var data = _naviData[i];
			if(data.id !=__id){
				if(!data.isSmall){
					list +="<li>";
				}else{
					list +="<li style=\"font-size:13px\">";
				}
					list += "<a href=\""+data.href+"\" target=\""+data.target+"\">";
					list += data.name;
					list +="</a>"
			}else{
				if(!data.isSmall){
					list +="<li class=\"selected\">";
				}else{
					list +="<li class=\"selected\" style=\"font-size:13px\">";
				}
				
				list +="<span>"+data.name+"</span>";
			}
			list += "</li>";
			
			txt +=list;
		}
		
		txt +="</ul>";
		
		target.html(txt);
	
	};
	
	
	
	
	/*******************************************************
	
	banner
	
	********************************************************/
	function initBanner(){
		
		var target = $("#banner-container");
		var txt ="";
		var len = _bannerData.length;
		
		for(var i =0; i < len; i++){
			
			var list ="";
			var data = _bannerData[i];
			
			list += "<li>";
			list += "<a href=\""+data.href+"\" target=\""+data.target+"\">";
			list += "<img src='"+_bannerDir+data.src+"' />";
			list += "</a>";
			list += "</li>";
			
			txt +=list;
		}
		
		txt +="</ul>";
		
		target.html(txt);
	
	};
	
	
	
	
	/*******************************************************
	
	sns
	
	********************************************************/
	function initSNS(){
		
		var target = $("#social-container");
		
		var txt ="";
		
		var len = _snsData.length;
		for(var i =0; i < len; i++){
			
			var list ="";
			var data = _snsData[i];
			
			switch(data.id){
				case "twitter":
					list +="<li class=\"social-btn\" id=\"twitter-btn\">";
					list += generateTwitter(_snsURL,data.text,data.isCount,data.hash);
				break;
				
				case "facebook-like":
					list +="<li class=\"social-btn\" id=\"facebook-btn\">";
					list += generateFBLike(data.appId,_snsURL,data.type,data.width,data.height);
				break;
				
				case "facebook-share":
					list +="<li class=\"social-btn\" id=\"facebook-btn\">";
					list += generateFBShare(_snsData,data.type);
				break;
				
				case "mixi-like":
					//__appId,__url,__isShowCount,__size,__width
					list +="<li class=\"social-btn\" id=\"mixi-btn\">";
					list += generateMixiLike(data.appId,_snsURL,data.isCount,data.size,data.width);
				break;
				
				case "mixi-check":
					//__appId,__url,__label
					list +="<li class=\"social-btn\" id=\"mixi-btn\">";
					list += generateMixiCheck(data.appId,_snsData,data.label);
				break;
				
				case "gree":
					list +="<li class=\"social-btn\" id=\"gree-btn\">";
					list += generateGree(_snsData);
				break;
				
				case "hatena":
					list +="<li class=\"social-btn\" id=\"hatena-btn\">";
					list +=generateHatena(_snsData,data.text);
				break;
				
				case "google":
					list +="<li class=\"social-btn\" id=\"google-btn\">";
					list +=generateGoogle(_snsURL,data.size);
				break;
				
				case "line":
					if( !data.isShow){
						$("#line-btn").remove();
					}
					/*
					list +="<li class=\"social-btn\" id=\"line-btn\">";
					list +=generateLine(_snsURL);
					*/
				break;
				
				default:
				break;
			}
			
			list +="</li>";
			txt +=list;
		}
		
		target.prepend(txt);
	}
	
	
	/*****************************************
	
	twitter
	
	*****************************************/
	function generateTwitter(__url,__text,__isCount,__hash){
		
		var include ='<script type=\"text/javascript\" src=\"http://platform.twitter.com/widgets.js\"></script>';
		var str ='<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\"';
		
		str +=__url;
		str +='\" data-text=\"'+__text+'\"';
		str +=' data-lang=\"ja\"';
				
		if(__isCount == false){
			str +=' data-count=\"none\"';
		}
		
		if(__hash !=null && __hash !=""){
			str += ' data-hashtags=\"'+__hash+'\"';
		}
		
		
				
		str +=" data-via='presidio00'>ツイート</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";
		
		str +=include;
		
		return str;
		
	}
	
	
	
	
	
	/*****************************************
	
	facebookShare
	
	*****************************************/
	function generateFBShare(__url,__type){
		
		var str ='<a name=\"fb_share\" share_url=\"'+__url+'\"';
		str +=' type=\"'+__type+'\"></a>';
		str +='<script src=\"http://static.ak.fbcdn.net/connect.php/js/FB.Share\" type=\"text/javascript\"></script>';
		
		return str;
	};
	
	
	
	
	
	
	/*****************************************
	
	facebookLike
	
	*****************************************/
	function generateFBLike(__appId,__url,__type,__width,__height){
		
		var _height;
		if(__type =='box_count'){
			_height =90;
		}else if(__type=="button_count"){
			_height=21;
		}else{
			_height =35;
		}
		
		
		var _w;
		if(__width !=null){
			_w =__width;
		}else{
			_w =120
		};
		
		var str ='<iframe src=\"//www.facebook.com/plugins/like.php?href='+__url+'&amp;send=false&amp;layout='+__type+'&amp;';
		str +='width='+_w+'&amp;';
		str +='show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;';
		str +='height='+__height+'&amp;';
		str +='appId='+__appId+'\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden;';
		str +=' width:'+_w+'px;';
		str +=' height:'+__height+'px\" allowTransparency=\"true\"></iframe>';
		
		return str;
	};
	
	
	
	
	
	
	
	/*****************************************
	
	GREE
	
	*****************************************/
	function generateGree(__url){
		
		var str ='<iframe src=\"http://share.gree.jp/share?url='+__url;
		str +='&type=0&height=20\"  scrolling=\"no\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"border:none; overflow:hidden; width:70px; height:20px;\" allowTransparency=\"true\"></iframe>';
		
		return str;
	};
	
	
	
	
	
	
	
	/*****************************************
	
	MIXI check
	
	*****************************************/
	function generateMixiCheck(__appId,__url,__label){
		
		var label;
		if(__label ==null){
			label ="チェック";
		}else{
			label = __label;
		}
		
		var str ='<script language=\"JavaScript\"><!--';
		str +='\n';
		str +='document.write(\'<a href=\"http://mixi.jp/share.pl\" class=\"mixi-check-button\" data-key=\"';
		str +=__appId+'\"';
		str +=' data-button=\"button-1\">'+label+'</a>\');'
		str +='\n';
		str +='// --></script><script type=\"text/javascript\" src=\"http://static.mixi.jp/js/share.js\"></script>';
          
		return str;
	};
	
	
	
	/*****************************************
	
	MIXI check(html)
	
	*****************************************/
	function generateMixiCheckHtml(__appId,__lebal){
		
		var appId =$('#mixi-check-id').val();
		
		var _lang=getRadioValue('.mixi-check-lang','rel');
		
		var label;
		if(__label ==null){
			label ="チェック";
		}else{
			label = __label;
		}
		
		var str ='<li class=\"float-left\" id=\"mixi-btn\"><a href=\"http://mixi.jp/share.pl\" class=\"mixi-check-button\" data-key=\"';
		str +=appId+'\"';
		str +=' data-button=\"button-1\">'+label+'</a>'
		str +='\n';
		str +='</script><script type=\"text/javascript\" src=\"http://static.mixi.jp/js/share.js\"></script>';
        str +='</li>';
		return str;
	};
	
	
	
	
	
	
	/*****************************************
	
	MIXI like
	
	*****************************************/
	function generateMixiLike(__appId,__url,__isShowCount,__size,__width){
		
		var appId =$('#mixi-like-id').val();
		
		var _showCount ='false';
		if(__isShowCount){
			_showCount ='true';
		}
		
		var _w;
		if(__width !=null){
			_w =__width
		}else{
			_w =80;
		};
		
		
		var _size;
		if(__size !=null){
			_size =__size;
		}else{
			_size ="medium";
		}
		
		
		var str ='<div data-plugins-type=\"mixi-favorite\"';
		str +=' data-service-key=\"'+__appId+'\"';
		str +=' data-href=\"'+decodeURIComponent(__url)+'\"';
		str +=' data-show-faces=\"false\"';
		str +=' data-size=\"'+_size+'\"';
		str +=' data-show-count=\"'+_showCount+'\"';
		str +=' data-show-comment=\"false\"';
		str +=' data-width=\"'+_w+'\"></div><script type=\"text/javascript\">(function(d) {var s = d.createElement(\'script\'); s.type = \'text/javascript\'; s.async = true;s.src = \'http://static.mixi.jp/js/plugins.js#lang=ja\';d.getElementsByTagName(\'head\')[0].appendChild(s);})(document);</script>';
		
		return str;
	};
	
	
	
	
	
	/*****************************************
	
	hatena
	
	*****************************************/
	function generateHatena(__url,__text){
		
		var str ='<a href=\"http://b.hatena.ne.jp/entry/'+decodeURIComponent(__url)+'\"';
		str +=' class=\"hatena-bookmark-button\"';
		str +=' data-hatena-bookmark-title=\"'+decodeURIComponent(__text)+'\"';
		str +=' data-hatena-bookmark-layout=\"'+_size+'\"';
		str +=' title=\"このエントリーをはてなブックマークに追加\"><img src=\"http://b.st-hatena.com/images/entry-button/button-only.gif\" alt=\"このエントリーをはてなブックマークに追加\" width=\"20\" height=\"20\" style=\"border: none;\" /></a><script type=\"text/javascript\" src=\"http://b.st-hatena.com/js/bookmark_button.js\" charset=\"utf-8\" async=\"async\"></script>';
          
		return str;
	};
	
	
	
	
	/*****************************************
	
	google
	
	*****************************************/
	function generateGoogle(__url,__size){
		
		if(__size !=null){
			_size =__size;
		}else{
			_size ="medium";
		}
		
		var str ='<g:plusone';
		str +=' size=\"'+__size+'\"';
		str +=' count=\"false\"';
		str +=' href=\"'+decodeURIComponent(__url)+'\"></g:plusone>\n';
		str +='<script type=\"text/javascript\">\n';
		str +='window.___gcfg = {lang: \'ja\'};';
		str +='(function() { var po = document.createElement(\'script\'); po.type = \'text/javascript\'; po.async = true;po.src = \'https://apis.google.com/js/plusone.js\';\n';
		str +='var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(po, s);})();</script>';
		
		return str;
	};
	
	
	
	/*****************************************
	
	line
	
	*****************************************/
	function generateLine(__url){
		
		/*
		var str ='<script type=\"text/javascript\" src=\"//media.line.naver.jp/js/line-button.js?v=20131101\"></script>';
		str +='<script type=\"text/javascript\">';
		str += 'new jp.naver.line.media.LineButton({\"pc\":true,\"lang\":\"ja\",\"type\":\"a\"})';
		str +=' </script>';
		*/
		
		return str;
	};
	
	
	return{
		init:init,
		initNavi:initNavi
	}
	
	
})();


$(document).ready( function() {							
	Common.init();
});