import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { Context as AuthContext } from '../context/authContext/authContext'
import { PERMISSION } from '../constants'
// const socket = io('http://192.168.1.65:9009')

const AppContent = () => {
  const { setPermissions } = useContext(AuthContext)
  const { permissions } = useContext(AuthContext).state
  const [routesPermission, setRoutesPermission] = useState([])
  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem('permissions'))
    setPermissions(retrievedObject)
    const routeArray = []
    for (let permissionRoute of PERMISSION.PERMISSION_ROUTE) {
      if (permissionRoute.value) {
        if (retrievedObject.includes(permissionRoute.value))
          routeArray.push(permissionRoute)
      } else {
        routeArray.push(permissionRoute)
      }
    }
    setRoutesPermission(routeArray)
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
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  return (
    <>
      <Suspense fallback={loading}>
        <Routes>
          {routesPermission.map(routes => {
            return <Route path={routes.path} element={routes.component}></Route>
          })}
        </Routes>
      </Suspense>
    </>
  )
}

export default React.memo(AppContent)
