var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    }
});

mongoose.model("games", GameSchema);