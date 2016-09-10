function myFunction()
{
	alert("I'm in file!");
}
function testValue()
{
	var length = 16;                                  // Number 通过数字字面量赋值 
	var points = length * 10;                              // Number 通过表达式字面量赋值
	var lastName = "Johnson";                         // String 通过字符串字面量赋值
	var cars = ["Saab", "Volvo", "BMW"];              // Array  通过数组字面量赋值
	// Object 通过对象字面量赋值
	var person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
       return this.firstName + " " + this.lastName;
	   }
	};

	//document.write(person.fullName() + " have " + cars[0]);
	return person.fullName() + " have " + cars[0];
}
function add(a,b)
{
	var sum = a + b;
//	alert(sum);
	return a + b;
}

function getweekday()
{
	var x;
	var d = new Date().getDay();
	switch (d)
	{
	case 0:
			x="Today it's Sunday";
	break;
	case 1:
	x="Today it's Monday";
	break;
	case 2:
		x="Today it's Tuesday";
	break;
	case 3:
		x="Today it's Wednesday";
	break;
	case 4:
		x="Today it's Thursday";
	break;
	case 5:
		x="Today it's Friday";
	break;
	case 6:
		x="Today it's Saturday";
	break;
	}
	//document.writeln(x);
	return x;
}

function loopObj()
{
	var x;
	var txt="";
	var person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
	age		 : 35
	};
	for (x in person)
	{
	  txt=txt + person[x] + "<br>";
	}
	//document.write(txt);
	return txt;
}

function whileShowCar()
{
	cars=["BMW","Volvo","Saab","Ford"];
	var i=0;
	var txt="";
	while (cars[i])
	{
		txt = txt + cars[i] + "<br>";
		//document.write(cars[i] + "<br>");
		i++;
	}
	return txt;
}

function showType()
{
	var txt = "" +
	typeof "john" + "<br>" +
    typeof 3.14 + "<br>" +
    typeof NaN + "<br>" +
    typeof false + "<br>" +
    typeof [1,2,3,4] + "<br>" +
    typeof {name:'john', age:34} + "<br>" +
    typeof new Date() + "<br>" +
    typeof function () {} + "<br>" +
    typeof myCar + "<br>" +
    typeof null;
	
	return txt;
}


function showConstructor()
{
	var txt = "" +
    "john".constructor + "<br>" +
    (3.14).constructor + "<br>" +
    false.constructor + "<br>" +
    [1,2,3,4].constructor + "<br>" +
    {name:'john', age:34}.constructor + "<br>" +
    new Date().constructor + "<br>" +
    function () {}.constructor;
	return txt;
}