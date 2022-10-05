import React from "react";
import { Link } from "react-router-dom";
import DateFormatter from "../../utils/dateFormatter";

export default function Cards({ postList }) {
  return (
    <div>
      <section class="md:h-full flex items-center text-gray-600">
        <div class="container xl:px-36 px-5 py-14 mx-auto">
          <div class="text-center mb-12">
            {/* <h5 class="text-base md:text-lg text-indigo-700 mb-1">See Our Recent News</h5> */}
            <h1 class="text-4xl md:text-4xl text-gray-700 font-semibold">
            Latest trend and right way to learn & research.
            </h1>
          </div>

          <div class="flex flex-wrap -m-4">
            {postList?.map((post, index) => index < 6 && (
              <div class="p-4 sm:w-1/2 lg:w-1/3 ">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:bg-white hover:shadow-lg">
                  <img
                    class="lg:h-72 md:h-48 w-full object-cover object-center"
                    src={post?.image}
                    alt="blog"
                  />
                  <div class="p-6  transition duration-300 ease-in">
                    <div className="h-40">
                    <h2 class="text-base font-medium text-indigo-300 mb-1">
                      <time>
                        <DateFormatter date={post?.createdAt} />
                      </time>
                    </h2>
                    <h1 class="text-2xl font-semibold mb-3">{post?.title}</h1>
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        webkitLineClamp: "3" /* number of lines to show */,
                        lineClamp: "3",
                        webkitBoxOrient: "vertical",
                      }}
                      class="leading-relaxed mb-3 max-h-20"
                    >
                      {post.description}
                    </p>
                    </div>
                    <div class="flex items-center flex-wrap ">
                      <Link to={`/posts/${post?._id}`} class="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0">
                        Read More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                      <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {post?.numViews}
                      </span>
                      <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          class="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        {post?.Comment?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
