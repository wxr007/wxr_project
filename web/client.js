var http = require('http');

// ���������ѡ��
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.htm'  
};

// ������Ӧ�Ļص�����
var callback = function(response){
   // ���ϸ�������
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // ���ݽ������
      console.log(body);
   });
}
// �����˷�������
var req = http.request(options, callback);
req.end();