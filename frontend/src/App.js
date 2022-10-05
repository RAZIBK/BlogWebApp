import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddNewCategory from './components/Category/AddNewCategory';
import ListAllCategory from './components/Category/ListAllCategory';
import UpdateCategory from './components/Category/UpdateCategory';
import Homepage from './components/HomePage/HomePage';
import Login from './components/User/Login/Login';
import Navbar from './components/Navigate/Navbar';
import AdminRoute from './components/Navigate/ProtectedRoutes/AdminRoute';
import PrivateProtectedRoute from './components/Navigate/ProtectedRoutes/PrivateProtectedRoute';
import CreatePost from './components/Post/CreatePost'
import PostDetails from './components/Post/PostDetails';
import PostsList from './components/Post/PostsList';
import UpdatePost from './components/Post/UpdatePost'
import Register from './components/User/Register/Register';

import Profile from './components/User/Profile/Profile'
import UpdateProfileForm from './components/User/Profile/UpdateProfileForm';
import UsersList from './components/User/UsersList/UsersList';
import Chat from './components/Chat/Chat';

import Search from './components/User/UsersSearch/Search';





function App() {
  return (
    <>
   <BrowserRouter >
   <Navbar/>
   <Routes>
    <Route exact path='/' element={<Homepage/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path="/create-post" element={<PrivateProtectedRoute><CreatePost/></PrivateProtectedRoute>}/>
    <Route exact path="/update-post/:id" element={<PrivateProtectedRoute><UpdatePost/></PrivateProtectedRoute>}/>
    <Route exact path="/update-profile/:id" element={<PrivateProtectedRoute><UpdateProfileForm/></PrivateProtectedRoute>}/>

    <Route exact path="/Profile/:id" element={<PrivateProtectedRoute><Profile/></PrivateProtectedRoute>}/>

    <Route exact path='/chat' element={<PrivateProtectedRoute><Chat/></PrivateProtectedRoute>}/>


    <Route exact path='/posts' element={<PostsList/>}/>
    <Route exact path='/posts/:id' element={<PostDetails/>}/>

    <Route exact path='/add-category' element={<AdminRoute><AddNewCategory/></AdminRoute>}/>
    <Route exact path='/category-list' element={<AdminRoute><ListAllCategory/></AdminRoute>}/>
    <Route exact path="/update-category/:id" element={<AdminRoute><UpdateCategory/></AdminRoute>}/>
    <Route exact path='/users' element={<AdminRoute><UsersList/></AdminRoute>}/>

    <Route exact path='/table' element={<Search/>}/>




   </Routes>


   </BrowserRouter>
   {/* <ToastContainer/> */}
   </>
  )
}

export default App;
