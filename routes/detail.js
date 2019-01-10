var express = require('express');
var router = express.Router();
var blogModel = require("../model/article");
/* GET home page. */

// /detail/?id=dwalkjlkdjwlkaj
router.get('/', function(req, res, next) {
  if(req.session.whatever){

  	console.log(req.query.id);

  	blogModel.find({
  		_id:req.query.id
  	}).then(result=>{
  		// result 是一个只有一个元素的数组
  		res.render('detail', {title:"detail",info:result[0]});
  	})
  	
  }else{
  	res.redirect("/login");
  }
  
}); 

//动态路由
// /detail/dawdwadwd/kerwin
router.get("/:kerwinid",function(req, res, next) {
  if(req.session.whatever){

  	console.log(req.params.kerwinid); //获取动态路由的参数

  	blogModel.find({
  		_id:req.params.kerwinid
  	}).then(result=>{
  		// result 是一个只有一个元素的数组
  		res.render('detail', {title:"detail",info:result[0]});
  	})
  	
  }else{
  	res.redirect("/login");
  }
  
}); 

module.exports = router;