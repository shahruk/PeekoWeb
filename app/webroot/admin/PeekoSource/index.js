var server = require("./server");
var database = require("./database");
var validator = require('validator');
var sanitizer = require('sanitizer');

database.start();

server.passport.serializeUser(function(user, done) {
  done(null, user);
});

server.passport.deserializeUser(function(user, done) {
  done(null, user);
});

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

app.post('/login',  function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	database.User.findOne({email : req.body.email},function(err,user){
		if(!user){
			res.json({'logged': false, 'message': 'Incorrect email / password.'});
		}else{
			database.hash(req.body.password, user.salt, function (err, hash){
				if (hash == user.hash){
					res.json({'logged': true, 'id': user.id, 'username': user.username});
				}else{
					res.json({'logged': false, 'message': 'Incorrect email / password'});
				}
			});
		}
	});
});

app.post("/signup", function (req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	var errorsArray = new Object();
	errorsArray.email = new Object();
	errorsArray.email.error = false;
	errorsArray.password = new Object();
	errorsArray.password.error = false;
	errorsArray.username = new Object();
	errorsArray.username.error = false;
	
	database.User.find({$or:[
		{email: req.body.email},
		{username: req.body.username}
		],
	}, function (err, docs) {
		if(docs.length == 0){
			var errorFlag = false;
			if(!validator.isEmail(req.body.email)){
				errorFlag = errorsArray.email.error = true;
				errorsArray.email.message = "Please use a proper email address.";
			}
			if(!validator.isAlphanumeric(req.body.username) || !validator.isLength(req.body.username, 4, 12)){
				errorFlag = errorsArray.username.error = true;
				errorsArray.username.message = "Please choose a username containing only numbers and letters between 4 to 12 characters long.";
			}
			if(!validator.isAlphanumeric(req.body.password) || !validator.isLength(req.body.password, 6, 20)){
				errorFlag = errorsArray.password.error = true;
				errorsArray.password.message = "Please choose a password containing only numbers and letters between 6 to 20 characters long.";
			}
			if(errorFlag){
				res.json(errorsArray);
			}else{
				database.User.signup(req.body.email, sanitizer.escape(req.body.username), req.body.password, function(err, user){
					if(err) throw err;
					req.login(user, function(err){
						if(err) return next(err);
						res.json({registered: true, id: user.id, username: user.username});
					});
				});
			}
		}else{
			
			for(i = 0; i < docs.length; i++){
				if(docs[i]['email'] == req.body.email){
					errorsArray.email.error = true;
					errorsArray.email.message = "That email is already in use, sorry!";
				}
				if(docs[i]['username'] == req.body.username){
					errorsArray.username.error = true;
					errorsArray.username.message = "That username is already in use, sorry!";
				}
			}
			
			res.json(errorsArray);
		}
	});
});

app.get('/favorites/:id', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	database.Favorite.find({user_id: req.params.id}).exec(function(err, docs){
		res.json(docs);
	});
});

app.get('/feed/favorites/:id', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	database.Favorite.find({user_id: req.params.id}).populate('block_id').exec(function(err, docs){
		res.json(docs);
	});
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

app.post('/actions/favorite', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	var fav = new database.Favorite({user_id: req.body.userid, block_id: req.body.blockid});
	fav.isUnique(function(err,docs) {
		if(!err){
			if(docs.length == 0){
				var fav = new database.Favorite({user_id: req.body.userid, block_id: req.body.blockid});
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

app.post('/actions/favorite/delete', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	database.Favorite.remove({user_id: req.body.userid, block_id: req.body.blockid}, function(err){
		if(!err){
			res.json({deleted: true});
		}else{
		}
	});
	
});

app.get('/comments/:id', function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	database.Comment.find({block_id: req.params.id}).populate('user_id').exec(function(err, comments){
		if(!err){
			res.json(comments);
		}else{
			throw err;
		}
	});
});

app.post('/addcomment',  function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	var errorFlag = false;
	if(!validator.isAlphanumeric(req.body.usercomment)){
		errorFlag = true;
		res.json({saved: false, message: 'Please only use letters and numbers, thanks!'});
	}
	if(!validator.isLength(req.body.usercomment, 1, 400)){
		errorFlag = true;
		res.json({saved: false, message: 'Please make your comment no more than 400 characters long.'});
	}
	if(!errorFlag){
		var comment = new database.Comment({user_id: req.body.userid, message: sanitizer.escape(req.body.usercomment), block_id: req.body.blockid});
		comment.save(function(err, comment){
			if(!err){
				res.json({saved:true});
			}else{
				throw err;
			}
		});
	}
});