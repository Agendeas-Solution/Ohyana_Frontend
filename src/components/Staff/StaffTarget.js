import React, { useState, useEffect, useContext } from 'react'
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
import { Pagination } from '@mui/material'
const StaffTarget = ({ selectMonth, targetDetail, setTargetDetail }) => {
  let path = window.location.pathname
  path = path.split('/').pop()
  const [targetList, setTargetList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalResult, setTotalresult] = useState()
  const [numbersToDisplayOnPagination, setNumbersToDisplayOnPagination] =
    useState(0)
  const handleGetTargetList = () => {
    let data = {
      month: moment(selectMonth.$d).month() + 1,
      year: moment(selectMonth.$d).format('YYYY'),
      teamId: parseInt(path),
      page: currentPage,
      size: rowsPerPage,
    }
    GetTargetList(
      data,
      res => {
        if (res.success) {
          setTargetList(res?.data?.targets)
          setTotalresult(res?.data?.totalPage)
          let pages =
            res?.data?.totalPage > 0
              ? Math.ceil(res?.data?.totalPage / rowsPerPage)
              : null
          setNumbersToDisplayOnPagination(pages)
        }
      },
      err => {
        setTargetList([])
      },
    )
  }

  useEffect(() => {
    handleGetTargetList()
  }, [selectMonth, currentPage])

  const handleCloseTargetDetailDialog = () => {
    setTargetDetail({ ...targetDetail, status: false })
  }
  return (
    <>
      <TableContainer className="profile_data_table" component={Paper}>
        {targetList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 700, padding: '0px !important' }}
            className="table_heading"
          >
            <TableHead className="profile_data_table_header">
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Given</TableCell>
                <TableCell>Achieve</TableCell>
                <TableCell>Extra/Left</TableCell>
                <TableCell>Target</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {targetList.map((targetData, index) => {
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      '&:last-child td,th': { border: 0 },
                    }}
                  >
                    <TableCell
                      scope="row"
                      className="tablecell_height table_row_top_align"
                    >
                      {moment(targetData?.startDate).format('D-M') +
                        ' to ' +
                        moment(targetData?.endDate).format('D-M-YY')}{' '}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {targetData?.type === 0 ? 'Generate Lead' : 'Take Order'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {targetData?.target || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {targetData?.achieve || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
                      {targetData?.target || '-'}
                    </TableCell>
                    <TableCell className="table_row_top_align">
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
      <Pagination
        className="pagination_style"
        boundaryCount={0}
        siblingCount={0}
        size="small"
        shape="rounded"
        count={numbersToDisplayOnPagination}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value)
        }}
      />
      {targetDetail.status && (
        <SetTargetDialog
          targetDetail={targetDetail}
          handleGetTargetList={handleGetTargetList}
          handleCloseTargetDetailDialog={handleCloseTargetDetailDialog}
        />
      )}
    </>
  )
}

export default StaffTarget
