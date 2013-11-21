var server = require("./server");
var database = require("./database");
database.start();

app.get('/blocks/:longi/:lati', function(req, res){
	res.header('Access-Control-Allow-Origin', "*")
	var coordinates = [req.params.longi, req.params.lati];
	var location = new database.Location({loc: coordinates});
	location.findNear(
		function(err,docs) {
			if (!err) {
				res.json(docs);
			} else {
				throw err;
			}
		}
	).populate('_brand');

	//database.Block.findOne({brand_id: docs[i]._brand[0]['_id'], timestamp: {$lte: new Date()}}, function(error, results){
});