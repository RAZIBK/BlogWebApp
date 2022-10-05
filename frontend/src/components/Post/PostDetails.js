import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePostAction,
  fetchPostDetails,
} from "../../Redux/Slices/posts/postSlice";
import DateFormatter from "../../utils/dateFormatter";
import AddComment from "../Comments/Comments";
import CommentsList from "../Comments/CommentList";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state?.post);
  const { loading, appErr, serverErr, PostDetails, isDeleted } = state;

  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [id, dispatch]);

  const user = useSelector((state) => state?.users);
  const _id = user?.userAuth?._id;
  // const {userAuth:{_id},}=user;
  const isCreatedBy = PostDetails?.user?._id === _id || user?.userAuth.isAdmin===true;

  //  console.log(PostDetails?.Comment);
  if (isDeleted) return <Navigate to={"/posts/"} />;
  return (
    <>
      <section className=" relativ  overflow-hidden lg:px-10">
        <div className="relative container  mx-auto">
          <div className="">
            <div className="flex flex-wrap  -mx-4">
              <div className=" w-full   lg:px-4">
                <div className="  py-12">
                  {loading ? (
                    loading
                  ) : appErr || serverErr ? (
                    <h1 className="text-red-400 text-xl">
                      Server{serverErr} {appErr}
                    </h1>
                  ) : (
                    <section className=" bg-white overflow-hidden divide-y divide-gray-500  ">
                      <div className="container lg:px-20  mx-auto w-3/4">
                        <div className="inline-flex  mb-5 items-center">
                          <img
                            className="mr-5 w-20 lg:w-20 h-20 lg:h-20 rounded-full"
                            src="https://cdn.pixabay.com/photo/2021/02/24/23/43/boy-6047786_960_720.jpg"
                            alt=""
                          />
                          <div className="text-left">
                            <Link to={`/profile/${PostDetails?.user?._id}`}>
                            <h4 className="text-xl  text-gray-900">
                              {/* <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600"> */}
                              {PostDetails?.user?.name}
                              {/* </span> */}
                            </h4>
                            </Link>
                            <p className="text-gray-500">
                              <DateFormatter date={PostDetails?.createdAt} />
                            </p>
                          </div>
                        </div>

                        {/* Post Image */}
                        <img
                          className="mb-8 w-full h-96   object-cover "
                          src={PostDetails?.image}
                          alt=""
                        />
                        <h1 className=" mb-5 text-2xl 2xl:text-5xl font-bold text-gray-900 leading-tight font-heading">
                          {PostDetails?.title}
                        </h1>
                        <div className=" mx-auto text-center">
                          {/* User */}

                          {/* Post description */}
                          <div className=" mx-auto">
                            <p className="mb-6 text-left  text-xl text-gray-600">
                              {PostDetails?.description}

                              {/* Show delete and update btn if created user */}
                              {isCreatedBy ? (
                                <p className="flex">
                                  <Link
                                    to={`/update-post/${PostDetails?._id}`}
                                    className="p-3"
                                  >
                                    <PencilAltIcon className="h-8 mt-3 text-gray-400" />
                                  </Link>

                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deletePostAction(PostDetails?._id)
                                      )
                                    }
                                    className="ml-3"
                                  >
                                    <TrashIcon className="h-8 mt-3 text-red-600" />
                                  </button>
                                </p>
                              ) : null}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="container lg:px-20  mx-auto w-3/4">
                        {_id ? <AddComment postId={id} /> : null}

                        <div className="mx-auto justify-center items-center">
                          {/* <CommentsList comments={PostDetails?.comments} postId={post?._id} /> */}
                          <CommentsList id={id} />
                        </div>
                      </div>
                    </section>
                  )}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
