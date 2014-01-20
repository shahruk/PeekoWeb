var server = require("./server");
var database = require("./database");
database.start();

app.get('/blocks/:longi/:lati', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
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
	//response.end("Hello World\n");
	//database.Block.findOne({brand_id: docs[i]._brand[0]['_id'], timestamp: {$lte: new Date()}}, function(error, results){
});

app.get('/fbregister/:fbid/:email', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	var oldUser = new database.User({fbid: req.params.fbid});
	oldUser.isUnique(function(err,docs) {
		if (!err) {
			if(docs.length == 0){
				var newUser = new database.User({email: req.params.email, fbid: req.params.fbid});
				newUser.save();
				//We just registered him
				res.json({registered: true});
			}else{
				//Already registered
				res.json({registered: false});
			}
		} else {
			
		}
	});

	
	
	
});
