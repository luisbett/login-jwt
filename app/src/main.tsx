import React from 'react'
import ReactDOM from 'react-dom/client'

import { TokenProvider } from './contexts/TokenContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TokenProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </TokenProvider>
  </React.StrictMode>,
)