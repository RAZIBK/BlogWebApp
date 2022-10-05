import { UploadIcon } from "@heroicons/react/outline";
import React from "react";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import ScrollableFeed from "react-scrollable-feed";


import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../../Redux/Slices/users/userSlices";
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function Following({
  children,
  visible,
  onClose,
  Following,followers,
  userAuth
}) {
  const dispatch=useDispatch()
  //   const users=useSelector(state=>state?.users)
  //   const {loading,profilePhoto,appErr,serverErr}=users;
  if (!visible) return null;

  const handleOnBackDropClick = (e) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white w-96 p-5 rounded border-b-4 ">
        <div className="font-bold text-xl text-center text-black border-b-2 border-gray-700 pb-1">
          Following
        </div>
        <ul>
          <div class="flex flex-col mt-5  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-96 overflow-y-scroll ">
            <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300  overflow-y-scroll">
              {Following?.map((user) => (
                <li class="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                  <Link onClick={() => onClose()} to={`/profile/${user?._id}`}>
                    <div class="flex ml-2">
                      {" "}
                      <img
                        src={user.profilePhoto}
                        width="40"
                        height="40"
                        class="rounded-full"
                      />
                      <div class="flex flex-col ml-2">
                        {" "}
                        <span class="font-medium text-black">
                          {user.name}
                        </span>{" "}
                        <span class="text-sm text-gray-400 truncate w-32">
                          {user.bio}
                        </span>{" "}
                      </div>
                    </div>
                  </Link>
                  <div class="flex flex-col items-center">
                    {" "}
                    {user?.followers?.includes(userAuth?._id)?
                    (<span onClick={() =>
                      dispatch(unFollowUser(user?._id))
                    } class="text-gray-300">Unfollow</span>):<span onClick={() =>
                      dispatch(followUser(user?._id))
                    } class="text-gray-300">Follow</span>
                    }
                    <i class="fa fa-star text-green-400"></i>{" "}
                  </div>
                </li>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
