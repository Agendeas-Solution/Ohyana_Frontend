import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, Pagination } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  GetPointRule,
  GetPointTeamMember,
  GiveAppreciation,
} from '../../services/apiservices/pointDetail'
import moment from 'moment'
import NoResultFound from '../ErrorComponent/NoResultFound'
const StaffPoint = () => {
  const [pointRule, setPointRule] = useState([])
  const [selectMonth, setSelectMonth] = useState({
    $M: moment().month(),
    $y: moment().year(),
  })
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPoints, setTotalPoints] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pointsData, setPointsData] = useState([])
  let path = window.location.pathname
  console.log('Printing Path of ', path)
  console.log('Printing ', path.split('/').pop())
  path = path.split('/').pop()
  useEffect(() => {
    GetPointRule(
      {},
      res => {
        setPointRule(res.data)
      },
      err => {
        console.log('Printing getPointRule error:', err)
      },
    )
  }, [])
  const handleGetPointTeamMember = () => {
    GetPointTeamMember(
      {
        month: selectMonth?.$M + 1,
        year: selectMonth?.$y,
        size: rowsPerPage,
        page: currentPage,
        teamId: parseInt(path),
      },
      res => {
        setTotalPoints(res.data.totalPoints)
        setPointsData(res.data.points)
        let pages =
          res?.data?.totalPage > 0
            ? Math.ceil(res?.data?.totalPage / rowsPerPage)
            : null
        setTotalPage(pages)
      },
      err => {
        setPointsData([])
        setTotalPoints([])

      },
    )
  }
  useEffect(() => {
    handleGetPointTeamMember();
  }, [selectMonth, currentPage])

  const handleAppreciation = () => {
    GiveAppreciation(
      parseInt(path),
      res => {
        handleGetPointTeamMember();
      },
      err => { },
    )
  }

  return (
    <>
      <Box className="point_section">
        <Box className="point_left_section">
          <Box className="inner_point_left_section p-2">
            <Typography className="left_panel_heading p-2" variant="span">
              Point Rules
            </Typography>
            {pointRule.length > 0 &&
              pointRule.map(data => {
                return (
                  <Box className="common_row p-2 mt-1">
                    <Typography variant="span">{data?.name}</Typography>
                    <Typography variant="span">{data?.points}</Typography>
                  </Box>
                )
              })}
          </Box>
        </Box>

        <Box className="point_right_section">
          <Box className="point_data_heading">
            <Typography className="right_panel_heading" variant="span">
              Total Points : {totalPoints}
            </Typography>
            <Box>
              <Button onClick={handleAppreciation} className="appreciation_btn">
                + Appreciation
              </Button>
            </Box>
            <Box className="points_date_filter ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['month', 'year']}
                  value={selectMonth}
                  onChange={newValue => {
                    setSelectMonth(newValue)
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
            {/* </Box> */}
          </Box>

          <TableContainer
            className="expenses_table_height mt-2"
            component={Paper}
            sx={{
              boxShadow: 'none',
              // border: '1px solid #e5e5e5',
              borderTop: 'none',
              overflowY: 'auto',
              overflowX: 'scroll',
            }}
          >
            {pointsData.length > 0 ?
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 650 }}
                className="table_heading"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pointsData.length > 0 &&
                    pointsData.map(data => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          sx={{
                            '&:last-child td,th': { border: 0 },
                          }}
                        >
                          <TableCell className="tablecell_height">
                            {moment(data?.createdAt).format('l')}{' '}
                          </TableCell>
                          <TableCell align="left">{data?.point?.name}</TableCell>
                          <TableCell align="left">
                            {data?.point?.points}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table> : <NoResultFound />
            }
          </TableContainer>
          {/* <Pagination
            className="mt-3"
            boundaryCount={0}
            siblingCount={1}
            size="small"
            shape="rounded"
            count={totalPage}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
            }}
          /> */}
        </Box>
      </Box>
    </>
  )
}

export default StaffPoint
