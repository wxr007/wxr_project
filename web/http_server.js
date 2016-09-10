var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req, res){
    var post = '';     //������һ��post�����������ݴ����������Ϣ

    req.on('data', function(chunk){    //ͨ��req��data�¼�����������ÿ�����ܵ�����������ݣ����ۼӵ�post������
        post += chunk;
    });

    req.on('end', function(){    //��end�¼�������ͨ��querystring.parse��post����Ϊ������POST�����ʽ��Ȼ����ͻ��˷��ء�
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');