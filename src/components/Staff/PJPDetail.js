import React, { useState, useEffect, useContext } from 'react'
import { Box, Button } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Filter from '../../assets/img/Filter.svg'
import PJPScheduleTable from './PJPScheduleTable'
import { GetPJPList, CreatePJP, CompletePJPStatus } from '../../services/apiservices/teamcall'
import AddPJPDialog from './AddPJPDialog'
import { Context as ContextSnackbar } from '../../context/pageContext'
import CompletedPJPDialog from './CompletedPJPDialog'

const PJPDetail = () => {
  let path = window.location.pathname
  path = path.split('/').pop()
  const [value, setValue] = useState('TODAY')
  const [pjpList, setPjpList] = useState([])
  const [addPJPDetail, setAddPJPDetail] = useState({
    dialogStatus: false,
    date: '',
    clientId: '',
    description: '',
  })
  const [completedDialog, setCompletedDialog] = useState({
    status: false,
    description: '',
    pjpId: ""
  });
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDialog = () => {
    setAddPJPDetail({ ...addPJPDetail, dialogStatus: false })
  }
  const handleCloseCompletedDialog = () => {
    setCompletedDialog({ ...completedDialog, status: true })
  }
  const handleAddCompletePJPStatus = () => {
    let data = completedDialog
    delete data.status;
    CompletePJPStatus(
      data,
      res => {
        if (res.success) {
          setSuccessSnackbar({ ...successSnackbar, message: res.message, status: true });
        }
      },
      err => {
        console.log('Printing ', err)
      },
    )
  }
  // const getLocation = () => {
  //   if (!window.navigator.geolocation) {
  //   } else {
  //     window.navigator.geolocation.getCurrentPosition(
  //       position => {
  //         setAddPJPDetail({
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
    debugger;
    CreatePJP(
      pjpDetail,
      res => {
        handleCloseDialog();
        setSuccessSnackbar({ ...successSnackbar, message: res?.message });
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
                  setAddPJPDetail({ ...addPJPDetail, dialogStatus: true })
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
            <PJPScheduleTable pjpList={pjpList} completedDialog={completedDialog} setCompletedDialog={setCompletedDialog} />
          </TabPanel>
        </TabContext>
      </Box>
      <AddPJPDialog
        addPJPDetail={addPJPDetail}
        setAddPJPDetail={setAddPJPDetail}
        handleCloseDialog={handleCloseDialog}
        handleAddPJPDetail={handleAddPJPDetail}
      />
      <CompletedPJPDialog
        completedDialog={completedDialog}
        handleCloseCompletedDialog={handleCloseCompletedDialog}
        setCompletedDialog={setCompletedDialog}
        handleAddCompletePJPStatus={handleAddCompletePJPStatus}
      />
    </>
  )
}

export default PJPDetail
