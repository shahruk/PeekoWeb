var express = require('express');
app = express();
app.use(express.static(__dirname + '/src'));
app.listen(8080);
