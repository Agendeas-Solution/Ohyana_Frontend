import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Filter from '../../assets/img/Filter.svg'
import PJPScheduleTable from './PJPScheduleTable'
import { GetPJPList, CreatePJP } from '../../services/apiservices/teamcall'
import AddPJPDialog from './AddPJPDialog'

const PJPDetail = () => {
  let path = window.location.pathname
  console.log('Printing Path of ', path)
  console.log('Printing ', path.split('/').pop())
  path = path.split('/').pop()
  const [value, setValue] = useState('TODAY')
  const [pjpList, setPjpList] = useState([])
  const [addPJPDetail, setAddPJPdetail] = useState({
    dialogStatus: false,
    date: '',
    clientId: 0,
    description: '',
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDialog = () => {
    setAddPJPdetail({ ...addPJPDetail, dialogStatus: false })
  }
  // const getLocation = () => {
  //   if (!window.navigator.geolocation) {
  //   } else {
  //     window.navigator.geolocation.getCurrentPosition(
  //       position => {
  //         setAddPJPdetail({
  //           ...addPJPDetail,
  //           latitude: position.coords.latitude.toString(),
  //           longitude: position.coords.longitude.toString(),
  //         })
  //       },
  //       () => {},
  //     )
  //   }
  // }
  useEffect(() => {
    GetPJPList(
      {
        teamId: path,
        day: value,
      },
      res => {
        if (res.success) {
          setPjpList(res?.data?.pjps)
          debugger;
        }
      },
      err => {
        console.log('Printing ', err)
        setPjpList([])
      },
    )
  }, [value])
  const handleAddPJPDetail = () => {
    let pjpDetail = addPJPDetail
    delete pjpDetail.dialogStatus
    CreatePJP(
      pjpDetail,
      res => {
        debugger;

      },
      err => { },
    )
  }

  return (
    <>
      <Box className="pjp_detail_main_box">
        <TabContext value={value}>
          <Box className="tab_row client_pjp_tab">
            <TabList onChange={handleChange}>
              <Tab label="Today" value="TODAY" />
              <Tab label="All" value="ALL" />
            </TabList>

            <Box className="button_and_filter">
              <Button
                onClick={() =>
                  setAddPJPdetail({ ...addPJPDetail, dialogStatus: true })
                }
                className="tab_btn p-2"
              >
                + Create
              </Button>
              <img
                className="filter_btn"
                style={{ marginLeft: '12px' }}
                src={Filter}
                alt="Filter"
              />
            </Box>
          </Box>

          <TabPanel sx={{ padding: '0px' }} value="TODAY">
            <PJPScheduleTable pjpList={pjpList} />
          </TabPanel>
          {/* <TabPanel value="TOMORROW">
            <PJPScheduleTable pjpList={pjpList} />
          </TabPanel> */}
          <TabPanel
            sx={{ padding: '0px' }}
            className="staff_profile_pjp"
            value="ALL"
          >
            <PJPScheduleTable pjpList={pjpList} />
          </TabPanel>
        </TabContext>
      </Box>
      <AddPJPDialog
        addPJPDetail={addPJPDetail}
        setAddPJPdetail={setAddPJPdetail}
        handleCloseDialog={handleCloseDialog}
        handleAddPJPDetail={handleAddPJPDetail}
      />
    </>
  )
}

export default PJPDetail
