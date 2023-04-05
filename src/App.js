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
// const SideBar = React.lazy(() => import('./components/SideBar/SideBar'))
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import { io } from 'socket.io-client'
import { Context as ContextSnackbar } from './context/pageContext'
const socket = io('http://192.168.1.65:9009')
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
    socket.on('reJoin', () => {
      socket.emit('join', { email: localStorage.getItem('userEmail') })
    })
    socket.on('connect', () => {
      console.log('Successfully connected to server')
      socket.emit('join', { email: localStorage.getItem('userEmail') })
    })
    socket.on('permissionChanged', () => {
      clearLoginToken()
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Suspense>
          <div className="d-flex">
            <div className={'w-100'}>
              <Routes>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  element={<Login />}
                />
                <Route
                  path="/resetpassword"
                  element={<ForgetPassword />}
                ></Route>
                <Route
                  path="/forgotpassword"
                  element={<ForgotPasswordEmail />}
                ></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/* <Route
                    exact
                    path="/changePassword"
                    name="Change Password"
                    element={<ChangePassword />}
                  />
                  <Route
                    exact
                    path="/forgotPassword"
                    name="Change Password"
                    element={<ForgotPassword />}
                  />
                  <Route
                    exact
                    path="/register"
                    name="Register Page"
                    element={<Register />}
                  />
                  <Route
                    exact
                    path="/404"
                    name="Page 404"
                    element={<Page404 />}
                  />
                  <Route
                    exact
                    path="/500"
                    name="Page 500"
                    element={<Page500 />}
                  /> */}
                {/* <Route exact path="/lock" name="Lock" element={<Lock />} /> */}
                <Route path="*" element={<DefaultLayout />} />
              </Routes>
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
export { socket }
