var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/proxy', function(req, res) {
    http.get({
        host: req.query.proxyHost,
        path: req.url.replace('/proxy', req.query.proxyPath)
    }, function(response) {
        var body = '';

        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function() {
            res.send(body);
        });
    });
});

app.listen(3000, function() {
    console.log('OpenLayers 3.x Cookbook app listening on port 3000');
});
