import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.scss'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { Provider as ActivePageProvider } from './context/pageContext'
import { Provider as AuthProvider } from './context/authContext/authContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ActivePageProvider>
      <App />
    </ActivePageProvider>
  </AuthProvider>,
)

reportWebVitals()
