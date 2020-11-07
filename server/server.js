const express = require('express');
const dbEvent = require('./configure/DB_Connection');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/authRoute');
const profileRoutes = require('./Routes/profileRoute');
const blogRoutes = require('./Routes/blogRoute');
const commentRoutes = require('./Routes/commentRoute');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/auth' , authRoutes);
app.use('/api/profile' , profileRoutes);
app.use('/api/posts' , blogRoutes);
app.use('/api/comments' , commentRoutes);

const PORT = 5000 || process.env.PORT;

const onDBconnect = () => {
    app.listen(PORT,()=>{
    console.log(`server active at ${PORT}`);
});
};

dbEvent(onDBconnect);