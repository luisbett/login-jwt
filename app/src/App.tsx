import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

import classes from './App.module.css'

function App() {

  //Get token
  const token = localStorage.getItem('token')
  
  //If token exists, check if it is a valid token
  const validToken = token //&& await useToken(token)

  return (
    <div className={classes.container}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={validToken ? <Navigate to="/home" replace /> : <SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={validToken ? <Home /> : <Navigate to="/" replace />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App