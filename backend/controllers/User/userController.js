const User = require("../../model/User/userModel");
const expressAsyncHandler = require("express-async-handler");
const fs= require("fs")
const {generateAccessToken,refreshToken} = require("../../config/token/generateToken");
// const {generateAccessToken,refreshToken} = require("../../middlewares/error/auth")

const validateMongodbId = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");




const userResgisterCtrl = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  console.log(req.body);
  if (userExists) throw new Error("User already exists");
  try {
    const user = await User.create({
      name: req?.body?.name,
      // lastName:req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isUserPassword(password))) {
    // const accessToke= generateAccessToken(userFound?._id);
    // const  refreshToke=refreshToken(userFound?._id);

    // const user =await User.findByIdAndUpdate(userFound?._id,{
    //   refreshToken:refreshToke
    // },{new:true});

    res.json({
      name: userFound?.name,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      token: generateAccessToken(userFound?._id),
      // refreshToke:refreshToke,
      isAdmin: userFound?.isAdmin,
      id: userFound?._id,
    });
  } else {
    res.status(401);
    throw new Error("Your username or password is incorrect");
  }
});

const fetcUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json({token:req.token, users });
  } catch (error) {
    res.json(error);
  }
});

const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findOne({ id });
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

const UserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id).populate('posts')
    res.json({ myProfile });
  } catch (error) {
    res.json(error);
  }
});

const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        bio: req?.body?.bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

const passwordUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.user.id;
  const { password } = req?.body;
  validateMongodbId(id);
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updateUser = await user.save();
    res.json(updateUser);
  }
  res.json(user);
});

const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  const {followId}=req.body;
  const loginUserId=req.user.id;

    const targetUser= await User.findById(followId)

    const alreadyFollowing= targetUser?.followers?.find(
        user =>user.toString()===loginUserId.toString()
    );

    if(alreadyFollowing) throw new Error('You have already followed this user');
    //   try {
      await User.findByIdAndUpdate(loginUserId,{
          $push:{following:followId},
          
      },{new:true})
      await User.findByIdAndUpdate(followId,{
          $push:{followers:loginUserId},
          isFollowing:true
      },{new:true});

  res.json("you have successfully followed this user");
//   } catch (error) {
//       res.json(error)
//   }
});


const unFollowUserctrl = expressAsyncHandler(async(req,res)=>{
    console.log(req.user.id);
    const {unFollowId} = req.body
    const loginUserId = req.user.id


    await User.findByIdAndUpdate(
        unFollowId,
        {
            $pull:{followers:loginUserId},
            isFollowing:false,
        },{
            new:true
        }
    )

    await User.findByIdAndUpdate(loginUserId,
        {
            $pull:
            {
                following:unFollowId
            }
        },{
            new:true
        })

    res.json("You have successfully unfollowed this user");

})


const blockUserCtrl =expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);

    const user=await User.findByIdAndUpdate(id,
        {
            isBlocked:true,
        },{
            new:true
        })

        res.json(user)

})

const unblockUserCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} =  req.params
    validateMongodbId(id);
    console.log(id);

    const user=await User.findByIdAndUpdate(id,{
        isBlocked:false,
    
    },{new:true});
    res.json({user})
});


const profilePhotoUploadctrl=expressAsyncHandler(async(req,res)=>{

  const {_id}=req.user
  const localPath=`public/images/profilePhotos/${req.file.filename}`;

 const uploadImagge=await cloudinaryUploadImg(localPath);
try {
  const user=await User.findByIdAndUpdate(_id,{
    profilePhoto:uploadImagge.url,
   },{
    new:true
   })
   fs.unlinkSync(localPath)
     res.json(user)
  
} catch (error) {
  res.json(error)
}
 
})

module.exports = {
  userResgisterCtrl,
  userLoginCtrl,
  fetcUsersCtrl,
  fetchUserDetailsCtrl,
  UserProfileCtrl,
  updateUserCtrl,
  passwordUpdateCtrl,
  followingUserCtrl,
  unFollowUserctrl,
  blockUserCtrl,
  unblockUserCtrl,
  profilePhotoUploadctrl,
  
};
