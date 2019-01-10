var express = require('express');
var router = express.Router();
var blogModel = require("../model/article");
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
  	res.render('blog', {isnew:true});
  }else{
  	res.redirect("/login");
  }
  
}); 

// /blog/delete/dwad434343
router.get('/delete/:id', function(req, res, next) {
  if(req.session.whatever){
  	
  	//req.params.id 获取动态路由

  	// blogModel.remove({_id:req.params.id})
  	
    //  findByIdAndRemove(参数是id) 
  	blogModel.findByIdAndRemove(req.params.id).then(result=>{
  		res.redirect("/");

  		// 前后端分离  res.send({ok:1})//删除成功
  	})

  }else{
  	res.redirect("/login");
  }
  
}); 

router.get('/update/:id', function(req, res, next) {
  if(req.session.whatever){
  	
  	//req.params.id 获取动态路由

  	//先查出对应id的详细信息， 提前渲染到更新的m模板
  	
  	// blogModel.find({_id:req.params.id}).then(result=>result[0])
  	
  	blogModel.findById(req.params.id).then(result=>{
  		console.log(result);

  		res.render('blog', {isnew:false,info:result});
  	})
  }else{
  	res.redirect("/login");
  }
  
}); 


//创建新blog
router.post("/",(req,res)=>{
	console.log(req.body);

	blogModel.create({
		title:req.body.title,
		content:req.body.content,
		author:req.session.whatever.username,
		createTime:Date.now()
	}).then(result=>{
		res.redirect("/");
	})
})


//更新blog路由
router.post("/update/:id",(req,res)=>{
	console.log(req.params.id);

	// blogModel.create({
	// 	title:req.body.title,
	// 	content:req.body.content,
	// 	author:req.session.whatever.username,
	// 	createTime:Date.now()
	// }).then(result=>{
	// 	res.redirect("/");
	// })

	// blogModel.update({_id:req.params.id},{$set:{title:'****',content:"********"}}).then()

	blogModel.findByIdAndUpdate(req.params.id,
		{$set:{title:req.body.title,content:req.body.content}}).then(result=>{
			res.redirect("/");
	})
})

module.exports = router;
