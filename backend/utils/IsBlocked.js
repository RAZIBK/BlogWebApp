const blockedUser= user =>{
    if(user?.isBlocked){
        throw new Error(`Access Denied your account is Blcked`)
    }
};

module.exports=blockedUser;