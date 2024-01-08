import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import{createBrowserRouter,RouterProvider}from 'react-router-dom'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: 'cadastro',
    element: <Cadastro/>,
  },
  {
    path: '/home',
    element:<Home/>,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
