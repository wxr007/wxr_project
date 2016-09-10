var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var util = require('util');
//var express = require('express');

function WriteLog(data)
{
   fs.writeFile('log.json', data,  function(err) {
	   if (err) {
		   return console.error(err);
	   }
	   else
	   {
		   console.log("数据写入成功！");
	   }
   });
};

function listenCallback()
{
	// 控制台会输出以下信息
	console.log('Server running at http://127.0.0.1:8081/');
}

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   var query = url.parse(request.url).query;
   
   if(pathname == "/")
   {
	   pathname = "/public/index.html";
   }      
   // 输出请求的文件名
   console.log("Request for " + pathname + " received "+ ": query = " + query);
   
//   WriteLog(request.toString());

   if(query != null)
   {
	   console.log(querystring.parse(query));
   }
   
   var test_value = {name:"abc",age:13 };
   //console.log(test_value.name);
   
    request.on("data",function(chunk){
		console.log("chunk type ",typeof chunk);
		console.log("chunk is ",chunk);
		console.log(`chunk: ${chunk}`);	
		//var writerStream = fs.createWriteStream('output.txt');
		//writerStream.write(chunk,'UTF8');
	});
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
		console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
		 
		 // 响应文件内容
         response.write("welcome!");	
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // 响应文件内容
         response.write(data.toString());		
      }
      //  发送响应数据
      response.end();
   });  
   
}).listen(8081,listenCallback());