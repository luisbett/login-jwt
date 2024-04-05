import { Outlet } from 'react-router-dom'
import classes from './App.module.css'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className={classes.container}>
      <Toaster />
      <Outlet />
    </div>
  )
}

export default App
