var express = require("express");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

//connect to mongoose
mongoose.connect("mongodb://localhost:27017/gamelibrary",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(function(){
    console.log("mongo db connected");
}).catch(function(err){
    console.log(err);
});

//load game model
require("./models/Game");
var Game = mongoose.model("games");

//require mehod override
app.use(methodOverride("_method"));

app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//get route using express handlebars
app.get("/", function(req, res){
    var title = "T. Hanks"
    res.render("index", {
        title:title
    });
});
app.get("/games", function(req, res){
    Game.find({}).then(function(games){
        console.log(games);
        res.render("gameentry/index", {
            games:games
        });
    });
    
});

//post request
app.post("/gameentry", function(req, res){
    console.log(req.body);
    var errors = [];

    if(!req.body.title){
        errors.push({text:"please add a title, fool"})
    }
    if(!req.body.price){
        errors.push({text:"please add a price, fool"})
    }
    if(!req.body.description){
        errors.push({text:"please add a description, fool"})
    }
    if(errors.length > 0){
        res.render("gameentry/gameentryadd",{
            errors:errors,
            title:req.body.title,
            price:req.body.price,
            description:req.body.description
        });
    }else{
        //res.send(req.body);
        var newUser = {
            title:req.body.title,
            price:req.body.price,
            description:req.body.description
        }
        Game(newUser).save().then(function(games){
            console.log(games);
            res.redirect("/games");
        });
    }
    //
});
app.get("/about", function(req, res){
    res.render("about");
});
app.get("/gameentry/gameentryadd", function(req, res){
    res.render("gameentry/gameentryadd");
});
app.put("/gameedit/:id", function(req, res){
    Game.findOne({
        _id:req.params.id
    }).then(function(game){
        game.title = req.body.title;
        game.price = req.body.price;
        game.description = req.body.description;

        game.save().then(function(game){
            res.redirect("/games");
        })
    })
})
app.get("/gameentry/gameentryedit/:id", function(req, res){
    Game.findOne({
        _id:req.params.id
    }).then(function(games){
        res.render("gameentry/gameentryedit",{
            games:games
        });
    });    
});
app.listen(5000, function(){
    console.log("Game Library running on port 5000");
});