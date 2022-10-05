import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { isSameSender, isLastMessage } from "./ChatLoagic";

export default function ChatBody({ messages }) {
  const state = useSelector((store) => store?.users);
  const { userAuth } = state;
  return (
    <ScrollableFeed className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300  overflow-y-scroll">
      {messages?.length > 0 &&
        messages.map((m, i) => (
          <div key={m._id}>
            <div className={m.sender._id===userAuth._id ?"flex justify-end mr-2 mb-4 ":"flex justify-start mb-4 "}>
              {(isSameSender(messages, m, i, userAuth._id) ||
                isLastMessage(messages, i, userAuth._id)) && (
                <img
                  src={m.sender.profilePhoto}
                  class="object-cover h-8 w-8 rounded-full "
                  alt=""
                />
              )}
              <div className={m.sender._id===userAuth._id ? "relative max-w-xl px-4  py-2 text-gray-700 bg-gray-100 rounded shadow ":"relative max-w-xl ml-3 px-4 py-2 text-gray-700 bg-gray-500 rounded shadow " }>
                    <span class="block">{m.content}</span>
                  </div>
              <div></div>
                  
              
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
}

{
  /* <div class="flex flex-col mt-5">
<div class="flex justify-end mb-4">
  <div class="mr-2 py-3 px-4 bg-blue-300 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
    Welcome to group everyone !
  </div>
  <img
    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
    class="object-cover h-8 w-8 rounded-full"
    alt=""
  />
</div>
<div class="flex justify-start mb-4">
  <img
    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
    class="object-cover h-8 w-8 rounded-full"
    alt=""
  />
  <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quaerat at praesentium, aut ullam delectus odio error sit rem.
    Architecto nulla doloribus laborum illo rem enim dolor odio
    saepe, consequatur quas?
  </div>
</div>
<div class="flex justify-end mb-4">
  <div>
    <div class="mr-2 py-3 px-4 bg-blue-300 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Magnam, repudiandae.
    </div>

    <div class="mt-4 mr-2 py-3 px-4 bg-blue-300 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Debitis, reiciendis!
    </div>
  </div>
  <img
    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
    class="object-cover h-8 w-8 rounded-full"
    alt=""
  />
</div>
<div class="flex justify-start mb-4">
  <img
    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
    class="object-cover h-8 w-8 rounded-full"
    alt=""
  />
  <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
    happy holiday guys!
  </div>
</div>
</div> */
}
