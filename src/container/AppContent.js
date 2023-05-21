import React, { useState, useContext, useEffect, Suspense } from 'react'
import { Routes, Route, Outlet, Navigate, Switch } from 'react-router-dom'
import Cookie from 'js-cookie'
import { Context as AuthContext } from '../context/authContext/authContext'
import { PERMISSION } from '../constants'
// const socket = io('http://192.168.1.65:9009')

const AppContent = () => {
  const { setPermissions } = useContext(AuthContext)
  const { permissions } = useContext(AuthContext).state
  const [routesPermission, setRoutesPermission] = useState([])
  const ProtectedRoutes = () => {
    return Cookie.get('userToken') ? <Outlet /> : <Navigate to="/login" />
  }
  useEffect(() => {
    var retrievedObject = JSON.parse(localStorage.getItem('permissions'))
    setPermissions(retrievedObject)
    const routeArray = []
    console.log({ permisjflsl: retrievedObject })
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
          {/* <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<UserProfile />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
            <Route path="/editprofile" element={<EditProfile />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/clientorders/:id" element={<ClientOrders />}></Route>
            <Route path="/mycart/:id" element={<MyCart />}></Route>
            <Route
              path="/dashboardemployee"
              element={<DashboardEmployee />}
            ></Route>
            <Route path="/notification" element={<Notification />}></Route>

            <Route path="/client" element={<Client />}></Route>

            <Route
              path="/clientprofile/:id"
              element={<ClientProfile />}
            ></Route>

            <Route path="/addeditclient/:id" element={<AddClient />}></Route>

            <Route path="/addeditclient" element={<AddClient />}></Route>

            <Route path="/staff" element={<Staff />}></Route>

            <Route path="/staffprofile/:id" element={<StaffProfile />}></Route>
            <Route path="*" element={<Login />}></Route>

            <Route
              path="/addeditstaff/:id"
              element={<AddStaffMember />}
            ></Route>

            <Route path="/addeditstaff" element={<AddStaffMember />}></Route>

            <Route path="/task" element={<Task />}></Route>
            <Route path="/dealer" element={<Dealer />}></Route>
            <Route path="/taskdetail/:id" element={<TaskDetail />}></Route>
            <Route path="/report" element={<Statistics />}></Route>
            <Route path="/support" element={<Support />}></Route>

            <Route path="/complaint/:id" element={<Complaint />}></Route>
            <Route path="/premium" element={<Premium />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/poll" element={<Poll />}></Route>
            <Route path="/orderdetail/:id" element={<OrderDetail />}></Route>
            <Route
              path="/leaveholidaymanagement"
              element={<HolidayAndLeaveManagement />}
            ></Route>
            <Route path="/companyprofile" element={<CompanyProfile />}></Route>
            <Route
              path="/editcompanyprofile"
              element={<EditCompanyProfile />}
            ></Route>

            <Route path="/settings" element={<Settings />}></Route>

            <Route path="/expenselist" element={<ExpenseList />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/jobrolelist" element={<JobRolesList />}></Route>
            <Route path="/jobroleaccess/:id" element={<Department />}></Route>

            <Route path="/productlist" element={<ProductList />}></Route>
          </Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/editproduct/:id" element={<AddProduct />}></Route> */}
        </Routes>
      </Suspense>
    </>
  )
}

export default React.memo(AppContent)
