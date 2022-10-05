// export const getSenter=(logedUser,users)=>{
//     return users[0]._id === logedUser._id ? users[1].name : users[0].name;

// }

import React, { useState } from "react";
import { ChatState } from "../../context/ChatContext";
import { getSender } from "./ChatLoagic";

export default function GetSenter({ logedUser, users, senter, setsenter }) {
  const { notification, setNotification } = ChatState();

  notification.map((noti) => {
    let sent = getSender(logedUser, noti.chat.users);

    if (!senter.find((c) => c === sent)) {
      setsenter([sent, ...senter]);
    }
  });

  return (
    <div>
      {users[0]?._id === logedUser?._id ? (
        <div class="flex flex-row py-4 px-2  justify-center items-center border-b-2">
          <div class="w-1/4">
            <img
              src={users[1].profilePhoto}
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full ml-3">
            <div class="text-lg font-semibold">
              {users[1].name}{" "}
              {senter.includes(users[1]._id) ? (
                <span class="inline-block text-xs py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-thin bg-green-600 text-white rounded ">
                  New
                </span>
              ) : null}
            </div>
            {/* <span class="text-gray-500">Pick me at 9:00 Am</span> */}
          </div>
        </div>
      ) : (
        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <div class="w-1/4">
            <img
              src={users[0].profilePhoto}
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full ml-3">
            <div class="text-lg font-semibold">
              {users[0].name}{" "}
              {senter.includes(users[0]._id) ? (
                <span class="inline-block text-xs py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-thin bg-green-600 text-white rounded ">
                  New
                </span>
              ) : null}
            </div>
            {/* <span class="text-gray-500">Pick me at 9:00 Am</span> */}
          </div>
        </div>
      )}
    </div>
  );
}
