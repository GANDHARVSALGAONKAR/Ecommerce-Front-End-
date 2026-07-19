import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Profile from './components/pages/Profile'
import AddProduct from './components/adminPages/AddProduct'
import ProductList from './components/adminPages/ProductList'
import Products from './components/pages/Products'
import { LoginProvider } from './context/LoginContext'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path:'add-product',element:<AddProduct/>},
      {path:'/admin/products',element:<ProductList/>},
      {path:'products',element:<Products/>},
      {path:"cart",element:<Cart/>},
      {path:"checkout",element:<Checkout/>}
    ],
  }
])

function App() {
  return (
    <>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
      
    </>
  )
}

export default App
