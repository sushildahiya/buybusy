import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { useValueAuth } from './context/authContext';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Signin from './components/User/Signin';
import Cart from './components/Cart/Cart';
import Signup from './components/User/Signup';
import Orders from './components/Order/Orders';

function App() {
  const {authentication}= useValueAuth();
  const router = createBrowserRouter([{
    path:'/', element:<Navbar/>,
    children:[{
      path:'/',
      element:<Homepage/>
    },{
      path:'/sign-in',
      element:<Signin/>
    },
    {
      path:'/cart',
      element:authentication?<Cart/>:<Signin/>
    },
    {
      path:'/sign-up',
      element:<Signup/>
    },
    {
      path:'/my-orders',
      element:authentication?<Orders/>:<Signin/>
    }
  ]
  }])
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
