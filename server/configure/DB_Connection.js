const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connOption = {
    useNewUrlParser: true , 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose.connect(process.env.DB_REMOTE_URI , connOption )
.catch(err=>{
    console.log("mongoDB error : ",err);
});
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