
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom';



const  AdminRoute = ({children}) => {
    const user=useSelector(state=>state?.users);
    const {userAuth}=user;
  if(!userAuth?.isAdmin){
    return <Navigate to = '/login' replace/>
  }

   
    return children;
};


export default AdminRoute;
