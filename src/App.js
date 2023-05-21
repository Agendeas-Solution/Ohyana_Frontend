import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import './App.scss'
import { Context as AuthContext } from './context/authContext/authContext'
import { Box } from '@mui/material'
import Cookie from 'js-cookie'
import { clearLoginToken } from './services/storage'
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import { io } from 'socket.io-client'
import { Context as ContextSnackbar } from './context/pageContext'
const Login = React.lazy(() => import('./components/Login/Login'))
const DefaultLayout = React.lazy(() =>
  import('./components/layout/DefaultLayout'),
)
const ForgetPassword = React.lazy(() =>
  import('./components/ForgetPassword/ForgetPassword'),
)
const ForgotPasswordEmail = React.lazy(() =>
  import('./components/ForgotPasswordEmail/ForgotPasswordEmail'),
)
const SignUp = React.lazy(() => import('./components/SignUp/SignUp'))
const Register = React.lazy(() => import('./components/Register/Register'))

const App = () => {
  const { setPermissions } = useContext(AuthContext)
  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem('permissions'))
    setPermissions(retrievedObject)
    // socket.on('reJoin', () => {
    //   socket.emit('join', { email: localStorage.getItem('userEmail') })
    // })
    // socket.on('connect', () => {
    //   socket.emit('join', { email: localStorage.getItem('userEmail') })
    // })
    // socket.on('permissionChanged', () => {
    //   clearLoginToken()
    // })
  }, [])
  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route path="/resetpassword" element={<ForgetPassword />}></Route>
            <Route
              path="/forgotpassword"
              element={<ForgotPasswordEmail />}
            ></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
