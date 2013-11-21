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

var brandsSchema = mongoose.Schema({
	name: String,
	picture_url: String,
});

var locationsSchema = mongoose.Schema({
	loc: {type: [Number], index: '2d'},
	_brand: [{type: Schema.Types.ObjectId, ref: 'Brand'}]
});

//Model methods
locationsSchema.methods.findNear = function(cb){
	return this.model('Location').find({loc: {$nearSphere: this.loc, $maxDistance: .0005}}, cb);
}

//Model definitions
var Block = mongoose.model('Block', blocksSchema);
var Brand = mongoose.model('Brand', brandsSchema);
var Location = mongoose.model('Location', locationsSchema);

exports.start = start;
exports.Block = Block;
exports.Brand = Brand;
exports.Location = Location;
