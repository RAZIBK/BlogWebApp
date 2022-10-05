/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import {toast} from 'react-toastify'
import { serchUserAction } from "../../Redux/Slices/users/userSlices";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import UserListItem from "./UserListItem";
import { createChatAction } from "../../Redux/Slices/chat/ChatSlice";

const formSchema = Yup.object({
  data: Yup.string().required("Description is required"),
});

export default function Example({ open, setOpen,setSelectedChat }) {
  const dispatch = useDispatch();

  const state = useSelector((state) => state?.users);
  const { loading, appErr, serverErr, serchUser } = state;

  const chatlist = useSelector((state) => state?.chat);
  const { createChat,isCreated } = chatlist;
  
  const formik = useFormik({
    initialValues: {
      data: "",
    },
    onSubmit: (values) => {
      const data = values?.data;
      dispatch(serchUserAction(data));
    },
    validationSchema: formSchema,
  });

  const accessChat = (userId) => {
    dispatch(createChatAction(userId))
    setOpen(false)
  };

  isCreated || createChat && setSelectedChat(createChat)
  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 mr-5">
                      <button
                        type="button"
                        className="rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900 mt-7">
                        <form
                          onSubmit={formik.handleSubmit}
                          className="mt-1 flex min-w-sm m-auto"
                        >
                          <input
                            onBlur={formik.handleBlur("data")}
                            value={formik.values.data}
                            onChange={formik.handleChange("data")}
                            type="text"
                            name="text"
                            rows="5"
                            id="text"
                            className="shadow-sm focus:ring-indigo-500   mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md bg-gray-100"
                            placeholder="Search user"
                          />

                          <button
                            type="submit"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Go
                          </button>
                        </form>
                      </Dialog.Title>
                    </div>
                    <div className="mt-5 bg-gray-200">
                      {serchUser?.map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => accessChat(user?._id)}
                          
                        />
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
