var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbName = "lemonBill";//数据库
var colUser = "lemon_user";//用户名集合
var colBill = "lemon_bill_user";//账单集合
var colClassify = "lemon_icon_classify";//icon图标分类集合
var colIconlist = "lemon_icon_list"; //所有icon图标集合


//注册用户名是否存在
router.post('/api/user', function (req, res, next) {
  var name = req.body.name;
  var pwd = req.body.pwd;
  mongo.find(dbName, colUser, { name: name}, function (result) {
    if(name){
      if (result.length >0) {
        res.json({
          code: 3,
          msg: "用户名已存在",
          data:result[0]._id
        })
      } else {
        mongo.insert(dbName,colUser,{name:name,pwd:pwd},function(result){
          if(result){
            res.json({code:1,msg:"添加成功"})
          }else{
            res.json({code:0,msg:"添加失败"})
          }
        })
      }
    }else{
      
    }
  })
});


//账单接口

router.post('/api/bill', function (req, res, next) {
  var timer = new RegExp(req.body.timer),
  uid = req.body.uid,
  type = req.body.type,
  page = req.body.page,
  pageSize = req.body.pageSize;
  mongo.find(dbName, colBill, {uid:uid,type:type,timer:timer}, function (result) {
    if(result){
      res.json({code:1,msg:"查找成功",data:result})
    }else{
      res.json({code:0,msg:"查找失败"})
    }
  },{
    skip:(page - 1) * pageSize,
    limit:pageSize
  })
});

//删除账单

router.post('/api/removeBill', function (req, res, next) {
  var id=req.body.id;
  mongo.remove(dbName, colBill, {"_id":id}, function (result) {
    if(result){
      res.json({code:1,msg:"删除成功"})
    }else{
      res.json({code:0,msg:"删除失败"})
    }
  })
});

//添加账单

router.post('/api/addBill', function (req, res, next) {
  var obj=req.body;
  mongo.insert(dbName, colBill,obj, function (result) {
    if(result){
      res.json({code:1,msg:"添加成功"})
    }else{
      res.json({code:0,msg:"添加失败"})
    }
  })
});

//查询分类图标接口

router.post('/api/getClassify', function (req, res, next) {
  var uid = req.body.uid,
  type = req.body.type;
  mongo.find(dbName, colClassify, {uid:uid,type:type}, function (result) {
    if(result){
      res.json({code:1,msg:"查找成功",data:result})
    }else{
      res.json({code:0,msg:"查找失败"})
    }
  })
});

//查询所有图标接口

router.get('/api/getIcon ', function (req, res, next) {
  mongo.find(dbName, colIconlist, function (result) {
    if(result){
      res.json({code:1,msg:"查询成功",data:result})
    }else{
      res.json({code:0,msg:"查询失败"})
    }
  })
});


//添加分类图标接口

router.post('/api/addClassify', function (req, res, next) {
  var obj=req.body;
  mongo.insert(dbName, colClassify,obj, function (result) {
    if(result){
      res.json({code:1,msg:"添加成功"})
    }else{
      res.json({code:0,msg:"添加失败"})
    }
  })
});
module.exports = router;