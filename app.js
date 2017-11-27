const express = require('express')
var https = require('https');
var fs = require('fs');

const app = express()

var options = {
  key: fs.readFileSync('privateKey.key'),
  cert: fs.readFileSync('certificate.crt')
};

https.createServer(options, function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
}).listen(8000);

app.use( express.static( __dirname + '/' ));

app.get( '/', function( req, res ) {
    var filePath = path.join( __dirname, '/', 'index.html' )
    res.sendFile(filePath);
    console.log("barni egy zsifo");
});

console.log("listening to port 8000");
