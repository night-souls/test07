var express =require("express");
var router = express.Router();
var userModel = require("../model/user");

router.get("/",(req,res)=>{

	res.render("register",{title:"注册页面"});
})

//接口
router.get("/check",(req,res)=>{

	userModel.find(req.query).then(result=>{
		if(result.length==0){
			res.send({ok:1}) //没有重名用户
		}else{
			res.send({ok:0})
		}
	})
})


router.post("/",(req,res)=>{
	console.log(req.body);	

	//存数据  -- mongoose 建立一个模型(Schema) 映射 集合,操作模型 就是操作 集合
	// db.users.save
	// 插入数据 到 users 集合
	userModel.create({
		username:req.body.username,
		email:req.body.email,
		password:req.body.password
	}).then(result=>{
		res.redirect("/");//跳转页面
	}).catch(error=>{

	})
})

module.exports  = router;