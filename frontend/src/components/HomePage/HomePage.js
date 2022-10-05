import React, { useEffect } from "react";
import poster from "../../img/blog_banner.png";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchfollowingUserPosts, fetchPostAction } from "../../Redux/Slices/posts/postSlice";

// import { ReactComponent as ReactLogo } from "./airbnb-brands.svg";

const backgroundImageStyle = {
  backgroundImage: `url("${poster}")`,
  backgroundSize: "cover",
};
const HomePage = () => {
  const dispatch = useDispatch();


  const state = useSelector((store) => store?.users);
  const { userAuth } = state;

  useEffect(()=>{

      dispatch(fetchPostAction(""))
    
      
  },[])

  const postState = useSelector((store) => store?.post);
  const { postList } = postState;


  return (
    <div className="App">
      <div className=" text-black " style={backgroundImageStyle}>
        <div className="bg-gradient-to-bl from-black px-8 py-16">
          <div className=" max-w-3xl grid grid-cols-1 gap-8">
            <div className="w-12">
              {/* <ReactLogo className="fill-white" /> */}
            </div>
            {/* <h2 className="text-xl uppercase font-bold">Learn. Explore. Ideate. Create.</h2> */}
            <h2 className="text-5xl font-bold">
              {/* Host your space, share your world */}
              Learn. Explore. Ideate. Create.
            </h2>
            <p className="text-lg">
              Learning is where everything starts, but continuous practice and
              discipline helps you reach new heights of success and raise your
              bar. So here’s our blog, where we constantly publish new material
              on the following topics to share our thoughts and learn from your
              experiences : -
            </p>
            <button className="bg-gradient-to-r from-pink-600 to-orange-600 py-3 px-6 text-lg rounded-md w-48">
              Try hosting
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 ">
      <Cards postList={postList}/>
      </div>
    </div>
  );
};

export default HomePage;
