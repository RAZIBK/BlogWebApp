import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import {
  blockUserAction,
  unBlockUserAction,
} from "../../../Redux/Slices/users/userSlices";
import { useDispatch } from "react-redux";

const     UsersListItem = (user) => {
  const dispatch = useDispatch();


  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        {/* <td>{num}</td> */}
        <td className="px-6">
          <img
            className="py-2 px-6 h-20"
            src={user?.user?.profilePhoto}
            alt="profile "
          />
        </td>
        <td class="py-1 px-6">
          <p className="text-sm font-medium">{user?.user?.name}</p>
          <p className="text-xs text-gray-500">{user?.user?.email}</p>
        </td>
        <td className="py-4 px-6">
          <span className="text-base mr-2  text-bold text-yellow-500">
            {user.user?.followers?.length}
          </span>
          followers
        </td>
        <td className="py-4 px-6">
          <span className="text-base mr-2  boder-2 text-bold text-black-500">
            {user.user?.posts?.length} - Posts
          </span>
        </td>
        <td className="py-4 px-6">
          <Link
            to={`/profile/${user?.user?._id}`}
            className=" text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-blue-500 rounded hover:bg-blue-500 hover:text-white"
          >
            Profile
          </Link>
        </td>
        <td className="py-4 px-6">
          {user?.user?.isBlocked ? (
            <button
              onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
              className="inline-block py-1 px-2 text-center bg-gray-500 text-white mr-2 mb-1 lg:mb-0 text-xs border rounded"
            >
              unblock
            </button>
          ) : (
            <button
              onClick={() => dispatch(blockUserAction(user?.user?._id))}
              className="inline-block py-1 px-2 text-center bg-red-600 text-white mr-2 mb-1 lg:mb-0 text-xs border rounded"
            >
              Block
            </button>
          )}
        </td>
        <td className="py-4 px-6">
          <Link
            to={`/send-mail?email=${user?.user?.email}`}
            className="inline-flex  justify-center bg-gray-500 px-2 py-1   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <MailIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-200"
              aria-hidden="true"
            />
            <span className="text-base mr-2  text-bold text-white">
              Message
            </span>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default UsersListItem;
