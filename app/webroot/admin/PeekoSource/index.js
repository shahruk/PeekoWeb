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
				newUser.save(function(err, user){
					res.json({registered: true, userid: user.id});
				});
				//We just registered him
				
			}else{
				//Already registered
				res.json({registered: false});
			}
		} else {
			
		}
	});
});

app.get('/brands/feed', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	database.Brand.find({}, function(err, docs){
		if(!err){
			res.json(docs);
		}
	});
});

app.get('/actions/favorite/:userid/:blockid', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	var fav = new database.Favorite({user_id: req.params.userid, block_id: req.params.blockid});
	console.log(req.params.userid);
	fav.isUnique(function(err,docs) {
		if(!err){
			if(docs.length == 0){
				var fav = new database.Favorite({user_id: req.params.userid, block_id: req.params.blockid});
				fav.save(function(err, favorite){
					if(!err){
						res.json({saved:true});
					}else{
						throw err;
					}
				});
				
			}else{
				res.json({saved: false});
			}
		}
	});
});
