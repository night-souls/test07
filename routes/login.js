var express =require("express");
var router = express.Router();
var userModel = require("../model/user");

router.get("/",(req,res)=>{

	res.render("login",{title:"登陆页面"});
})

router.post("/",(req,res)=>{
	console.log(req.body);	

	//存数据  -- mongoose 建立一个模型(Schema) 映射 集合,操作模型 就是操作 集合
	// db.users.save

	userModel.find(req.body).then(result=>{
		console.log(result)
		if(result.length==0){
			res.render("login",{title:"登陆页面"});
		}else{
			// SESSSIOn["dwadwadwdwadwadwadwa"]
			req.session.whatever = result[0]// 用户信息存进去
			res.redirect("/");
		}
	})
})

module.exports  = router;