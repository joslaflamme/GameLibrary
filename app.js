var express = require("express");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
var bodyparser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var app = express();

//load routes
var games = require("./routes/games");
var users = require("./routes/users");

//connect to mongoose
mongoose.connect("mongodb://localhost:27017/gamelibrary",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(function(){
    console.log("mongo db connected");
}).catch(function(err){
    console.log(err);
});



//require mehod override
app.use(methodOverride("_method"));

app.engine('handlebars', exphbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//express session
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));

//flash stuff
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

//get route using express handlebars
app.get("/", function(req, res){
    var title = "T. Hanks"
    res.render("index", {
        title:title
    });
});
app.get("/about", function(req, res){
    res.render("about");
});

//use routes




//useroutes
app.use("/game", games);
app.use("/users", users);

//connects for sign in
app.listen(5000, function(){
    console.log("Game Library running on port 5000");
});