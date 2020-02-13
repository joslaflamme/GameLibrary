if(process.env.NODE_ENV == "production"){
    //connection to cloud mongodb server
    module.exports = {
        mongoURI:"mongodb://joslaf:Lak7357**@cluster0-aqlcg.mongodb.net/test?retryWrites=true&w=majority"
    }
}
else{
    module.exports = {
        mongoURI:"mongodb://localhost:27017/gamelibrary"
    }
}