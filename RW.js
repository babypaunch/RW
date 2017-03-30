/*
* ---------- usage ----------
* RW.width(180, "section > article");
* $(window).resize(function(){
*     RW.width(180, "section > article");
* }
* ---------- usage ----------
*/
var RW = {
	setMin: function(width){
		return "min-width: " + width + "px";
	} //end: setMin: function(width){

	, setMax: function(width){
		return "max-width: " + (width - 1) + "px";
	} //end: , setMax: function(width){

	, media: function(min, max, element, ratio){
		var css = "";
		if(min === 0 || max === 0){
			if(min === 0){ //최저
				css += "@media all and (" + this.setMax(max) + ") {\n";
			}else{ //최대
				css += "@media all and (" + this.setMin(min) + ") {\n";
			}
		}else{ //중간
			css += "@media all and (" + this.setMin(min) + ") and (" + this.setMax(max) + ") {\n";
		}
		css += "\t" + element + " {\n"
			+ "\t\twidth: calc(" + ratio + "% - 20px);\n"
			+ "\t}\n";
		return css + "}\n";
	} //end: , media: function(min, max, element, ratio){

	, width: function(width, element){
		var wiw = window.innerWidth;
		var MIN = 3;
		var max = parseInt(wiw / width);
		var style = "";

		for(var i = 0; i < max; i++){
			var ratio = 100 / (i + 2);
			if(i !== 0 && i !== max - 1){ //중간
				style += this.media(width * (i + 2), width * (i + MIN), element, ratio);
			}else{
				if(i === 0){ //최저
					style += this.media(0, width * MIN, element, ratio);
				}else{ //최대
					style += this.media(width * (max + 1), 0, element, ratio);
				}
			}
		}
		
		var $rwCardUi = $("#RW-CARD-UI");
		if($rwCardUi.length === 0){
			$("head").append("<style id='RW-CARD-UI'>\n" + style + "</style>\n");
		}else{
			$rwCardUi.html(style);
		}
	} //end: , width: function(width, element){
}; //end: RW
