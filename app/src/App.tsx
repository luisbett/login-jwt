import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

import classes from './App.module.css'

function App() {

  return (
    <div className={classes.container}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App