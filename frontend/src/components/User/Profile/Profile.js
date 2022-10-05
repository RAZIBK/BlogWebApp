import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
  fetchUserDetails,
  followUser,
  unFollowUser,
} from "../../../Redux/Slices/users/userSlices";
import DateFormatter from "../../../utils/dateFormatter";
import UploadProfilePhoto from "./UploadProfilePhoto";
import FollowersList from "../FollowersList/FollowersList";
import Following from "../FollowersList/Following";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [showFolloingwModal, setFollowingShowModal] = useState(false);
  const [showFollowerswModal, setFollowersShowModal] = useState(false);


  
  const [follow, setfollow] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state?.users);
  const {
    profileLoading,
    profileAppErr,
    profileServerErr,
    profile,
    profilePhoto,
    IsFollow,
    IsUnfollow,
    userAuth,
  } = state;

  console.log();
  useEffect(() => {
    dispatch(fetchUserDetails(id));
    setShowModal(false);
  }, [id, dispatch, profilePhoto, IsFollow, IsUnfollow]);

  const iSLoginUser = userAuth?._id === profile?._id;


  // console.log(userAuth?._id);
  // console.log(profile?.followers);

  // console.log(profile?.followers?.includes(userAuth?._id));
  // console.log(profile?.followers?.filter(e => e._id === "fhsghu"));
  // console.log(profile?.followers?.some(e => e._id === userAuth?._id));

  // console.log(id);
  // console.log(userAuth);
  // console.log(userAuth?.following.includes(id));

  return (
    <container>
      <div className=" flex overflow-hidden bg-white">
        {/* Static sidebar for desktop */}

        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div className="sm:mb-14">
                  {/* <div>
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      // src={profile?.profilePhoto}
                      alt={profile?.name}
                    />
                  </div> */}
                  <div className="max-w-5xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:space-x-10">
                      <div className="flex ">
                        <img
                          className="h-28 w-28 rounded-full  ring-4 ring-white sm:h-40 sm:w-40"
                          src={profile?.profilePhoto}
                          alt={profile?.name}
                        />
                      </div>
                      <div className=" sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className=" flex flex-col 2xl:block  min-w-0 flex-1">
                          <span className="text-2xl   text-gray-900 mr-8 ml-3">
                            {profile?.name}

                            {/* <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"> */}
                            {/* {profile?.accountType} */}
                            {/* </span> */}
                            {/* Display if verified or not */}
                            {/* <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                              Account Verified
                            </span>

                            <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                              Unverified Account
                            </span> */}
                          </span>
                          {iSLoginUser ? (
                            <span>
                              <Link
                                to={`/update-profile/${profile?._id}`}
                                className="inline-flex justify-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                {/* <UserIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              /> */}
                                <span>Edit profile</span>
                              </Link>
                            </span>
                          ) : (
                            <span>
                              {profile?.followers?.some(e => e._id === userAuth?._id) ? (
                                <button
                                  onClick={() =>
                                    dispatch(unFollowUser(profile?._id))
                                  }
                                  className="inline-flex justify-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 "
                                >
                                  <EmojiSadIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Unfollow</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    dispatch(followUser(profile?._id))
                                  }
                                  type="button"
                                  className="inline-flex justify-center px-5 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 focus:outline-none focus:ring-offset-2 "
                                >
                                  <HeartIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  <span>Follow </span>
                                </button>
                              )}
                            </span>
                          )}

                          {/* <span> */}

                          {/* </span> */}

                          <p className="m-3 text-sm text-bold">
                            Date Joined:<span> </span>
                            <DateFormatter date={profile?.createdAt} />{" "}
                          </p>
                          <p className="text-gray-900 mt-2  mb-2 ml-3">
                            {profile?.posts?.length} posts{" "}
                            <button onClick={()=>setFollowersShowModal(true)}>
                              <span className="ml-5 text-bold">
                                {profile?.followers.length} followers{" "}
                              </span>
                            </button>
                            <button onClick={() => setFollowingShowModal(true)}>
                              <span className="ml-5">
                                {profile?.following.length} following{" "}
                              </span>
                            </button>
                          </p>
                          {/* Who view my profile */}
                          {/* <div className="flex items-center  mb-2">
                            <EyeIcon className="h-5 w-5 " />
                            <div className="pl-2">
                              {profile?.viewedBy?.length}{" "}
                              <span className="text-indigo-400 cursor-pointer hover:underline">
                                users viewed your profile
                              </span>
                            </div>
                            
                          </div> */}
                          <FollowersList
                  visible={showFollowerswModal}
                  onClose={() => setFollowersShowModal(false)}
                  Following={profile?.followers}
                  followers={profile?.followers}

                  userAuth={userAuth}
                   />
                  <Following
                  visible={showFolloingwModal}
                  onClose={() => setFollowingShowModal(false)}
                  Following={profile?.following}
                  followers={profile?.followers}
                  userAuth={userAuth}

                   />
                          <div className="pl-2 mb-4 ml-1">
                            {/* {profile?.viewedBy?.length}{" "} */}
                            <span className="text-gray-600  cursor-pointer hover:underline">
                              {profile?.bio}
                            </span>
                          </div>

                          {/* is login user */}
                          {/* Upload profile photo */}
                          {iSLoginUser && <button
                            // to={`/upload-profile-photo/${profile?._id}`}
                            className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            onClick={() => setShowModal(true)}
                          >
                            <UploadIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Upload Photo</span>
                          </button> }
                          

                          {/*   
      <div className="w-screen h-screen flex items-center justify-center">
        <button
          className="py-2 px-5 bg-blue-500 text-white"
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </button> */}
                          {/* </div> */}
                          <UploadProfilePhoto
                            visible={showModal}
                            onClose={() => setShowModal(false)}
                          />
                        </div>

                        {/* Update Profile */}

                        {/* Send Mail */}
                        {/* <Link to={""}
                            // to={`/send-mail?email=${profile?.email}`}
                            className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <MailIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                              aria-hidden="true"
                            />
                            <span className="text-base mr-2  text-bold text-yellow-500">
                              Send Message
                            </span>
                          </Link> */}
                        {/* </div> */}
                      </div>
                    </div>
                    {/* <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile?.lastName}Last Name
                      </h1>
                    </div> */}
                  </div>
                </div>
                {/* Tabs */}

                <div className="flex justify-center place-items-start flex-wrap  md:mb-0  ">
                  {/* All my Post */}
                  <div className="w-full md:w-4/5 px-4 mb-4 md:mb-0">
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                      <div className="border-b border-gray-400">
                        {/* <div className="max-w-5xl mx-auto "></div> */}
                      </div>
                    </div>

                    <h1 className="text-center text-xl my-3  ">POSTS</h1>
                    {/* Loo here */}
                    {profile?.posts?.length <= 0 ? (
                      <h2 className="text-center">No Post Found</h2>
                    ) : (
                      profile?.posts.map((post) => (
                        <div className="flex flex-wrap mx-1  -mx-3 mt-3  lg:mb-6 border border-gray-400  p-1">
                          <div className="mb-2 mt-2 md:w-2/6 sm:w-1/4  w-full lg:w-1/5 px-3">
                            <Link to={""}>
                              <img
                                className="object-cover h-40 rounded"
                                src={post?.image}
                                alt="poster"
                              />
                            </Link>
                          </div>
                          <div className="w-full lg:w-3/4 md:w-4/6 sm:w-3/4">
                            <Link
                              to={""}
                              // to={`/post/${post?._id}`}
                              className="hover:underline"
                            >
                              <h3 className="mb-1 text-2xl text-gray-900 font-bold font-heading">
                                {post?.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 truncate">
                              {post?.description}
                            </p>
                            {/* Read more.. */}
                            <Link
                              // to={""}
                              to={`/posts/${post?._id}`}
                              className="text-indigo-500 hover:underline"
                            >
                              Read more..
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </container>
  );
}
