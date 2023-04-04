import React, { useEffect, useState } from 'react'
import AppContent from '../../container/AppContent'
import Cookie from 'js-cookie'
import { Navigate, useNavigate, Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
const DefaultLayout = () => {
  if (!Cookie.get('userToken')) {
    return <Navigate to="/login" />
  }
  return (
    <div className="d-flex">
      <SideBar />
      <div className={'width-main'}>
        <Header />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
