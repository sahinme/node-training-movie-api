const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//Models

const User=require('../models/User');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.post('/register',(req, res, next)=>{

  const {username,password}=req.body;

  bcrypt.hash(password, 10).then((hash)=> {
    const user=new User({
      username,
      password:hash
      });
  
      const promise=user.save();
      
      promise.then((data)=>{
        res.json(data)
      }).catch((err)=>{
        res.json(err)
      });
    
  });

  
});

router.post('/authenticate',(req,res)=>{
    const {username,password}=req.body;
    User.findOne({
      username
    },(err,data)=>{
      if(err)
        throw err;

      if(!data){
        res.json({
          status:false,
          message:'Authentication failed, user was not found !'         
        });
        
      }else{
       bcrypt.compare(password,data.password).then((result)=>{
         
          if(!result){
            
            res.json({
              status:false,
              message:'Authentication failed, wrong password !'
            });
            
          }else{
            const payload={
              username
            };
            const token= jwt.sign(payload,req.app.get('api_secret_keys'),{
              expiresIn:720
            });
            res.json({
              status:true,
              token,
              data
            });

          }
          
        });

      }  
    });

});


module.exports = router;
