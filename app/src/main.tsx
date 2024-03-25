import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { UserProvider } from './contexts/UserContext.tsx'

import useToken from './hooks/useToken.ts'

import App from './App.tsx'
import Home from './routes/Home.tsx'
import SignIn from './routes/SignIn.tsx'
import SignUp from './routes/SignUp.tsx'
import NotFound from './routes/NotFound.tsx'

import './index.css'

//Get token
const token = localStorage.getItem('token')

//If token exists, check if it is a valid token
const validToken = token && await useToken(token)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: validToken ? <Navigate to="/home" replace /> : <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/home',
        element: validToken ? <Home /> : <Navigate to="/" replace />
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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
