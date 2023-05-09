// import React, { useEffect, useState, useContext } from 'react'
// import ProfileImg from '../../assets/img/profile_logo.png'
// import { Box, Tab, Button } from '@mui/material'
// import TabList from '@mui/lab/TabList'
// import { useNavigate } from 'react-router-dom'
// import { Context as AuthContext } from '../../context/authContext/authContext'
// import TabPanel from '@mui/lab/TabPanel'
// import TabContext from '@mui/lab/TabContext'
// import PresentData from './PresentData'
// import LeaveData from './LeaveData'
// import HolidayData from './HolidayData'
// import './index.css'

// const AttendanceData = () => {
//   const navigate = useNavigate()
//   const [value, setValue] = useState('Profile')
//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }
//   const [dateRange, setDateRange] = useState({
//     startDate: '',
//     endDate: '',
//   })
//   const [attendanceTab, setAttendanceTab] = useState('1')

//   const handleTabChange = (event, newValue) => {
//     setAttendanceTab(newValue)
//   }
//   return (
//     <>
//       <TabContext value={attendanceTab}>
//         <Box className="tab_row">
//           <TabList
//             className="client_attendance_tab mb-2"
//             onChange={handleTabChange}
//           >
//             <Tab label="Present" value="1" />
//             <Tab label="Leave" value="2" />
//             <Tab label="Holiday" value="3" />
//           </TabList>

//           {attendanceTab === '2' && (
//             <Box>
//               <Button className="attendance_button m-2" variant="contained">
//                 Apply For Leave
//               </Button>
//             </Box>
//           )}
//         </Box>
//         <TabPanel sx={{ padding: '0' }} value="1">
//           <PresentData />
//         </TabPanel>
//         <TabPanel value="2">
//           <LeaveData />
//         </TabPanel>
//         {/* <TabPanel value="3">
//           <HolidayData />
//         </TabPanel> */}
//       </TabContext>
//     </>
//   )
// }

// export default AttendanceData
