const  express  = require("express");
const dotenv=require('dotenv')
const cors = require ('cors')
dotenv.config();    
const dbConnect=require('./config/db/dbconnection');
const userRoutes = require("./route/users/userRoutes");
const {notFound, errorHandler } = require("./middlewares/error/errorHandler");
const postRoutes = require("./route/post/postRoutes");
const categoryRoutes = require("./route/category/categoryRoutes");
const commentRoutes = require("./route/comment/commentRoutes");
const chatRoutes = require('./route/chat/chatRoutes');


const app=express();

dbConnect()

app.use(express.json());

app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/post',postRoutes); 
app.use('/api/category',categoryRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT||5000;
const server=app.listen(PORT,console.log(`server is running at ${PORT}`)); 

const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000',
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        socket.emit('connected')
    }); 

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined Room :" + room);
    })

    // socket.on("typing",(room)=> socket.in(room).emit('typing'));
    // socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))
    socket.on('new message',(newMessageRecieved)=>{
        let chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.user not defined');

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit('message recieved', newMessageRecieved)
            
        });

        socket.off('setup',()=>{
            console.log("USER DISCONNECTED");
            socket.leave(userData._id)
        })
    })
});
// zi26cqNR8JkHLk12