import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Pagination,
  Divider,
} from '@mui/material'
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
import AddAppreciationDialog from './AddAppreciationDialog'

const StaffPoint = ({
  selectMonth,
  setSelectMonth,
  addAppreciationDialogControl,
  setAddAppreciationDialogControl,
}) => {
  const [pointRule, setPointRule] = useState([])
  // const [selectMonth, setSelectMonth] = useState(moment().format('LL'))
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPoints, setTotalPoints] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pointsData, setPointsData] = useState([])
  // const [addAppreciationDialogControl, setAddAppreciationDialogControl] =
  //   useState(false)
  let path = window.location.pathname
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
        month: moment(selectMonth.$d).month() + 1,
        year: moment(selectMonth.$d).format('YYYY'),
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
    handleGetPointTeamMember()
  }, [selectMonth, currentPage])

  const handleAppreciation = () => {
    GiveAppreciation(
      parseInt(path),
      res => {
        handleGetPointTeamMember()
        handleAddAppreciationDialogClose()
      },
      err => {},
    )
  }
  const handleAddAppreciationDialogClose = () => {
    setAddAppreciationDialogControl(false)
  }
  return (
    <>
      <Box className="point_section">
        <Box className="point_left_section">
          <Box sx={{ margin: '15px 0px' }}>
            <Typography className="left_panel_heading" variant="span">
              Point Rules
            </Typography>
          </Box>
          <Box className="inner_point_left_section">
            {pointRule.length > 0 &&
              pointRule.map(data => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflowY: 'auto',
                    }}
                  >
                    <Box className="detail_row p-2 mt-1">
                      <Typography variant="span">
                        {data?.name || '-'}
                      </Typography>
                      <Typography variant="span">
                        {data?.points ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>

        <Box className="point_right_section">
          <Box className="point_data_heading">
            <Typography className="right_panel_heading" variant="span">
              Total Points :
            </Typography>
            <Typography className="right_panel_heading" variant="span">
              {totalPoints}
            </Typography>
          </Box>

          <TableContainer
            sx={{
              height: '54vh',
              border: '1px solid #e5e5e5',
              overflowY: 'auto',
              boxShadow: 'none',
              paddingBottom: '20px',
            }}
            component={Paper}
          >
            {pointsData.length > 0 ? (
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 500, padding: '0px !important' }}
                className="table_heading"
              >
                <TableHead className="profile_data_table_header">
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Point</TableCell>
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
                          <TableCell className="tablecell_height table_row_top_align">
                            {moment(data?.createdAt).format('D/MM/YY')}{' '}
                          </TableCell>
                          <TableCell className="table_row_top_align">
                            {data?.point?.name || '-'}
                          </TableCell>
                          <TableCell className="table_row_top_align">
                            {data?.point?.points}
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
          <Pagination
            className="set_pagination"
            boundaryCount={0}
            siblingCount={1}
            size="small"
            shape="rounded"
            count={totalPage}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value)
            }}
          />
          <AddAppreciationDialog
            handleAppreciation={handleAppreciation}
            addAppreciationDialogControl={addAppreciationDialogControl}
            handleAddAppreciationDialogClose={handleAddAppreciationDialogClose}
          />
        </Box>
      </Box>
    </>
  )
}

export default StaffPoint
