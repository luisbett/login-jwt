import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import Home from './routes/Home.tsx'
import SignIn from './routes/SignIn.tsx'
import SignUp from './routes/SignUp.tsx'
import NotFound from './routes/NotFound.tsx'

import './index.css'

//If user is logged in
const token = localStorage.getItem('token')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: token ? <Navigate to="/home" replace /> : <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/home',
        element: token ? <Home /> : <Navigate to="/" replace />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
