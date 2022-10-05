import React from "react";

export default function UserListItem({ user, handleFunction }) {
  return (
    <div
      onClick={handleFunction}
      class="flex justify-between items-center bg-white mt-1 mb-1 p-2 hover:shadow-lg rounded cursor-pointer transition border-2 hover:border-black"
    >
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
          <span class="font-medium text-black">{user.name}</span>{" "}
          
        </div>
      </div>
      {/* <div class="flex flex-col items-center"> <span class="text-gray-300">11:26</span> <i class="fa fa-star text-green-400"></i> </div> */}
    </div>
  );
}
