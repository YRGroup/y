(function(){
	//判断是否支持css3
	var isCss3=function(){
        var style=document.createElement("div").style;
        for(var k in style){
            if(k.toLowerCase().indexOf("animation")!=-1){
                return true;
            }
        }
        return false;
    }();

    window.requestAnimFrame = (function(){
	    return  function(callback,element){
	                window.setTimeout(callback, 1000 / 60);
	            };
	})();

	function dots(w,h,colors){
		this.maxX=w;
		this.maxY=h;
		this.colors=colors;
		this.reset();
	}

	dots.prototype.move=function(){
		if(!this.isEnd){
			this.r3d=(this.r3d+this.dr3d)%360;
			this.curX+=this.dx;
			this.curY+=this.dy;
			if(this.curY-this.height/2>this.maxY||this.curX<this.width*-1||this.curX>this.maxX)
				this.isEnd=true;
		}
	}

	dots.prototype.reset=function(){
		this.isEnd=false;
		this.width=15+Math.round(10*Math.random());
		this.height=15+Math.round(10*Math.random());
		this.curX=Math.round(this.maxX*Math.random());
		this.curY=this.height*-1;
		this.dx=-2+Math.round(4*Math.random());
		this.dy=6+Math.round(2*Math.random());
		this.rotate=Math.round(360*Math.random());
		this.r3d=0;
		this.dr3d=2+Math.round(6*Math.random());
		this.color=this.colors[Math.floor(Math.random()*this.colors.length)];
	}

	dots.prototype.draw=function(ctx){
		ctx.save();
		ctx.fillStyle=this.color;
		var w=Math.abs(Math.round(this.width*Math.cos(this.r3d*Math.PI/180)));
		ctx.translate(this.curX,this.curY);
		ctx.rotate(this.rotate*Math.PI/180);
		ctx.fillRect(-1*w/2,-1*this.height/2,w,this.height);
		ctx.restore();
	}

	var liveArr=[];
	var dieArr=[];
	var ctx;
	var config=[];
	var fps=0;

	var isEnd=false;

	var animate=function(){
		ctx.clearRect(0,0,config.width,config.height);
		if(fps==config.fps&&!isEnd){
			if(dieArr.length>0){
				liveArr=liveArr.concat(dieArr.splice(0,1))
			}else{
				liveArr.push(new dots(config.width,config.height,config.colors));
			}
			fps=0;
		}
		fps++
		for(var i=0;i<liveArr.length;i++){
			var p=liveArr[i];
			p.move();
			if(p.isEnd){
				p.reset();
				liveArr.splice(i,1);
				i--;
				dieArr.push(p);
			}else{
				p.draw(ctx);
			}
		}
		if(!(isEnd&&liveArr.length==0))
			requestAnimFrame(animate)
	}

	window.dotsPiao=function(cvs,cfg) {
		if(!isCss3)
			return;
		ctx=cvs.getContext("2d");
		config.width=cfg.width||cvs.parentNode.offsetWidth;
		config.height=cfg.height||cvs.parentNode.offsetHeight;
		cvs.setAttribute("width",config.width);
		cvs.setAttribute("height",config.height);
		config.colors=cfg.colors||["#ffa726","#42a5f5","#26a69a","#ff7043"];
		fps=config.fps=cfg.fps||1;
		config.end=cfg.end||0;
		animate();
		if(config.end>0){
			setTimeout(function(){
				isEnd=true;
			},config.end);
		}
	}

})()