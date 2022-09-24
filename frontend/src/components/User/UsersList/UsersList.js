import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../Redux/Slices/users/userSlices";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [number,setNumber]=useState(1)
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.users);
  const { allUsers, loading, appErr, serverErr, unBLockedUser, blockedUser } =
    users;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, fetchAllUsers, blockedUser, unBLockedUser]);

  return (
    <>
      <div className=" mt-8 py-8 px-20  min-h-screen">
        {/* <section class="py-8 px-20 bg-gray-50 min-h-screen"> */}

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"></tr>
          </thead>
          <tbody>
            {allUsers?.map((user) => (
              <UsersListItem user={user}  />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
