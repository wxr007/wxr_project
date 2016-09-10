//定义正营颜色
var color_red = "#EB8996";
var color_orange = "#F2AE5D";
var color_green = "#7FC36E";
var color_blue = "#76C5F0";
var color_purple = "#A45D99";
//定义选中颜色
var moveover_color = "#AAAAAA";
var selected_color = "#999999";
var unselected_color = "white";

//正营初始化骰子数量
var rule_count = [1,2,1,2,1];
//定义正营类
var CampClass = {
	createNew: function(name,color,init_count,AI){
		var camp =  {};
		camp.name = name;
		camp.color = color;
		camp.AI = AI;
		camp.isOut = false;//是否出局
		camp.cells = [];
		camp.init_count = init_count.slice();
		camp.insertCell = function(cell)
		{
			cell.bgColor = this.color;
			this.cells.push(cell);
		};
		camp.eraseCell = function(cell)
		{
			var index = this.cells.indexOf(cell);
			if(index >= 0)
			{
				this.cells.splice(index,1);
			}
		};
		//初始化用
		camp.getInitCount = function()
		{
			var index = Math.floor(Math.random()*this.init_count.length);
			var count = this.init_count[index];
			this.init_count.splice(index,1);
			return count;
		};
		camp.isInit =  function()
		{
			if(this.init_count.length == 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		};
		return camp;
	}
};
//创建各种颜色的正营
var red_camp = CampClass.createNew("红色",color_red,rule_count,false);
var orage_camp = CampClass.createNew("黄色",color_orange,rule_count,true);
var green_camp = CampClass.createNew("绿色",color_green,rule_count,true);
var blue_camp = CampClass.createNew("蓝色",color_blue,rule_count,true);
var purple_camp = CampClass.createNew("紫色",color_purple,rule_count,true);
//初始化阵营列表
var rule_camps = [red_camp,orage_camp,green_camp,blue_camp,purple_camp];
var camps = [red_camp,orage_camp,green_camp,blue_camp,purple_camp];

var CampManager = {
	camp_list : camps.slice(),
	cur_camp : red_camp,
	getCamp : function(color)//获得某个正营
	{
		for(var i =0; i < this.camp_list.length;i++)
		{
			if(this.camp_list[i].color === color)
			{
				return this.camp_list[i];
			}
		}
		return null;
	},
	getNextCamp : function()
	{
		var index = this.camp_list.indexOf(this.cur_camp);
		index++;
		if(index >= this.camp_list.length)
		{
			index = 0;
		}
		this.cur_camp = this.camp_list[index];
		return this.cur_camp;
	},
	removeCamp : function(color)//删除某个正营
	{
		var camp = this.getCamp(color);
		if(camp === this.cur_camp)
		{
			this.getNextCamp();
		}
		var index = this.camp_list.indexOf(camp);
		this.camp_list.splice(index,1);
	},
	size : function()
	{
		return this.camp_list.length;
	}
};

var TurnClass = {
	game_over : false,//游戏结束
	current_turn : 1,
	next : function()
	{
		if(this.game_over == false)
		{
			this.current_turn++;
			var l_camp = this.nowCamp();
			for(var i = 0; i < l_camp.cells.length;i++)
			{
				var cell = l_camp.cells[i];
				if(cell.innerHTML < 6)
				{
					cell.innerHTML++;
				}
			}

			var camp = CampManager.getNextCamp();
			if(camp.AI === true)
			{
				AI.run(CampManager.cur_camp);
			}
			this.clearTurnInfo();
		}
	},	
	nowCamp : function()
	{
		return CampManager.cur_camp;
	},
	currentColor : function()
	{
		return CampManager.cur_camp.color;
	},
	setOut : function(color)//玩家出局
	{
		CampManager.removeCamp(color);
		if(CampManager.size() == 1)
		{
			this.game_over = true;
			alert(CampManager.cur_camp.name + "玩家胜利!");
		}
	},
	//关于显示
	clearTurnInfo : function() //回合显示清理
	{
		var l_camp = this.nowCamp();
		var cell_show = document.getElementById("cell_show");
		var turn_show = document.getElementById("turn_show");
		var attack_show = document.getElementById("attack_show");
		var defence_show = document.getElementById("defence_show");
		var result_show = document.getElementById("result_show");
		
		turn_show.style.color = l_camp.color;
		cell_show.style.color = l_camp.color;
		attack_show.style.color = l_camp.color;
		defence_show.style.color = l_camp.color;
		result_show.style.color = l_camp.color;
		
		turn_show.innerHTML = "回合：" + this.current_turn;
		cell_show.innerHTML = "格子：";
		attack_show.innerHTML = "进攻:";
		defence_show.innerHTML = "防守:";
		result_show.innerHTML = "结果:";
	},
	showResult : function(txt)
	{
		var result_show = document.getElementById("result_show");
		result_show.innerHTML = "结果: " + txt;
	},
	showCellInfo : function(cell)
	{
		var cell_show = document.getElementById("cell_show");
		cell_show.style.color = cell.bgColor;
		cell_show.innerHTML = "格子：" + "x : " + cell.table_x + " y: " + cell.table_y;
	},
	showAttack : function(result,color)
	{
		var attack_show = document.getElementById("attack_show");
		attack_show.style.color = color;
		attack_show.innerHTML = "进攻: " + this.concatResult(result);
	},
	showDefence : function(result,color)
	{
		var defence_show = document.getElementById("defence_show");
		defence_show.style.color = color;
		defence_show.innerHTML = "防守: " + this.concatResult(result);
	},
	concatResult : function(result)
	{
		var txt = "";
		txt += result._sum;
		txt +=" = ";
		for(var i =0; i < result._array.length;i++)
		{
			txt += result._array[i];
			if(i != result._array.length-1)
			{
				txt +=" + ";	
			}
		}
		return txt;
	}
};

function randomCamp()
{
	var index = Math.floor(Math.random()*camps.length);
	return camps[index];
}

var oTable;
//创建表格
function ShowTable(x,y)
{
	oTable = document.createElement("table");
	oTable.border = 1;

	for(var i = 0;i < y; i++)
	{
		var row = oTable.insertRow(i);
		oTable.appendChild(row);
		for(var j = 0;j < x;j++)
		{
			var cell = row.insertCell(j);
			var camp = randomCamp();
			row.appendChild(cell);
			cell.table_x = j;
			cell.table_y = i;
			cell.isSelect = false;
			cell.style.borderStyle = "solid";
			cell.style.borderWidth = "5px";
			cell.style.borderColor= unselected_color;
			cell.innerHTML = camp.getInitCount();
			camp.insertCell(cell);//插入格子
			if(camp.isInit())
			{	
				var remove_index = camps.indexOf(camp);
				camps.splice(remove_index,1);
			};
			cell.onmouseover = function()
			{
				if(this.isSelect == false)
				{
					this.style.borderColor = moveover_color;
				}
				TurnClass.showCellInfo(this);
			};
			cell.onmouseout = function()
			{
				if(this.isSelect == false)
				{
					this.style.borderColor = unselected_color;
				}
			};
			cell.onclick = function ()
			{
				PlayerCtrl.playerSelect(this);
			};
		}
	}
	//将表格添加到页面上
	document.getElementById("table_show").appendChild(oTable);
	logic.init();
}

var AI = {
	run_camp : null,
	run : function(camp)
	{
		this.run_camp = camp;
		this.thinkContinue();
	},
	fight : function()
	{
		for(var i = 0; i < this.run_camp.cells.length;i++)//循环所属格子
		{
			var self_cell = this.run_camp.cells[i];
			if(self_cell.innerHTML > 1)//大于1才能进攻
			{
				var enemy_cells_array = this.getEnemyCell(self_cell);
				var enemy_cell = this.thinkFight(self_cell,enemy_cells_array);
				if(enemy_cell)
				{
					this.doFight(self_cell,enemy_cell);
					return true;
				}
			}
		}
		return false;//循环完所有格子如果不进攻就返回false
	},
	doFight : function(self_cell,enemy_cell)
	{
		setTimeout(function(){
			logic.select(self_cell);
			logic.select(enemy_cell);
			AI.thinkContinue();//不能用this
		},1000);
	},
	doNextTrun :function()
	{
		setTimeout(function(){
			AI.clear();//不能用this
			logic.nextTurn();
		},1000);
	},
	getEnemyCell : function(self_cell)
	{
		var enemy_cells_array = [];
		var row_min = Math.max(self_cell.table_y-1,0);
		var row_max = Math.min(self_cell.table_y+1,oTable.rows.length-1);
		var column_min = Math.max(self_cell.table_x-1,0);
		var column_max = Math.min(self_cell.table_x+1,oTable.rows[0].cells.length-1);//tips ：暂时写死0
		
		for(var i = row_min; i <= row_max;i++)
		{
			var row = oTable.rows[i];
			for(var j = column_min; j <= column_max;j++)
			{
				var cell = row.cells[j];
				if(logic.checkRange(self_cell,cell) )//在范围内
				{
					if(cell.bgColor != self_cell.bgColor)//不是自己的颜色
					{
						enemy_cells_array.push(cell);
					}
				}
			}
		}
		return enemy_cells_array;
	},
	thinkFight : function(self_cell,enemy_cells_array)//考虑如何战斗
	{
		if(enemy_cells_array.length > 0)
		{
			enemy_cells_array.sort(function(a,b){
				return a.innerHTML - b.innerHTML;
			});//升序排序			
			
			if(self_cell.innerHTML > enemy_cells_array[0].innerHTML)//如果自己比敌人多
			{
				return enemy_cells_array[0];//返回最小的 攻击
			}
			else if(self_cell.innerHTML = enemy_cells_array[0].innerHTML)//如果自己和敌人一样多
			{
				if(Math.random() < 0.5) //50%的几率攻击
				{
					return enemy_cells_array[0];//返回最小的 攻击
				}	
			}
			else //如果自己比敌人一样少
			{
				if(Math.random() < 0.3) //30%的几率攻击
				{
					return enemy_cells_array[0];//返回最小的 攻击
				}	
			}
		}
		else
		{
			return null;
		}		
	},
	thinkContinue : function()//考虑是否继续
	{
		if(!this.fight())
		{
			this.doNextTrun();//如果无法进攻就执行下一回合
		}
	},
	clear : function()
	{
		this.run_camp = null;
	}
};

var logic = {
	selected_cell : null, //选中的单元格
	init : function()
	{
		TurnClass.clearTurnInfo();
	},
	nextTurn : function() //下一回合
	{
		this.unselected(this.selected_cell);
		TurnClass.next();
	},
	playDice : function() //掷骰子
	{
		if(this.selected_cell)
		{
			var count = parseInt(this.selected_cell.innerHTML);
			rollDice(count);
		}
	},
	selected : function(cell) //设置选中状态
	{
		if(cell != null)
		{
			cell.style.borderColor = selected_color;
			cell.isSelect = true;
			this.selected_cell = cell;
		}

	},
	unselected : function(cell) //设置未选中状态
	{
		if(cell != null)
		{
			cell.style.borderColor = unselected_color;
			cell.isSelect = false;
			this.selected_cell = null;
		}
	},
	select : function(cell) //选择单元格
	{
		if(cell != this.selected_cell)
		{
			if(TurnClass.currentColor() == cell.bgColor)//只有当前回合的颜色能被选中
			{
				this.unselected(this.selected_cell);
				this.selected(cell);
			}
			else
			{
				this.compareCell(this.selected_cell,cell);
			}
		}
	},
	compareCell : function(cell_A,cell_D)
	{
		if(cell_A && cell_D)
		{
			if(this.checkRange(cell_A,cell_D))
			{						
				var count_A = parseInt(cell_A.innerHTML);
				var count_D = parseInt(cell_D.innerHTML);
				if(count_A > 1)//只有大于1才能进攻
				{
					var result_A = this.rollDice(count_A);
					var result_D = this.rollDice(count_D);
					TurnClass.showAttack(result_A,cell_A.bgColor);
					TurnClass.showDefence(result_D,cell_D.bgColor);
					var cell_A_txt= "[" + cell_A.table_x + "," + cell_A.table_y + "]";
					var cell_D_txt= "[" + cell_D.table_x + "," + cell_D.table_y + "]";
					if(result_A._sum > result_D._sum)
					{
						var camp_A = CampManager.getCamp(cell_A.bgColor);
						var camp_D = CampManager.getCamp(cell_D.bgColor);						
						camp_D.eraseCell(cell_D);
						camp_A.insertCell(cell_D);
						cell_D.innerHTML = cell_A.innerHTML - 1;
						cell_A.innerHTML = 1;
						this.checkOut(camp_D.color);
						TurnClass.showResult(cell_A_txt + "进攻" + cell_D_txt + "胜利。");
						//成功
					}
					else
					{
						cell_A.innerHTML = 1;
						TurnClass.showResult(cell_A_txt + "进攻" + cell_D_txt + "失败。");
						//失败
					}
				}
				else
				{
					TurnClass.showResult("有2个以上的骰子才能发起进攻。");
				}
			}
		}
	},
	checkOut : function(color)
	{
		var camp = CampManager.getCamp(color);
		if(camp.cells.length == 0)
		{
			TurnClass.setOut(color);
		}
	},
	checkRange : function(cell_A,cell_D)
	{
		var range_x = Math.abs(cell_A.table_x - cell_D.table_x);
		var range_y = Math.abs(cell_A.table_y - cell_D.table_y);
		if(range_x + range_y <= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	rollDice : function(count)
	{
		var sum = 0;
		var array = [];
		for(var i =0; i < count;i++)
		{
			var num = Math.ceil(Math.random()*6);
			array.push(num);
			sum += num;
		}
		var result ={
			_sum : sum,
			_array : array
		};
		return result;
	}
};

var PlayerCtrl ={
	playerSelect : function(cell)
	{
		if(TurnClass.nowCamp().AI != true)
		{
			logic.select(cell);
		}
	},
	PlayerNext : function()
	{
		if(TurnClass.nowCamp().AI != true)
		{
			logic.nextTurn();
		}
	}
};
