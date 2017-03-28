window.onload = function(){
	var o = new Time_comp("time");
};
function Time_comp(){
	this.flag = true;
	this.wrap = this.getById("time");
	this.input = this.getById("ipt");
	this.pic = this.getByClass("pic")[0];
	this.timeBox = this.getById("time_box");
	this.calenderHead = this.getByClass("calender_hd",this.timeBox)[0];
	this.calenderBody = this.getByClass("calender_bd",this.timeBox)[0];
	this.prev =  this.getByClass("calender_prev",this.timeBox)[0];
	this.next =  this.getByClass("calender_next",this.timeBox)[0];
	this.init();
}
Time_comp.prototype = {
	getById:function(id){
		return document.getElementById(id);
	},
	getByClass:function(classname,parent){
		var elements = [];
		var node = parent != undefined&&parent.nodeType==1?parent.getElementsByTagName("*"):document.getElementsByTagName("*");
		var p = new RegExp("(^|\\s)"+classname+"(\\s|$)");
		for(var i=0;i<node.length;i++){
			if(p.test(node[i ].className)){
				elements.push(node[i]);
			}
		}
		return elements;
	},
	init:function(){
		this.input.setAttribute("disabled",'false');
		this.year = new Date().getFullYear();
		this.month = new Date().getMonth();
		this.date = new Date().getDate();
		this.fillTitle();
		this.fillBody();
		this.boxDisplay();
		this.prevMethod();
		this.nextMethod();
	},
	fillTitle:function(){
		console.log(this.month);
		this.calenderHead.innerHTML = this.year+'年'+(this.month+1)+'月';
	},
	fillBody:function(){
		var date = new Date().getDate();
		var thisYear = this.year;
		var thisMonth = this.month;
		var thisDate = date;
		var firstDay = new Date(this.year, this.month, 1).getDay();
		var finalDate = new Date(this.year,this.month+1,0).getDate();
		var lastDate = new Date(this.year,this.month, 0).getDate();
		var index = 0;
		for(var i = 0;i<firstDay;i++){
			var span = document.createElement('span');
			span.setAttribute('class','grey');
			span.innerHTML = lastDate-firstDay+1 + i;
			this.calenderBody.appendChild(span);
			index++;
		}
		for(var j=1;j<finalDate+1;j++){
			span = document.createElement('span');
			if(j ==date && thisYear ==this.year &&thisMonth ==this.month){
				span.style.background = '#b547e2';
				this.input.value = this.calenderHead.innerHTML + j + '日';
			}
			span.innerHTML = j;
			this.calenderBody.appendChild(span);
			index++;
		}
		for(var k=1;k<42-index+1;k++){
			span = document.createElement('span');
			span.innerHTML = k;
			span.setAttribute('class','grey');
			this.calenderBody.appendChild(span);
		}

		this.timeClick();

	},
	timeClick:function(){
		var that = this;
		var span = this.calenderBody.children;
		for(var z=0;z<span.length;z++){
			var hasclass = span[z].getAttribute('class');
			if(!hasclass||hasclass.indexOf('grey')==-1){
				span[z].onclick=function(){
					for(var i=0;i<span.length;i++){
						span[i].style.background = '';
					}
					this.style.background = '#b547e2';
					that.input.value = that.calenderHead.innerText+this.innerText+'日';
					that.timeBox.style.display = 'none';
					that.flag = !that.flag;
				}
			}
		}
	},
	prevMethod:function(){
		var that = this;
		this.prev.onclick = function(){
			that.calenderBody.innerHTML = '';
			if(that.month>0){
				that.month = that.month-1;
			}
			else{
				that.month = 11-that.month;
				that.year--;
			}
			that.fillTitle();
			that.fillBody();
		}
	},
	nextMethod:function(){
		var that = this;
		this.next.onclick = function(){
			that.calenderBody.innerHTML = '';
			if(that.month<11){
				that.month = that.month+1;
			}
			else{
				that.month = that.month-11;
				that.year++;
			}
			that.fillTitle();
			that.fillBody();
		}

	},
	boxDisplay:function(){
		var that = this;
		this.pic.onclick = function(event){
			if(that.flag)
				that.timeBox.style.display = 'block';
			else
				that.timeBox.style.display = 'none';
			that.flag = !that.flag;
			if(event.stopPropagation){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
		};
		document.body.onclick = function(){
			if(that.timeBox.style.display != 'none'){
				that.timeBox.style.display = 'none';
				that.flag = !that.flag;
			}
		};
		that.timeBox.onclick = function(){
			if(event.stopPropagation){
				event.stopPropagation();
			}
			else{
				event.cancelBubble = true;
			}
		}
	}


};




