const mongoose=require("mongoose");

const dbConnect=async()=>{
    try{
        await mongoose.connect(
            process.env.MONGODB_URL,
            {
                // useCreateIndex:true,
                // useFindAndModify:true,
                useUnifiedTopology:true,
                useNewUrlParser:true,
            }    
        ).then(()=>{
            console.log("DB Connetion Successfull");
        }).catch(err=>{
            console.log(err.message);
        });
    }catch(error){
        console.log(`Error ${error.message}`);
    }
};
module.exports=dbConnect;

