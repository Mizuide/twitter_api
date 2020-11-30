var http = require('http');
var server = http.createServer();
const fs = require('fs');

server.on('request', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Max-Age': '10',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(fs.readFileSync('./response_sample.txt', 'utf8'));
}
);

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(1337);