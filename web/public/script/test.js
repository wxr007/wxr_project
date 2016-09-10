var rule_count = [1,1,1,2];

var Camp_base = {
	//campColor : color_red,
	id : 1,
	init_count : rule_count.slice(),
	getInitCount : function(){
		return this.init_count.pop();
	},
	isInit : function(){
		return this.init_count.length;
	}
};

function test_array()
{
	Camp_base.id++;
	var red_camp = Object.create(Camp_base);
	red_camp.getInitCount();
	document.getElementById("test").innerHTML =  red_camp.id + " : " + red_camp.isInit();
}

//=================================================================
var rule_count = [1,2,1,2];

var Camp_base = {
	createNew: function(id){
		var camp =  {};
		camp.id = id;
		camp.init_count = rule_count.slice();
		camp.getInitCount = function(){
			return this.init_count.pop();
		};
		camp.isInit =  function(){
			return this.init_count.length;
		};
		return camp;
	}
};

var red_camp = Camp_base.createNew(1);
var orage_camp = Camp_base.createNew(2);

function test_array()
{
	red_camp.getInitCount();
	document.getElementById("test").innerHTML = red_camp.id + " : " + red_camp.isInit();
}