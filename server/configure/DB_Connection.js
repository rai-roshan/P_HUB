const mongoose = require('mongoose');

const connOption = {
    useNewUrlParser: true , 
    useUnifiedTopology: true };
mongoose.connect('mongodb://localhost:blog/blog' , connOption );
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