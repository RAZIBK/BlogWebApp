// import React from "react";

// export default function Chat() {
//   return (
//     <div>
//       <div>
//         <div className="relative min-h-screen flex flex-col bg-gray-50">
//           <nav className="flex-shrink-0 bg-red-600">
//             <div className=" max-w-7xl mx-auto px-2 sm:px-4 lg:py-8">
//               <div className="relative flex items-center justify-between h-16">
//                 <div></div>
//                 <div className="flex lg:hidden">
//                   <button className="bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       class="w-6 h-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M4 6h16M4 12h16m-7 6h7"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="hidden lg:block lg:w-80">
//                   <div className="flex items-center justify-end">
//                     <div div className="flex">
//                       <a
//                         href="#"
//                         className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white"
//                       >
//                         Char
//                       </a>
//                     </div>
//                     <div className="ml-4 relative flex-shrink-0">
//                       <div>
//                         <button className="bg-red-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-white">
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
//                             alt=""
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import GetSenter from "./GetSenter";
import SideBar from "./SideBar";
import {
  fetchChatsAction,
  sentNewMessage,
} from "../../Redux/Slices/chat/ChatSlice";
import ChatBody from "./ChatBody";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import io from "socket.io-client";
import { ChatState } from "../../context/ChatContext";
import { getSender, getSenderFull } from "./ChatLoagic";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const formSchema = Yup.object({
  message: Yup.string().required("Description is required"),
});

export default function Chat() {
  const inputElm = useRef("");
  const { notification, setNotification } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [message, setMessage] = useState([]);
  const [senter, setsenter] = useState([]);

  const [searchTerm, setSearchTerm] = useState(""); //sh
  const [serachResults, setSearchResult] = useState([]);

  // const [typing, setTyping] = useState(false);
  // const [istyping, setIsTyping] = useState(false);

  const state = useSelector((store) => store?.users);
  const { userAuth } = state;

  const chatlist = useSelector((state) => state?.chat);
  const { createChat, isCreated, sentedMessage, ChatUsers, isUser } = chatlist;

  useEffect(() => {
    allMessages(selectedChat?._id);
    // dispatch(allMessages(selectedChat?._id))
    // socket.emit('join chat',selectedChat?._id)
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  console.log(notification, "....");

  useEffect(() => {
    userSeting();
  }, [fetchAgain]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userAuth);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on('typing',()=>setTyping(true))
    // socket.on('stop typing',()=>setTyping(false))
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
  });

  const user = useSelector((state) => state?.users);

  const token = user?.userAuth?.token;

  const userSeting = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/chat`, config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sentData = async (value) => {
    socket.emit("stop typing", selectedChat._id);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/chat/message`,
        { content: value.content, chatId: value.chatId },
        config
      );
      socket.emit("new message", data);
      setMessage([...message, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const allMessages = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/chat/message/${id}`,
        config
      );
      socket.emit("join chat", selectedChat._id);
      setMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        content: values.message,
        chatId: selectedChat._id,
      };
      sentData(data);
      resetForm({ values: "" });
    },
    validationSchema: formSchema,
    // handleChange:(e)=>{
    //   console.log('Ofiosie');
    //       sentedMessage(e.target.value)
    //   if(!typing(true)){
    //     setTyping(true);
    //     socket.emit('typing',selectedChat._id)
    //   }
    //   let lastTypingTime = new Date().getTime();
    //   let timerLength=3000;
    //   setTimeout(() => {
    //     let timeNow=new Date().getTime();
    //     let timeDiff=timeNow-lastTypingTime;
    //     if (timeDiff >= timerLength && typing) {
    //       socket.emit('stop typing', selectedChat._id)
    //       setTyping(false)

    //     }

    //   }, timerLength);
    // }
  });

  // const handleChange=(e)=>{
  //   console.log("fisoi");
  //   sentedMessage(e.target.value)
  // }

  if (chats > 0 || createChat) {
    if (!chats.find((c) => c?._id === createChat?._id))
      setChats([createChat, ...chats]);
  }

  const serachHandler = () => {
    //sh
    setSearchTerm(inputElm.current.value);

    if (searchTerm !== "") {
      const newSearchResult = chats.filter((chat) => {
        return Object.values(getSenderFull(userAuth, chat.users))
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newSearchResult);
    } else {
      setSearchResult(chats);
    }
  };

  return (
    <div className="bg-gray-50 pt-8 pb-6">
      <div className=" lg:mr-20 lg:ml-20  ">
        <div class="container mx-auto shadow-lg rounded-lg">
          <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            {/* <div class="font-semibold text-2xl">GoingChat</div> */}
            <div class="w-1/4">
              <input
                type="text"
                name=""
                id=""
                placeholder="search IRL"
                class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                onClick={() => setOpen(true)}
              />
              <SideBar
                open={open}
                setOpen={setOpen}
                setSelectedChat={setSelectedChat}
              ></SideBar>
            </div>

            {/* <div class="text-center">
   <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
   Show drawer form
   </button>
</div> */}
            {selectedChat ? (
              <div class="h-14 w-14 rounded-full  font-semibold flex items-center justify-center">
                <img
                  className="   rounded-full"
                  src={
                    getSenderFull(userAuth, selectedChat?.users).profilePhoto
                  }
                />
                {selectedChat?.name}
              </div>
            ) : null}
          </div>
          <div class="flex flex-row justify-between bg-white">
            <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div class="border-b-2 py-4 px-2">
                <input
                  ref={inputElm}
                  type="text"
                  placeholder="search chatting"
                  class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                  value={searchTerm}
                  onChange={serachHandler}
                />
              </div>

              {/* {chats?( */}
              <div>
                {searchTerm.length < 1 ? (
                  <div>
                    {chats?.map((chat) => (
                      <div
                        onClick={() => {
                          setSelectedChat(chat);
                          setNotification(
                            notification.filter((n) => n.chat._id !== chat._id)
                          );
                          setsenter(
                            senter.filter(
                              (n) => n !== getSender(userAuth, chat.users)
                            )
                          );
                        }}
                        className={
                          selectedChat?._id == chat?._id
                            ? "bg-gray-300 hover:bg-gray-100"
                            : "bg-white hover:bg-gray-100 "
                        }
                      >
                        <GetSenter
                          key={chat._id}
                          logedUser={userAuth}
                          users={chat.users}
                          setsenter={setsenter}
                          senter={senter}

                          // serach={searchResult} //sh
                          // searchKeyWord={serachHandler}
                        ></GetSenter>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {serachResults?.map((chat) => (
                      <div
                        onClick={() => {
                          setSelectedChat(chat);
                          setNotification(
                            notification.filter((n) => n.chat._id !== chat._id)
                          );
                          setsenter(
                            senter.filter(
                              (n) => n !== getSender(userAuth, chat.users)
                            )
                          );
                        }}
                        className={
                          selectedChat?._id == chat?._id
                            ? "bg-gray-300 hover:bg-gray-100"
                            : "bg-white hover:bg-gray-100 "
                        }
                      >
                        <GetSenter
                          key={chat._id}
                          logedUser={userAuth}
                          users={chat.users}
                          setsenter={setsenter}
                          senter={senter}

                          // serach={searchResult} //sh
                          // searchKeyWord={serachHandler}
                        ></GetSenter>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ):null} */}
            </div>
            <div class="w-full px-5 flex flex-col justify-between bg-gray-200 ">
              <div class="flex flex-col mt-5  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-96 overflow-y-scroll ">
                <ChatBody messages={message} />
              </div>

              {selectedChat ? (
                <div class="py-8">
                  {/* {istyping ? <div>Loading...</div>:<></>} */}
                  {/* <input
    class="w-full bg-white  py-5 px-3 rounded-xl"
    type="text"
    placeholder="type your message here..."
    required
  /> */}
                  <form
                    onSubmit={formik.handleSubmit}
                    className="mt-1 flex min-w-sm m-auto"
                  >
                    <input
                      onBlur={formik.handleBlur("message")}
                      value={formik.values.message}
                      onChange={formik.handleChange("message")}
                      type="text"
                      name="text"
                      rows="5"
                      id="text"
                      className="shadow-sm focus:ring-indigo-500  h-14  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md bg-white"
                      placeholder="type your message here..."
                      // required
                      // onKeyDown={formik.handleSubmit}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-black bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="h-32"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
