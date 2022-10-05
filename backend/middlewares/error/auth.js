const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/User/userModel");

const authmidlewarres = expressAsyncHandler(async (req, res, next) => {

  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split("Bearer ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded?.id).select("-password");
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("not authorizied token expired, login again");
    }
  } else {
    throw new Error("There is no token attached to the header");
  }
});

module.exports = authmidlewarres;




// const expressAsyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const User = require("../../model/User/userModel");
// let refreshTokens=[]
        
// // const {generateAccessToken} = require("../../config/token/generateToken");




// const generateAccessToken=(id)=>{
//   return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '50s' })
// };
// const refreshToken=(id)=>{
//   const refresh = jwt.sign({ id }, process.env.REFRESH_TOKEN)
//   refreshTokens.push(refresh)
//   return refresh;
// };





// // module.exports={generateAccessToken,refreshToken};

// const authmidlewarres = expressAsyncHandler(async (req, res, next) => {
//   let token;
//   if (req?.headers?.authorization?.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split("Bearer ")[1];
//       if (token) {
//         console.log(token);
//         console.log(refreshTokens);
//         if(!refreshTokens.includes(token)){
//           throw new Error("not authorizied token expired, login again");
//         }else{
         
//           jwt.verify(token, process.env.REFRESH_TOKEN,(err,user)=>{
//             if(err){
//               console.log("err");
//               throw new Error("not authorizied token expired, login again");
//             }else{
// console.log("====");
//               // const accessToke33 = generateAccessToken(user._id) = user
//               // console.log(accessToke33);
               
//               // req.user = user;
//               next();
//             }
            
//           })
          
//         }
        
//       }
    
//     }catch{
//       throw new Error("not authorizied token expired, login againabd");
//     }
//   }
// });

// module.exports = {authmidlewarres,generateAccessToken,refreshToken};
