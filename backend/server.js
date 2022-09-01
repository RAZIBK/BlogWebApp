const  express  = require("express");
const dotenv=require('dotenv')
const cors = require ('cors')
dotenv.config();    
const dbConnect=require('./config/db/dbconnection');
const userRoutes = require("./route/users/userRoutes");
const {notFound, errorHandler } = require("./middlewares/error/errorHandler");
const postRoutes = require("./route/post/postRoutes");
const categoryRoutes = require("./route/category/categoryRoutes");

const app=express();

dbConnect()

app.use(express.json());

app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/category',categoryRoutes);

app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT||5000;
app.listen(PORT,console.log(`server is running at ${PORT}`)); 


// zi26cqNR8JkHLk12