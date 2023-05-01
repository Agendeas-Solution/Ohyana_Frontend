import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { GetTargetList } from '../../services/apiservices/teamcall'
import SetTargetDialog from './SetTargetDialog'
import NoResultFound from '../ErrorComponent/NoResultFound'

const StaffTarget = () => {
  let path = window.location.pathname
  path = path.split('/').pop()
  const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  const [targetDetail, setTargetDetail] = useState({
    status: false,
    id: path,
  })
  const [targetList, setTargetList] = useState([])
  const handleGetTargetList = () => {
    let data = {
      month: moment(selectMonth.$d).month() + 1,
      year: moment(selectMonth.$d).format('YYYY'),
      teamId: parseInt(path),
    }
    GetTargetList(
      data,
      res => {
        if (res.success) {
          setTargetList(res?.data)
        }
      },
      err => {
        console.log('Printing ', err)
        setTargetList([])
      },
    )
  }
  useEffect(() => {
    handleGetTargetList()
  }, [selectMonth])
  const handleCloseTargetDetailDialog = () => {
    setTargetDetail({ ...targetDetail, status: false })
  }
  return (
    <>
      <Box className="target_section">
        <Box className="statistics_data_section">
          {/* <Box className="statistics_data">
            <Box className="statistics_box first_box">
              <Typography variant="span">This Week</Typography>
              <Typography variant="span">15-07-2022</Typography>
            </Box>
            <Box className="statistics_box second_box">
              <Typography variant="span">Target order</Typography>
              <Typography variant="span">400</Typography>
            </Box>
            <Box className="statistics_box third_box">
              <Typography variant="span">Achieved</Typography>
              <Typography variant="span">24</Typography>
            </Box>
            <Box className="statistics_box fourth_box">
              <Typography variant="span">Days Remain</Typography>
              <Typography variant="span">24</Typography>
            </Box>
          </Box> */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="staff_date"
                views={['month', 'year']}
                value={selectMonth}
                onChange={selectMonth => {
                  setSelectMonth(selectMonth)
                }}
                renderInput={params => (
                  <TextField
                    sx={{
                      width: '175px',
                      marginRight: '10px',
                    }}
                    {...params}
                    helperText={null}
                  />
                )}
                PopperProps={{
                  placement: 'bottom-start', // Set placement to 'bottom-start'
                }}
              />
            </LocalizationProvider>
            <Button
              className="staff_common_button"
              onClick={() => setTargetDetail({ ...targetDetail, status: true })}
            >
              + Set Target
            </Button>
          </Box>
        </Box>
        <TableContainer
          className="expenses_table_height staff_target_table"
          component={Paper}
        >
          {targetList.length > 0 ? (
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 690 }}
              className="table_heading"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Period</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Given</TableCell>
                  <TableCell align="left">Achieve</TableCell>
                  <TableCell align="left">Extra/Left</TableCell>
                  <TableCell align="left">Target</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {targetList.map(targetData => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      // key={attendanceList.id}
                      sx={{
                        '&:last-child td,th': { border: 0 },
                      }}
                    >
                      <TableCell className="tablecell_height">
                        {moment(targetData?.startDate).format('D-M') +
                          ' to ' +
                          moment(targetData?.endDate).format('D-M-YY')}{' '}
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.period ?? '-'} days
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.type === 0
                          ? 'Generate Lead'
                          : 'Take Order'}
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.target || '-'}
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.achieve || '-'}
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.target || '-'}
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.state || '-'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <NoResultFound />
          )}
        </TableContainer>
        {targetDetail.status && (
          <SetTargetDialog
            targetDetail={targetDetail}
            handleGetTargetList={handleGetTargetList}
            handleCloseTargetDetailDialog={handleCloseTargetDetailDialog}
          />
        )}
      </Box>
    </>
  )
}

export default StaffTarget
