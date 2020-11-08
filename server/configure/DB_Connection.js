const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connOption = {
    useNewUrlParser: true , 
    useUnifiedTopology: true,
    useFindAndModify: false
};

//'mongodb://localhost:blog/blog'
mongoose.connect( `mongodb+srv://m001-student:${process.env.DB_COLLECTION_PASSWORD}@cluster0.vose6.mongodb.net/RaiBlog?retryWrites=true&w=majority`, connOption );
const db = mongoose.connection;

const dbEvent = ( onDBconnect ) => {
    db.on('connecting', ()=>{
        console.log("connecting DB ...");
    });
    db.once('open', ()=>{
        console.log("the db is connected");
        onDBconnect();
    });
    db.on('error' , ()=>{
        console.log("error occured during DB connection");
    });
    db.on('disconnected', ()=>{
        console.log("the db disconnected");
    });
};

module.exports = dbEvent;