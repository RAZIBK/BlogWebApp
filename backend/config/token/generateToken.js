// var jwt = require('jsonwebtoken');



// const generateToken=(id)=>{
//     return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '10d' })
// };

// module.exports=generateToken;



var jwt = require('jsonwebtoken');



// const accessToken=(id)=>{
//     return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '10d' })
// };

const generateAccessToken=(id)=>{
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: '10d' })
};


const refreshToken=(id)=>{
    return jwt.sign({ id }, process.env.REFRESH_TOKEN)
};





module.exports={generateAccessToken,refreshToken};