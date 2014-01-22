//Initialization
var mongoose = require('mongoose');
Schema = mongoose.Schema;
function start(){
	mongoose.connect('mongodb://localhost/peeko');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
}

//Schema definitions
var blocksSchema = mongoose.Schema({
	name: String,
	brand_id: Number,
	price: Number,
	url: String,
	timestamp: Date
});

var blocksSchema = mongoose.Schema({

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
	fbid: String
});

var favoritesSchema = mongoose.Schema({
	user_id: {type: Schema.Types.ObjectId, ref: 'User'},
	block_id: {type: Schema.Types.ObjectId, ref: 'Block'}
});

//Model methods
locationsSchema.methods.findNear = function(cb){
	return this.model('Location').find({loc: {$nearSphere: this.loc, $maxDistance: .00025}}, cb);
}

usersSchema.methods.isUnique = function(cb){
	var results = this.model('User').find({fbid: this.fbid}, cb);
	return results;
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
