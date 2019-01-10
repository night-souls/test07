//建立article模型  映射 articles 这个集合(表)
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	title:String,
	content:String,
	author:String,
	createTime:Date
}

// location

var model =  mongoose.model("article",new Schema(obj));
//users集合

module.exports = model;