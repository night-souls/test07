//建立user模型  映射 users 这个集合(表)
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	username:String,
	email:String,
	password:String
}

// location

var model =  mongoose.model("user",new Schema(obj));
//users集合

module.exports = model;