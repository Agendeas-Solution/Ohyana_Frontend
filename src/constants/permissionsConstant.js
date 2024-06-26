import EditProfile from '../components/EditProfile/EditProfile'
import UserProfile from '../components/UserProfile/UserProfile'
import MyCart from '../components/Orders/MyCart'
import DashboardEmployee from '../components/DashboardEmployee/DashboardEmployee'
import Client from '../components/Client/Client'
import ClientProfile from '../components/ClientProfile/ClientProfile'
import Staff from '../components/Staff/Staff'
import AddStaffMember from '../components/Staff/AddStaffMember'
import Task from '../components/Task/Task'
import Statistics from '../components/Statistics/Statistics'
import TaskDetail from '../components/Task/TaskDetail'
import Support from '../components/Support/Support'
import ClientOrders from '../components/Orders/ClientOrders'
import AddClient from '../components/AddClient/AddClient'
import Login from '../components/Login/Login'
import Complaint from '../components/Complaint/Complaint'
import Orders from '../components/Orders/Orders'
import Premium from '../components/Premium/Premium'
import OrderDetail from '../components/Orders/OrderDetail'
import HolidayAndLeaveManagement from '../components/HolidayAndLeaveManagement/HolidayAndLeaveManagement'
import CompanyProfile from '../components/CompanyProfile/CompanyProfile'
import Settings from '../components/Settings/Settings'
import EditCompanyProfile from '../components/CompanyProfile/EditCompanyProfile'
import JobRoleAccess from '../components/Settings/Department'
import JobRolesList from '../components/Settings/JobRolesList'
import Integrations from '../components/Integrations/Integrations'
import ExpenseList from '../components/Expense/ExpenseList'
import AddProduct from '../components/Settings/AddProduct'
import ProductList from '../components/Settings/ProductList'
import Dashboard from '../components/Dashboard'
import StaffProfile from '../components/Staff/StaffProfile'
import NoResultFound from '../components/ErrorComponent/NoResultFound'
import Notification from '../components/Notification/Notification'
export const PERMISSION = {
  PERMISSIONTYPE: [
    { status: false, value: 'EditClient' },
    { status: false, value: 'DeleteClient' },
    { status: false, value: 'ViewClient' },
    { status: false, value: 'ViewStaff' },
    { status: false, value: 'EditStaff' },
    { status: false, value: 'DeleteStaff' },
    { status: false, value: 'ViewRole' },
    { status: false, value: 'EditRole' },
    { status: false, value: 'DeleteRole' },
    { status: false, value: 'ViewProduct' },
    { status: false, value: 'EditProduct' },
    { status: false, value: 'DeleteProduct' },
    { status: false, value: 'AccessClientSettings' },
    { status: false, value: 'AccessStaffSettings' },
    { status: false, value: 'AccessSetting' },
    { status: false, value: 'EditCompanyProfile' },
    { status: false, value: 'EditLeaveDetail' },
    { status: false, value: 'DeleteLeave' },
    { status: false, value: 'EditHolidayDetail' },
    { status: false, value: 'DeleteHoliday' },
    { status: false, value: 'ViewExpense' },
    { status: false, value: 'EditExpense' },
    { status: false, value: 'DeleteExpense' },
    { status: false, value: 'AccessIntegration' },
    { status: false, value: 'ViewReport' },
    { status: false, value: 'ViewOrders' },
    { status: false, value: 'UpdateOrderDeliveryStatus' },
    { status: false, value: 'UpdateOrderPaymentStatus' },
    { status: false, value: 'UpdateExpenseApprovalStatus' },
    { status: false, value: 'UpdateExpensePaymentStatus' },
    { status: false, value: 'ViewBusinessCard' },
    { status: false, value: 'DeleteBusinessCard' },
    { status: false, value: 'ViewPJP' },
    { status: false, value: 'DeletePJP' },
    { status: false, value: 'EditPJP' },
    { status: false, value: 'PlaceOrder' },
    { status: false, value: 'AddBusinessCard' },
    { status: false, value: 'AddBusinessCards' },
  ],
  PERMISSIONS: {
    EDIT_CLIENT: 'EditClient',
    DELETE_CLIENT: 'DeleteClient',
    VIEW_CLIENT: 'ViewClient',
    VIEW_STAFF: 'ViewStaff',
    EDIT_STAFF: 'EditStaff',
    DELETE_STAFF: 'DeleteStaff',
    VIEW_ROLE: 'ViewRole',
    EDIT_ROLE: 'EditRole',
    DELETE_ROLE: 'DeleteRole',
    VIEW_PRODUCT: 'ViewProduct',
    EDIT_PRODUCT: 'EditProduct',
    DELETE_PRODUCT: 'DeleteProduct',
    ACCESS_CLIENT_SETTINGS: 'AccessClientSettings',
    ACCESS_STAFF_SETTINGS: 'AccessStaffSettings',
    ACCESS_SETTINGS: 'AccessSetting',
    EDIT_COMPANY: 'EditCompanyProfile',
    EDIT_LEAVE: 'EditLeaveDetail',
    DELETE_LEAVE: 'DeleteLeave',
    EDIT_HOLIDAY: 'EditHolidayDetail',
    DELETE_HOLIDAY: 'DeleteHoliday',
    VIEW_EXPENSE: 'ViewExpense',
    EDIT_EXPENSE: 'EditExpense',
    DELETE_EXPENSE: 'DeleteExpense',
    ACCESS_INTEGRATION: 'AccessIntegration',
    VIEW_REPORT: 'ViewReport',
    VIEW_ORDERS: 'ViewOrders',
    UPDATE_ORDER_DELIVERY_STATUS: 'UpdateOrderDeliveryStatus',
    UPDATE_ORDER_PAYMENT_STATUS: 'UpdateOrderPaymentStatus',
    UPDATE_EXPENSE_APPROVAL_STATUS: 'UpdateExpenseApprovalStatus',
    UPDATE_EXPENSE_PAYMENT_STATUS: 'UpdateExpensePaymentStatus',
    VIEW_BUSINESS_CARD: 'ViewBusinessCard',
    ADD_BUSINESS_CARD: 'AddBusinessCard',
    DELETE_BUSINESS_CARD: 'DeleteBusinessCard',
    VIEW_PJP: 'ViewPJP',
    DELETE_PJP: 'DeletePJP',
    EDIT_PJP: 'EditPJP',
    PLACE_ORDER: 'PlaceOrder',
  },
  PERMISSION_ROUTE: [
    { path: '/', component: <UserProfile /> },
    { path: '/profile', component: <UserProfile /> },
    { path: '/editprofile', component: <EditProfile /> },
    { path: '/dashboard', component: <Dashboard /> },
    {
      path: '/notification',
      component: <Notification />,
    },
    {
      path: '/clientorders/:id',
      component: <ClientOrders />,
      value: 'ViewOrders',
    },
    { path: '/mycart/:id', component: <MyCart />, value: 'ViewOrders' },
    { path: '/dashboardemployee', component: <DashboardEmployee /> },
    { path: '/client', component: <Client />, value: 'ViewClient' },
    {
      path: '/clientprofile/:id',
      component: <ClientProfile />,
      value: 'ViewClient',
    },
    {
      path: '/addeditclient/:id',
      component: <AddClient />,
      value: 'EditClient',
    },
    { path: '/addeditclient', component: <AddClient />, value: 'EditClient' },
    { path: '/staff', component: <Staff />, value: 'ViewStaff' },
    {
      path: '/staffprofile/:id',
      component: <StaffProfile />,
      value: 'ViewStaff',
    },
    { path: '*', component: <NoResultFound /> },
    {
      path: '/addeditstaff/:id',
      component: <AddStaffMember />,
      value: 'EditStaff',
    },
    {
      path: '/addeditstaff',
      component: <AddStaffMember />,
      value: 'EditStaff',
    },
    { path: '/task', component: <Task /> },
    { path: '/taskdetail/:id', component: <TaskDetail /> },
    { path: '/report', component: <Statistics />, value: 'ViewReport' },
    { path: '/support', component: <Support /> },
    { path: '/complaint/:id', component: <Complaint /> },
    { path: '/premium', component: <Premium /> },
    { path: '/orders', component: <Orders />, value: 'ViewOrders' },
    {
      path: '/orderdetail/:id',
      component: <OrderDetail />,
      value: 'ViewOrders',
    },
    {
      path: '/leaveholidaymanagement',
      component: <HolidayAndLeaveManagement />,
    },
    { path: '/companyprofile', component: <CompanyProfile /> },
    {
      path: '/editcompanyprofile',
      component: <EditCompanyProfile />,
      value: 'EditCompanyProfile',
    },
    { path: '/settings', component: <Settings /> },
    { path: '/expenselist', component: <ExpenseList />, value: 'ViewExpense' },
    {
      path: '/integrations',
      component: <Integrations />,
      value: 'AccessIntegration',
    },
    { path: '/jobrolelist', component: <JobRolesList />, value: 'ViewRole' },
    {
      path: '/jobroleaccess/:id',
      component: <JobRoleAccess />,
      value: 'EditRole',
    },
    { path: '/productlist', component: <ProductList />, value: 'ViewProduct' },
    { path: '/addproduct', component: <AddProduct />, value: 'EditProduct' },
    {
      path: '/editproduct/:id',
      component: <AddProduct />,
      value: 'EditProduct',
    },
  ],
}
