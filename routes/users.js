var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var router = express.Router();

//load game model
require("../models/User");
var User = mongoose.model("users");

//routes for sigin
router.get("/login", function(req, res){
    res.render("users/login");
});
router.get("/register", function(req, res){
    res.render("users/register");
});

router.post("/register", function(req, res){
    var errors = [];
    if(req.body.password != req.body.password2){
        errors.push("passwords don't match binch");
    }
    if(req.body.password.length < 4){
        errors.push("passwords too short binch");
    }
    if(errors.length > 0){
        res.render("users/register", {
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password2
        });
    }else{
        var newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err)throw err;
                newUser.password = hash;
                newUser.save().then(function(users){
                    req.flash("success_msg", "Registered!");
                    res.redirect("/users/login");
                }).catch(function(err){
                    console.log(err);
                    return;
                });
            });
        });
        
    }
});

module.exports = router;