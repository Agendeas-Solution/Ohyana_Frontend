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
let path = window.location.pathname
console.log('Printing Path of ', path)
console.log('Printing ', path.split('/').pop())
path = path.split('/').pop()

const StaffTarget = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  })
  // const [selectMonth, setSelectMonth] = useState({
  //   $M: moment().month(),
  //   $y: moment().year(),
  //   defaultDate: moment().format('LL'),
  // })
  const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  console.log(`All: ${selectMonth}`)
  console.log(`Month index: ${selectMonth.indexOf(moment().format('MMMM'))}`)
  console.log(`Year index: ${selectMonth.indexOf(moment().format('YYYY'))}`)
  console.log(`Month: ${moment().format('MMMM')}`)
  const [targetDetail, setTargetDetail] = useState({
    status: false,
    id: path,
  })
  const [targetList, setTargetList] = useState([])

  useEffect(() => {
    GetTargetList(
      {
        month: selectMonth?.$M + 1,
        year: selectMonth?.$y,
        teamId: parseInt(path),
      },
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
  }, [selectMonth])
  const handleCloseTargetDetailDialog = () => {
    setTargetDetail({ ...targetDetail, status: false })
  }
  return (
    <>
      <Box className="target_section">
        <Box className="attendance_data_row col-md-12">
          <Box className="col-md-7 inner_attendance_data_row">
            <Box className="week_data days_data col-md-3 me-3">
              <Typography variant="span">This Week</Typography>
              <Typography variant="span">15-07-2022</Typography>
            </Box>
            <Box className="target_order_data days_data col-md-3 me-3">
              <Typography variant="span">Target order</Typography>
              <Typography variant="span">400</Typography>
            </Box>
            <Box className="target_achieved_data days_data col-md-3 me-3">
              <Typography variant="span">Achieved</Typography>
              <Typography variant="span">24</Typography>
            </Box>
            <Box className="Late_days_data days_data col-md-3">
              <Typography variant="span">Days Remain</Typography>
              <Typography variant="span">24</Typography>
            </Box>
          </Box>

          <Box className="range_days_data">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['month', 'year']}
                value={selectMonth}
                onChange={selectMonth => {
                  setSelectMonth(selectMonth)
                }}
                renderInput={params => (
                  <TextField
                    placeholder="Year and Month"
                    {...params}
                    helperText={null}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>

          <Button
            onClick={() => setTargetDetail({ ...targetDetail, status: true })}
            className="common_button"
          >
            Set Target
          </Button>
        </Box>

        <TableContainer
          className="expenses_table_height mt-2"
          component={Paper}
          sx={{
            boxShadow: 'none',
            border: '1px solid #e5e5e5',
            borderTop: 'none',
            overflowY: 'auto',
          }}
        >
          {targetList.length > 0 ? (
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 690, marginLeft: '-10px' }}
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
                        {targetData?.period} days
                      </TableCell>
                      <TableCell align="left">
                        {targetData?.type === 0
                          ? 'Generate Lead'
                          : 'Take Order'}
                      </TableCell>
                      <TableCell align="left">{targetData?.target}</TableCell>
                      <TableCell align="left">{targetData?.achieve}</TableCell>
                      <TableCell align="left">{targetData?.target}</TableCell>
                      <TableCell align="left">{targetData?.state}</TableCell>
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
            handleCloseTargetDetailDialog={handleCloseTargetDetailDialog}
          />
        )}
      </Box>
    </>
  )
}

export default StaffTarget
