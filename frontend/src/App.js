import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddNewCategory from './components/Category/AddNewCategory';
import ListAllCategory from './components/Category/ListAllCategory';
import UpdateCategory from './components/Category/UpdateCategory';
import Homepage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Navbar from './components/Navigate/Navbar';
import AdminRoute from './components/Navigate/ProtectedRoutes/AdminRoute';
import PrivateProtectedRoute from './components/Navigate/ProtectedRoutes/PrivateProtectedRoute';
import CreatePost from './components/Post/CreatePost'
import PostsList from './components/Post/PostsList';

import Register from './components/Register/Register';




function App() {
  return (
   <BrowserRouter >
   <Navbar/>
   <Routes>
    <Route exact path='/' element={<Homepage/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path="/create-post" element={<PrivateProtectedRoute><CreatePost/></PrivateProtectedRoute>}/>
    <Route exact path='/posts' element={<PostsList/>}/>

    <Route exact path='/add-category' element={<AdminRoute><AddNewCategory/></AdminRoute>}/>
    <Route exact path='/category-list' element={<AdminRoute><ListAllCategory/></AdminRoute>}/>
    <Route exact path="/update-category/:id" element={<AdminRoute><UpdateCategory/></AdminRoute>}/>



   </Routes>


   </BrowserRouter>
  )
}

export default App;
