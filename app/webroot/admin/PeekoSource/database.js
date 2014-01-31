//Initialization
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var hash = require('./hash');


function start(){
	mongoose.connect('mongodb://localhost/peeko');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
}

//Schema definitions
var blocksSchema = mongoose.Schema({
	name: String,
	brand_id: String,
	price: String,
	url: String,
	timestamp: Date
});

var brandsSchema = mongoose.Schema({
	name: String,
	picture_url: String,
});

var locationsSchema = mongoose.Schema({
	loc: {type: [Number], index: '2d'},
	_brand: [{type: Schema.Types.ObjectId, ref: 'Brand'}]
});

var usersSchema = mongoose.Schema({
	email: String,
	username: String,
	salt: String,
	hash: String
});

var favoritesSchema = mongoose.Schema({
	user_id: {type: Schema.Types.ObjectId, ref: 'User'},
	block_id: {type: Schema.Types.ObjectId, ref: 'Block'},
	brand_id: {type: Schema.Types.ObjectId, ref: 'Brand'}
});

//Model methods
locationsSchema.methods.findNear = function(cb){
	return this.model('Location').find({loc: {$nearSphere: this.loc, $maxDistance: .00025}}, cb);
}

usersSchema.statics.signup = function(email, username, password, done){
	var User = this;
	hash(password, function(err, salt, hash){
		if(err) throw err;
		// if (err) return done(err);
		User.create({
				id: 1,
				email : email,
				username: username,
				salt : salt,
				hash : hash
		}, function(err, user){
				if(err) throw err;
				// if (err) return done(err);
				done(null, user);
		});
	});
}

favoritesSchema.methods.isUnique = function(cb){
	var results = this.model('Favorite').find({user_id: this.user_id, block_id: this.block_id}, cb);
	return results;
}

//Model definitions
var Block = mongoose.model('Block', blocksSchema);
var Brand = mongoose.model('Brand', brandsSchema);
var Location = mongoose.model('Location', locationsSchema);
var User = mongoose.model('User', usersSchema);
var Favorite = mongoose.model('Favorite', favoritesSchema);

exports.start = start;
exports.Block = Block;
exports.Brand = Brand;
exports.Location = Location;
exports.User = User;
exports.Favorite = Favorite;
exports.hash = hash;
