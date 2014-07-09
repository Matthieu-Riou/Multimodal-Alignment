ProgressBar.Orientation={
	Horizontal:0,Vertical:1
};
ProgressBar.Direction={
	LeftToRight:0,
	RightToLeft:1,
	TopToBottom:0,
	BottomToTop:1
};
ProgressBar.AnimationStyle={
	None:0,
	Static:1,
	StaticFull:2,
	Custom:3,
	CustomFull:4,
	Flickering1:10,
	Flickering2:11,
	Flickering3:12,
	LeftToRight1:20,
	LeftToRight2:21,
	RightToLeft1:22,
	RightToLeft2:23,
	TwoWay:24
};
ProgressBar.AnimationSmoothness={
	None:0,
	Smooth1:1,
	Smooth2:2,
	Smooth3:3,
	Smooth4:4
};
ProgressBar.CreationType={
	Replace:0,
	AppendChild:1
};

function ProgressBar(a,b){
	var i=0;
	var c=this;
	this.isLoaded=false;
	this.animation={
		opacity:1,
		opacityDirection:-1,
		isInitialized:false,
		markerPosition:0,
		markerDirection:1,
		timerId:null,
		smoothTimerId:null,
		smoothProgressSteps:[]
	};
	this.displayType=0;
	this.progress=0.0;
	this.progressPosition=0;
	this.borderWidth={
		left:0,
		right:0,
		top:0,
		bottom:0
	};
	this.orientation=(b.orientation||ProgressBar.Orientation.Horizontal);
	this.direction=(b.direction||ProgressBar.Direction.LeftToRight);
	this.creationType=(b.creationType||ProgressBar.CreationType.Replace);
	this.value=0;this.initialValue=(b.value||0);this.minValue=(b.minValue||0);
	this.maxValue=(b.maxValue||100);
	this.showLabel=(typeof b.showLabel=="undefined"?true:b.showLabel);
	this.labelText=(b.labelText||'');
	this.width=(b.width||300);
	this.height=(b.height||20);
	this.borderRadius=(b.borderRadius||0);
	if(this.orientation==ProgressBar.Orientation.Horizontal&&this.borderRadius>this.height/2)
		this.borderRadius=Math.round(this.height/2);
	if(this.orientation==ProgressBar.Orientation.Vertical&&this.borderRadius>this.width/2)
		this.borderRadius=Math.round(this.width/2);
		this.imageUrl=(b.imageUrl||'');
		this.markerUrl=(b.markerUrl||'');
		this.backgroundUrl=(b.backgroundUrl||'');
		this.animationStyle=(b.animationStyle||ProgressBar.AnimationStyle.None);
		this.animationSpeed=(b.animationSpeed||1.0);
		this.animationInterval=(b.animationInterval||100);
		this.animationSmoothness=(b.animationSmoothness||ProgressBar.AnimationSmoothness.None);
		var d=["parent","background","wrapper","left","middle","right","horizontalText","verticalText","marker"];
		this.extraClassName={};
		for(i=0;i<d.length;i++){
			if(!b.extraClassName){
				this.extraClassName[d[i]]=""
			}
			else if(typeof b.extraClassName=="string"){
				this.extraClassName[d[i]]=b.extraClassName
			}
			else{
				this.extraClassName[d[i]]=(b.extraClassName[d[i]]||"")
			}
		}
		this.onLoad=(b.onLoad||null);
		this.onValueChanged=(b.onValueChanged||null);
		this.onAnimationStyleChanged=(b.onAnimationStyleChanged||null);
		this.onAnimate=(b.onAnimate||null);
		if(this.creationType==ProgressBar.CreationType.Replace){
			this.parentElement=document.getElementById(a)
		}
		else{
			this.parentElement=document.createElement("DIV");
			document.getElementById(a).appendChild(this.parentElement)
		}
		this.image=new Image();
		this.image.onload=function(){
			c.finishLoading()
		};
			this.image.src=this.imageUrl
	}
	ProgressBar.prototype.finishLoading=function(){
		if(!this.image.width||!this.image.width)
		return;
		var a="";
		this.wrapperElement=null;
		this.backgroundElement=null;
		this.valueElement=null;
		this.leftElement=null;
		this.middleElement=null;
		this.rightElement=null;
		this.backgroundElement=document.createElement("DIV");
		this.backgroundElement.className="progressbar_background"+(this.extraClassName.background?" ":"")+this.extraClassName.background;
		this.backgroundElement.style.cssText=this.backgroundElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius);
		this.parentElement.appendChild(this.backgroundElement);
		var b=["border-radius","border-bottom-right-radius","-moz-border-radius-bottomright","-webkit-border-bottom-right-radius","-khtml-border-radius-bottomright","-khtml-border-bottom-right-radius"];
		var i=0,temp="";
		for(i=0;i<b.length;i++){
			temp=ProgressBar._elementCurrentStyle(this.backgroundElement,b[i]);
			if(temp||typeof temp=="string")
				break
		}
		if(temp!=""&&ProgressBar._parseInt(temp)!=this.borderRadius)
			this.borderRadius=ProgressBar._parseInt(temp);
			if((this.orientation==ProgressBar.Orientation.Horizontal&&this.image.width>=this.width)||(this.orientation==ProgressBar.Orientation.Vertical&&this.image.height>=this.height)){
				this.displayType=0
			}
			else{
				this.displayType=1
			}
			this.parentElement.className=(this.parentElement.className!=""?" ":"")+"progressbar_parent"+(this.extraClassName.parent?" ":"")+this.extraClassName.parent;
			if(this.displayType==0){
				this.wrapperElement=document.createElement("DIV");
				this.wrapperElement.className="progressbar_wrapper"+(this.extraClassName.wrapper?" ":"")+this.extraClassName.wrapper;this.wrapperElement.style.cssFloat="left";
				this.wrapperElement.style.float="left";
				this.wrapperElement.style.display="inline-block";
				this.wrapperElement.style.width=this.width+"px";
				this.wrapperElement.style.height=this.height+"px";
				this.wrapperElement.style.left="0px";
				this.wrapperElement.style.top=(-this.height)+"px";
				this.wrapperElement.style.backgroundImage="url('"+this.imageUrl+"')";
				this.wrapperElement.style.backgroundRepeat="no-repeat";
				this.wrapperElement.style.position="relative";
				this.wrapperElement.style.cssText=this.wrapperElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius);
				this.parentElement.appendChild(this.wrapperElement);
				this.borderWidth={left:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.wrapperElement,"border-left-width")),right:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.wrapperElement,"border-right-width")),top:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.wrapperElement,"border-top-width")),bottom:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.wrapperElement,"border-bottom-width"))}}else if(this.displayType==1){if(this.orientation==ProgressBar.Orientation.Horizontal){if(this.image.width<this.borderRadius)this.borderRadius=this.image.width;if(this.borderRadius>this.width/2)this.borderRadius=this.width}else if(this.orientation==ProgressBar.Orientation.Vertical){if(this.image.height<this.borderRadius)this.borderRadius=this.image.height;if(this.borderRadius>this.height/2)this.borderRadius=this.height}this.valueElement=document.createElement("DIV");this.valueElement.className="";this.leftElement=document.createElement("DIV");this.middleElement=document.createElement("DIV");this.rightElement=document.createElement("DIV");this.leftElement.className="progressbar_left"+(this.extraClassName.left?" ":"")+this.extraClassName.left;this.middleElement.className="progressbar_middle"+(this.extraClassName.middle?" ":"")+this.extraClassName.middle;this.rightElement.className="progressbar_right"+(this.extraClassName.right?" ":"")+this.extraClassName.right;this.leftElement.style.cssFloat="left";this.leftElement.style.float="left";this.leftElement.style.display="inline-block";this.leftElement.style.backgroundImage="url('"+this.imageUrl+"')";this.leftElement.style.backgroundRepeat="no-repeat";this.leftElement.style.position="relative";this.rightElement.style.cssFloat="right";this.rightElement.style.float="right";this.rightElement.style.display="inline-block";this.rightElement.style.backgroundImage="url('"+this.imageUrl+"')";this.rightElement.style.backgroundRepeat="no-repeat";this.rightElement.style.position="relative";this.middleElement.style.cssFloat="left";this.middleElement.style.float="left";this.middleElement.style.display="inline-block";this.middleElement.style.margin="0px";this.middleElement.style.overflow="hidden";this.middleElement.style.position="relative";this.valueElement.style.backgroundImage="url('"+this.imageUrl+"')";this.valueElement.style.position="relative";if(this.orientation==ProgressBar.Orientation.Horizontal){this.leftElement.style.width=this.borderRadius+"px";this.leftElement.style.height=this.height+"px";this.leftElement.style.top=-this.height+"px";this.leftElement.style.left="0px";this.leftElement.style.borderRight='none';this.leftElement.style.cssText=this.leftElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,0,0,this.borderRadius);this.rightElement.style.width=this.borderRadius+"px";this.rightElement.style.height=this.height+"px";this.rightElement.style.top=-this.height+"px";this.rightElement.style.borderLeft='none';this.rightElement.style.backgroundPosition=this.borderRadius+'px 0px';this.rightElement.style.cssText=this.rightElement.style.cssText+ProgressBar._createBorderRadiusCss(0,this.borderRadius,this.borderRadius,0);this.middleElement.style.width=(this.width-(this.borderRadius*2))+"px";this.middleElement.style.height=this.height+"px";this.middleElement.style.top=-this.height+"px";this.valueElement.style.width="0px";this.valueElement.style.height=this.height+"px"}else if(this.orientation==ProgressBar.Orientation.Vertical){this.leftElement.style.width=this.width+"px";this.leftElement.style.height=this.borderRadius+"px";this.leftElement.style.top=(-this.height)+"px";this.leftElement.style.left="0px";this.leftElement.style.borderBottom='none';this.leftElement.style.cssText=this.leftElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,this.borderRadius,0,0);this.rightElement.style.width=this.width+"px";this.rightElement.style.height=this.borderRadius+"px";this.rightElement.style.top=(-this.height)+"px";this.rightElement.style.left="0px";this.rightElement.style.borderTop='none';this.rightElement.style.backgroundPosition='0px '+this.borderRadius+'px';this.rightElement.style.cssText=this.rightElement.style.cssText+ProgressBar._createBorderRadiusCss(0,0,this.borderRadius,this.borderRadius);this.middleElement.style.width=this.width+"px";this.middleElement.style.height=this.height-this.borderRadius*2+"px";this.middleElement.style.top=(-this.height)+"px";this.middleElement.style.left="0px";this.middleElement.style.borderTop='none';this.middleElement.style.borderBottom='none';this.valueElement.style.width=this.width+"px";this.valueElement.style.height="0px"}this.middleElement.appendChild(this.valueElement);this.parentElement.appendChild(this.leftElement);this.parentElement.appendChild(this.middleElement);this.parentElement.appendChild(this.rightElement);if(this.orientation==ProgressBar.Orientation.Horizontal){if(this.borderRadius==0){this.middleElement.style.borderLeftWidth=ProgressBar._elementCurrentStyle(this.leftElement,'border-left-width');this.middleElement.style.borderLeftStyle=ProgressBar._elementCurrentStyle(this.leftElement,'border-left-style');this.middleElement.style.borderLeftColor=ProgressBar._elementCurrentStyle(this.leftElement,'border-left-color');this.middleElement.style.borderRightWidth=ProgressBar._elementCurrentStyle(this.rightElement,'border-right-width');this.middleElement.style.borderRightStyle=ProgressBar._elementCurrentStyle(this.rightElement,'border-right-style');this.middleElement.style.borderRightColor=ProgressBar._elementCurrentStyle(this.rightElement,'border-right-color');this.leftElement.style.display='none';this.rightElement.style.display='none'}else{this.middleElement.style.borderLeft='none';this.middleElement.style.borderRight='none'}}if(this.orientation==ProgressBar.Orientation.Horizontal){this.borderWidth={left:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.leftElement,"border-left-width")),right:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.rightElement,"border-right-width")),top:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.middleElement,"border-top-width")),bottom:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.middleElement,"border-bottom-width"))}}else if(this.orientation==ProgressBar.Orientation.Vertical){this.borderWidth={left:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.middleElement,"border-left-width")),right:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.middleElement,"border-right-width")),top:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.leftElement,"border-top-width")),bottom:ProgressBar._parseInt(ProgressBar._elementCurrentStyle(this.rightElement,"border-bottom-width"))}}}this.parentElement.style.width=(this.width+this.borderWidth.left+this.borderWidth.right)+"px";this.parentElement.style.height=(this.height+this.borderWidth.top+this.borderWidth.bottom)+"px";this.backgroundElement.style.cssFloat="left";this.backgroundElement.style.float="left";this.backgroundElement.style.display="inline-block";this.backgroundElement.style.width=(this.width+this.borderWidth.left+this.borderWidth.right)+"px";this.backgroundElement.style.height=this.height+"px";if(this.backgroundUrl!='')this.backgroundElement.style.backgroundImage="url('"+this.backgroundUrl+"')";this.backgroundElement.style.position="relative";if(this.displayType==0)this.backgroundElement.style.width=(this.width+this.borderWidth.left+this.borderWidth.right)+"px";this.backgroundElement.style.top=this.borderWidth.top+"px";this.markerElement=document.createElement("DIV");this.markerElement.className="progressbar_marker"+(this.extraClassName.marker?" ":"")+this.extraClassName.marker;this.markerElement.style.display="inline-block";this.markerElement.style.zoom="1.0";this.markerElement.style.width=this.width+"px";this.markerElement.style.height=this.height+"px";this.markerElement.style.top=(-this.height*2-this.borderWidth.top)+"px";this.markerElement.style.left=this.borderWidth.left+"px";if(this.markerUrl!='')this.markerElement.style.backgroundImage="url('"+this.markerUrl+"')";this.markerElement.style.lineHeight=(this.height)+"px";this.markerElement.style.position="relative";this.parentElement.appendChild(this.markerElement);this.textElement=document.createElement("DIV");if(this.orientation==ProgressBar.Orientation.Horizontal){this.textElement.className="progressbar_text_horizontal"+(this.extraClassName.horizontalText?" ":"")+this.extraClassName.horizontalText}else{this.textElement.className="progressbar_text_vertical"+(this.extraClassName.verticalText?" ":"")+this.extraClassName.verticalText}this.textElement.style.display="inline-block";this.textElement.style.width=this.width+"px";this.textElement.style.height=this.height+"px";this.textElement.style.top=(-this.height*2-this.height-this.borderWidth.top)+"px";this.textElement.style.left=this.borderWidth.left+"px";this.textElement.style.lineHeight=(this.height)+"px";this.textElement.style.position="relative";this.parentElement.appendChild(this.textElement);this.isLoaded=true;this.setAnimationStyle(this.animationStyle);this.setValue(this.initialValue);if(this.onLoad!=null)this.onLoad()};ProgressBar.prototype.setValue=function(a){if(a!==null&&a<this.minValue)a=this.minValue;if(a!==null&&a>this.maxValue)a=this.maxValue;if(a!==null&&this.animationSmoothness!=ProgressBar.AnimationSmoothness.None){if(this.animation.smoothTimerId!=null)clearInterval(this.animation.smoothTimerId);this.animation.smoothProgressSteps=[];var b=this.value;var i=a-this.value,j=0;while(Math.abs(i)>1){if(this.animationSmoothness==ProgressBar.AnimationSmoothness.Smooth1){j=i/2;if(Math.abs(j)>Math.abs(this.maxValue-this.minValue)*0.1)j=(j>0?1:-1)*Math.abs(this.maxValue-this.minValue)*0.1}else if(this.animationSmoothness==ProgressBar.AnimationSmoothness.Smooth2){j=i/3;if(Math.abs(j)>Math.abs(this.maxValue-this.minValue)*0.1)j=(j>0?1:-1)*Math.abs(this.maxValue-this.minValue)*0.1}else if(this.animationSmoothness==ProgressBar.AnimationSmoothness.Smooth3){j=i/4;if(Math.abs(j)>Math.abs(this.maxValue-this.minValue)*0.1)j=(j>0?1:-1)*Math.abs(this.maxValue-this.minValue)*0.1}else if(this.animationSmoothness==ProgressBar.AnimationSmoothness.Smooth4){j=i/4;if(Math.abs(j)>Math.abs(this.maxValue-this.minValue)*0.2)j=(j>0?1:-1)*Math.abs(this.maxValue-this.minValue)*0.2}else{break}this.animation.smoothProgressSteps.push(b+j);b=b+j;i=a-b}this.animation.smoothProgressSteps.push(a);this.animation.smoothProgressSteps.reverse();var c=this;this.animation.smoothTimerId=setInterval(function(){c.setValue(null)},this.animationInterval);return}if(a===null){if(this.animation.smoothProgressSteps.length>0)this.value=this.animation.smoothProgressSteps.pop();if(this.animation.smoothProgressSteps.length==0&&this.animation.smoothTimerId!=null)clearInterval(this.animation.smoothTimerId)}else{this.value=a}if(this.isLoaded){var d=0.0;if(this.orientation==ProgressBar.Orientation.Horizontal){d=(this.value/this.maxValue)*this.width;this.progressPosition=d;if(this.displayType==0){if(this.direction==ProgressBar.Direction.LeftToRight){this.wrapperElement.style.backgroundPosition=(-this.image.width+d)+"px 0px"}else{this.wrapperElement.style.backgroundPosition=(this.width-d)+"px 0px"}}else if(this.displayType==1){if(this.direction==ProgressBar.Direction.LeftToRight){if(d<=this.borderRadius){this.leftElement.style.backgroundPosition=(-this.image.width+d)+"px 0px";this.rightElement.style.backgroundPosition=(-this.image.width)+"px 0px";this.valueElement.style.width="0px"}else if(d>=this.width-this.borderRadius){this.leftElement.style.backgroundPosition="0px 0px";this.rightElement.style.backgroundPosition=(-this.image.width-(this.width-d-this.borderRadius))+"px 0px";this.valueElement.style.width=this.middleElement.style.width}else{this.leftElement.style.backgroundPosition="0px 0px";this.rightElement.style.backgroundPosition=(-this.image.width)+"px 0px";this.valueElement.style.width=(d-this.borderRadius)+"px"}}else{if(d<=this.borderRadius){this.leftElement.style.backgroundPosition=(this.image.width)+"px 0px";this.rightElement.style.backgroundPosition=(this.image.width-d)+"px 0px";this.valueElement.style.width="0px"}else if(d>=this.width-this.borderRadius){this.leftElement.style.backgroundPosition=(this.width-d)+"px 0px";this.rightElement.style.backgroundPosition="0px 0px";this.valueElement.style.left="0px";this.valueElement.style.width=this.middleElement.style.width}else{this.leftElement.style.backgroundPosition=this.image.width+"px 0px";this.rightElement.style.backgroundPosition="0px 0px";this.valueElement.style.left=(this.width-d-this.borderRadius)+"px";this.valueElement.style.width=(d-this.borderRadius)+"px"}}}if(d>0){if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull){this.markerElement.style.width=d+"px"}else{this.markerElement.style.width=this.width+"px"}if(this.animationStyle!=ProgressBar.AnimationStyle.None)this.markerElement.style.visibility="visible"}else{this.markerElement.style.width=this.width+"px";if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull)this.markerElement.style.visibility="hidden"}if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull){if(this.direction==ProgressBar.Direction.LeftToRight){this.markerElement.style.left=this.borderWidth.left+"px"}else{this.markerElement.style.left=(this.width-d+this.borderWidth.left)+"px"}}else{this.markerElement.style.left=this.borderWidth.left+"px"}var e=(-this.height*2-this.height-this.borderWidth.top);var f=(-this.height*2-this.borderWidth.top);if(d==0||this.width==d){this.textElement.style.top=e+"px";this.markerElement.style.top=f+"px";this.markerElement.style.height=this.height+"px";this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius)}else if(d<this.borderRadius){var g=this.height-2.25*(this.borderRadius-Math.sqrt(Math.pow(this.borderRadius,2)-Math.pow(this.borderRadius-d,2)));var h=f+(this.height/2)-(g/2);var k=e-2*(f-h);this.textElement.style.top=k+"px";this.markerElement.style.top=h+"px";this.markerElement.style.height=g+"px";if(this.direction==ProgressBar.Direction.LeftToRight){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,0,0,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(0,this.borderRadius,this.borderRadius,0)}}else if(this.width-d<this.borderRadius){var l=((this.borderRadius-(this.width-d))*2+(this.borderRadius-Math.sqrt(Math.pow(this.borderRadius,2)-Math.pow(this.borderRadius-(this.width-d),2))))/3;if(this.direction==ProgressBar.Direction.LeftToRight){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,l,l,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(l,this.borderRadius,this.borderRadius,l)}}else{this.textElement.style.top=e+"px";this.markerElement.style.top=f+"px";this.markerElement.style.height=this.height+"px";if(this.direction==ProgressBar.Direction.LeftToRight){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,0,0,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(0,this.borderRadius,this.borderRadius,0)}}}else if(this.orientation==ProgressBar.Orientation.Vertical){d=(this.value/this.maxValue)*this.height;this.progressPosition=d;if(this.displayType==0){if(this.direction==ProgressBar.Direction.TopToBottom){this.wrapperElement.style.backgroundPosition="0px "+(d-this.image.height)+"px"}else{this.wrapperElement.style.backgroundPosition="0px "+(this.height-d)+"px"}}else if(this.displayType==1){if(this.direction==ProgressBar.Direction.TopToBottom){if(d<=this.borderRadius){this.leftElement.style.backgroundPosition="0px "+(-this.image.height+d)+"px";this.rightElement.style.backgroundPosition="0px "+(-this.image.height)+"px";this.valueElement.style.height="0px"}else if(d>=this.height-this.borderRadius){this.leftElement.style.backgroundPosition="0px 0px";this.rightElement.style.backgroundPosition="0px "+(-this.image.height-(this.height-d-this.borderRadius))+"px";this.valueElement.style.height=this.middleElement.style.height}else{this.leftElement.style.backgroundPosition="0px 0px";this.rightElement.style.backgroundPosition="0px "+(-this.image.height)+"px";this.valueElement.style.height=(d-this.borderRadius)+"px"}}else{if(d<=this.borderRadius){this.leftElement.style.backgroundPosition="0px "+(this.borderRadius)+"px";this.rightElement.style.backgroundPosition="0px "+(this.borderRadius-d)+"px";this.valueElement.style.height="0px"}else if(d>=this.height-this.borderRadius){this.leftElement.style.backgroundPosition="0px "+(this.height-d)+"px";this.rightElement.style.backgroundPosition="0px 0px";this.valueElement.style.top="0px";this.valueElement.style.height=this.middleElement.style.height}else{this.leftElement.style.backgroundPosition="0px "+this.borderRadius+"px";this.rightElement.style.backgroundPosition="0px 0px";this.valueElement.style.top=(this.height-d-this.borderRadius)+"px";this.valueElement.style.height=(d+this.borderRadius*2)+"px"}}}if(d>0){if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull){this.markerElement.style.height=d+"px"}else{this.markerElement.style.height=this.height+"px";this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius)}if(this.animationStyle!=ProgressBar.AnimationStyle.None)this.markerElement.style.visibility="visible"}else{this.markerElement.style.height=0+"px";if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull)this.markerElement.style.visibility="hidden"}var m=this.borderWidth.left;var n=this.borderWidth.left;if(d==0||this.height==d){this.markerElement.style.left=n+"px";this.markerElement.style.width=this.width+"px";this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius)}else if(d<this.borderRadius){var o=2.5*d;if(o>this.width)o=this.width;var p=n+(this.width/2)-(o/2);this.markerElement.style.left=p+"px";this.markerElement.style.width=o+"px";if(this.direction==ProgressBar.Direction.BottomToTop){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(0,0,this.borderRadius,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,this.borderRadius,0,0)}}else if(this.height-d<this.borderRadius){var l=((this.borderRadius-(this.height-d))*2+(this.borderRadius-Math.sqrt(Math.pow(this.borderRadius,2)-Math.pow(this.borderRadius-(this.height-d),2))))/3;if(this.direction==ProgressBar.Direction.BottomToTop){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(l,l,this.borderRadius,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,this.borderRadius,l,l)}}else{this.markerElement.style.left=n+"px";this.markerElement.style.width=this.width+"px";if(this.direction==ProgressBar.Direction.BottomToTop){this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(0,0,this.borderRadius,this.borderRadius)}else{this.markerElement.style.cssText=this.markerElement.style.cssText+ProgressBar._createBorderRadiusCss(this.borderRadius,this.borderRadius,0,0)}}if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull){this.textElement.style.top=-(this.height*2+d+this.borderWidth.top)+"px"}else{this.textElement.style.top=-(this.height*3+this.borderWidth.top)+"px"}if(this.animationStyle!=ProgressBar.AnimationStyle.StaticFull&&this.animationStyle!=ProgressBar.AnimationStyle.CustomFull){if(this.direction==ProgressBar.Direction.TopToBottom){this.markerElement.style.top=(-this.height*2-this.borderWidth.top)+"px"}else{this.markerElement.style.top=(-this.height-d-this.borderWidth.top)+"px"}}else{this.markerElement.style.top=(-this.height*2-this.borderWidth.top)+"px"}}this.progress=(this.value/this.maxValue);if(this.showLabel){this.textElement.style.display="";if(this.labelText!=""){var q=this.labelText;if(q.indexOf("{value")!=-1){var i=0;while(q.indexOf("{value}")!=-1)q=q.replace("{value}",this.value);while(q.indexOf("{value,")!=-1){var r=q;r=r.substr(r.indexOf("{value,")+7);r=r.substr(0,r.indexOf("}"));var s="";if(parseInt(r)>0){s=String(Math.round(this.value*Math.pow(10,parseInt(r)))/Math.pow(10,parseInt(r)));if(s.indexOf(".")==-1)s+=".";var t=s.substr(s.indexOf(".")+1).length;if(t<parseInt(r))for(i=t;i<parseInt(r);i++)s+="0"}else{s=Math.round(this.value)}q=q.replace("{value,"+r+"}",s)}}while(q.indexOf("{progress}")!=-1)q=q.replace("{progress}",Math.round((this.value/this.maxValue)*100));this.textElement.innerHTML=q}else{this.textElement.innerHTML=Math.round((this.value/this.maxValue)*100)+"%"}}else{this.textElement.style.display="none"}}if(this.onValueChanged!=null)this.onValueChanged()};ProgressBar.prototype.setForeground=function(a){this.imageUrl=a;if(this.isLoaded){this.image=new Image();this.image.src=this.imageUrl;if(this.displayType==0){this.wrapperElement.style.backgroundImage="url('"+this.imageUrl+"')"}else{this.leftElement.style.backgroundImage="url('"+this.imageUrl+"')";this.rightElement.style.backgroundImage="url('"+this.imageUrl+"')";this.valueElement.style.backgroundImage="url('"+this.imageUrl+"')"}this.setValue(this.value)}};ProgressBar.prototype.setBackground=function(a){this.backgroundUrl=a;if(this.isLoaded){this.backgroundElement.style.backgroundImage="url('"+this.backgroundUrl+"')";this.setValue(this.value)}};ProgressBar.prototype.setMarkerImage=function(a){this.markerUrl=a;if(this.isLoaded){this.markerElement.style.backgroundImage="url('"+this.markerUrl+"')";this.setValue(this.value)}};ProgressBar.prototype.setAnimationStyle=function(a){this.animation.isInitialized=false;this.animationStyle=(a||ProgressBar.AnimationStyle.None);if(this.animationStyle==ProgressBar.AnimationStyle.None){this.markerElement.style.visibility="hidden"}else{this.markerElement.style.visibility="visible"}this.animation.opacity=1;this.markerElement.style.opacity=this.animation.opacity;this.markerElement.style.backgroundPosition="0px 0px";if(this.animationStyle==ProgressBar.AnimationStyle.Flickering1||this.animationStyle==ProgressBar.AnimationStyle.Flickering2||this.animationStyle==ProgressBar.AnimationStyle.Flickering3){this.markerElement.style.backgroundRepeat="repeat";this.animation.markerPosition=0;this.animation.opacity=0.5}else if(this.animationStyle==ProgressBar.AnimationStyle.LeftToRight1||this.animationStyle==ProgressBar.AnimationStyle.LeftToRight2||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft1||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft2||this.animationStyle==ProgressBar.AnimationStyle.TwoWay){if(this.animationStyle==ProgressBar.AnimationStyle.LeftToRight1||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft1||this.animationStyle==ProgressBar.AnimationStyle.TwoWay){this.markerElement.style.backgroundRepeat="no-repeat"}else{this.markerElement.style.backgroundRepeat="repeat"}if(this.orientation==ProgressBar.Orientation.Horizontal){this.animation.markerPosition=-this.image.width}else{this.animation.markerPosition=-this.image.height}this.animation.opacity=0.5}else{this.markerElement.style.backgroundRepeat="repeat"}if(this.animation.timerId!=null)clearInterval(this.animation.timerId);this.setValue(this.value);if(this.onAnimationStyleChanged)this.onAnimationStyleChanged();if(this.animationStyle!=ProgressBar.AnimationStyle.None){var b=this;this.animation.timerId=setInterval(function(){b.blink()},this.animationInterval)}};ProgressBar.prototype.blink=function(){this.animation.isInitialized=true;if(this.onAnimate)this.onAnimate();if(this.animationStyle==ProgressBar.AnimationStyle.Flickering1||this.animationStyle==ProgressBar.AnimationStyle.Flickering2||this.animationStyle==ProgressBar.AnimationStyle.Flickering3){var a=null;if(this.animationStyle==ProgressBar.AnimationStyle.Flickering1)a={step:0.05,growSpeed:3,decSpeed:1,maxOpacity:0.75,minOpacity:0.2};if(this.animationStyle==ProgressBar.AnimationStyle.Flickering2)a={step:0.05,growSpeed:1,decSpeed:1,maxOpacity:0.75,minOpacity:0.2};if(this.animationStyle==ProgressBar.AnimationStyle.Flickering3)a={step:0.05,growSpeed:1,decSpeed:3,maxOpacity:0.75,minOpacity:0.2};a.step=a.step*this.animationSpeed;if(this.animation.opacity<0)this.animation.opacity=0;if(this.animation.opacity>1)this.animation.opacity=1;this.animation.opacity+=a.step*this.animation.opacityDirection*(this.animation.opacityDirection>0?a.growSpeed:a.decSpeed);if(this.animation.opacity>=a.maxOpacity||this.animation.opacity<=a.minOpacity){this.animation.opacityDirection=-this.animation.opacityDirection;if(this.animation.opacity>a.maxOpacity)this.animation.opacity=a.maxOpacity;if(this.animation.opacity<a.minOpacity)this.animation.opacity=a.minOpacity}this.markerElement.style.opacity=this.animation.opacity}else if(this.animationStyle==ProgressBar.AnimationStyle.LeftToRight1||this.animationStyle==ProgressBar.AnimationStyle.LeftToRight2||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft1||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft2||this.animationStyle==ProgressBar.AnimationStyle.TwoWay){if(this.orientation==ProgressBar.Orientation.Horizontal){if(this.animationStyle==ProgressBar.AnimationStyle.LeftToRight1||this.animationStyle==ProgressBar.AnimationStyle.LeftToRight2){this.animation.markerPosition+=20*this.animationSpeed;if(this.animation.markerPosition>this.width*2)this.animation.markerPosition=-this.image.width}else if(this.animationStyle==ProgressBar.AnimationStyle.RightToLeft1||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft2){this.animation.markerPosition-=20*this.animationSpeed;if(this.animation.markerPosition<-this.image.width)this.animation.markerPosition=this.width*2}else if(this.animationStyle==ProgressBar.AnimationStyle.TwoWay){this.animation.markerPosition+=20*this.animationSpeed*this.animation.markerDirection;if(this.animation.markerPosition>=this.progressPosition-this.borderRadius*2||this.animation.markerPosition<=-this.borderRadius*20)this.animation.markerDirection=-this.animation.markerDirection}this.markerElement.style.backgroundPosition=(this.animation.markerPosition)+"px 0px"}else{if(this.animationStyle==ProgressBar.AnimationStyle.LeftToRight1||this.animationStyle==ProgressBar.AnimationStyle.LeftToRight2){this.animation.markerPosition+=20*this.animationSpeed;if(this.animation.markerPosition>this.height*2)this.animation.markerPosition=-this.image.height}else if(this.animationStyle==ProgressBar.AnimationStyle.RightToLeft1||this.animationStyle==ProgressBar.AnimationStyle.RightToLeft2){this.animation.markerPosition-=20*this.animationSpeed;if(this.animation.markerPosition<-this.image.height)this.animation.markerPosition=this.height*2}else if(this.animationStyle==ProgressBar.AnimationStyle.TwoWay){this.animation.markerPosition+=20*this.animationSpeed*this.animation.markerDirection;if(this.animation.markerPosition>=this.progressPosition-this.borderRadius*2||this.animation.markerPosition<=-this.borderRadius*20)this.animation.markerDirection=-this.animation.markerDirection}this.markerElement.style.backgroundPosition="0px "+(this.animation.markerPosition)+"px"}}};ProgressBar._elementCurrentStyle=function(a,b){if(a.currentStyle){var i=0,temp="",changeCase=false;for(i=0;i<b.length;i++){if(b.charAt(i)&&(b.charAt(i)!='-'||b.charAt(i).toString()!='-')){if(b.charAt(i).toString){temp=temp+(changeCase?b.charAt(i).toString().toUpperCase():b.charAt(i).toString())}else{temp=temp+(changeCase?b.charAt(i).toUpperCase():b.charAt(i))}changeCase=false}else{changeCase=true}}b=temp;return a.currentStyle[b]}else{return getComputedStyle(a,null).getPropertyValue(b)}};ProgressBar._parseInt=function(a){var b=parseInt(a);if(isNaN(b))b=0;return b};ProgressBar._createBorderRadiusCss=function(a,b,c,d){if(a!=null&&b==null&&c==null&&d==null){return"; -moz-border-radius: "+a+"px; -ms-border-radius: "+a+"px; -o-border-radius: "+a+"px; -webkit-border-radius: "+a+"px; -khtml-border-radius: "+a+"px; border-radius: "+a+"px;"}else{a=(a||0);b=(b||0);c=(c||0);d=(d||0);return"; -moz-border-radius: "+a+"px "+b+"px "+c+"px "+d+"px; -ms-border-radius: "+a+"px "+b+"px "+c+"px "+d+"px; -o-border-radius: "+a+"px "+b+"px "+c+"px "+d+"px; -webkit-border-radius: "+a+"px "+b+"px "+c+"px "+d+"px; -khtml-border-radius: "+a+"px "+b+"px "+c+"px "+d+"px; border-radius: "+a+"px "+b+"px "+c+"px "+d+"px;"}};