/*
*
* config.js v2.0.0
* Copyright (c) ULM design Co.,Ltd. - http://www.ulm-design.com
* 
*/
var Config =(function(){
	
	var IS_SAVE_IMG = true;
	
	/*******************************************************
	
	navi
	
	********************************************************/
	var NAVI_DATA =[
		//{id:"trailer",name:"予告編",href:"http://youtu.be/*********************",target:"_parent",isSmall:false},
		//{id:"introduction",name:"イントロダクション",href:"intro.html",target:"_parent",isSmall:false},
		//{id:"story",name:"ストーリー",href:"story.html",target:"_parent",isSmall:false},
		//{id:"news",name:"ニュース",href:"************************",target:"_blank",isSmall:false},
		//{id:"twitter",name:"公式Twitter",href:"https://twitter.com/****************",target:"_blank",isSmall:false},
		//{id:"facebook",name:"公式Facebook",href:"https://www.facebook.com/***************",target:"_blank",isSmall:false},
		{id:"top",name:"トップ",href:"./index.html",target:"_parent"}
	];
	
	
	/*******************************************************
	
	SNS
	
	********************************************************/
	var SNS_URL ="http://miche-project.com/";
	var SNS_DATA =[
		{id:"twitter",text:"史上最高額のトレジャー・ハンティング!!『ミケランジェロ・プロジェクト』11.6 Fri. ROADSHOW",isCount:true,hash:""},
		{id:"facebook-like",appId:"382745948588175",type:"button_count"/*box_count,standard*/,width:120,height:21},
		//{id:"facebook-share",type:"button_count"/*button,icon,box_count*/},
		//{id:"mixi-like",appId:"***********************************",isCount:false,size:"medium"/*large*/,width:80},
		//{id:"mixi-check",appId:"***************",label:"チェック"},
		//{id:"gree"},
		//{id:"hatena",text:"ここにテキスト"},
		//{id:"google",size:"medium"/*small , standard , tall*/,isCount:'none'},
		{id:"line",isShow:true}
	];
	
	
	/*******************************************************
	
	banner
	 
	******************** ************************************/
	var BANNER_DIR ="assets/img/banner/"
	var BANNER_DATA =[
		//{ src:"b0.jpg",href:"http://***********",target:"_blank"}
	];

	
	function getNaviData(){
		return NAVI_DATA;
	};
	
	function getURL(){
		return SNS_URL;
	};
	
	function getSnsData(){
		return SNS_DATA;
	};
	
	function getBannerData(){
		return BANNER_DATA;
	};
	
	function getBannerDir(){
		return BANNER_DIR;
	}
	
	
	function getIsSaveImg(){
		return IS_SAVE_IMG;
	}
	
	return {
		getNaviData:getNaviData,
		getURL:getURL,
		getSnsData:getSnsData,
		getBannerData:getBannerData,
		getBannerDir:getBannerDir,
		getIsSaveImg:getIsSaveImg
	}


})();