import React, { useState } from 'react'
import { Button, Pagination } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import PJPDetailDialog from './PJPDetailDialog'
import NoResultFound from '../ErrorComponent/NoResultFound'
import './index.css'
import { Box } from '@mui/system'

const PJPScheduleTable = ({
  pjpList,
  completedDialog,
  setCompletedDialog,
  numbersToDisplayOnPagination,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  addPJPDetail,
  setAddPJPDetail,
}) => {
  const [pjpDetailDialog, setPJPDetailDialog] = useState({
    status: false,
    id: '',
  })
  const handleCloseDialog = () => {
    setPJPDetailDialog({ ...pjpDetailDialog, status: false })
  }
  return (
    <>
      {pjpList?.pjps && pjpList?.pjps.length > 0 ? (
        <TableContainer
          className="pjp_table_height pjp_all_detail"
          component={Paper}
        >
          <Table stickyHeader className="table_heading">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pjpList?.pjps.map((pjpData, index) => {
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
                      {index + 1}
                    </TableCell>
                    <TableCell>{pjpData?.date || '-'}</TableCell>
                    <TableCell>{pjpData?.client?.name || '-'}</TableCell>
                    <TableCell>{pjpData?.client?.business || '-'}</TableCell>
                    <TableCell>
                      {pjpData?.client?.contact_number || '-'}
                    </TableCell>
                    <TableCell>{pjpData?.client?.city || '-'}</TableCell>
                    <TableCell>{pjpData?.status || '-'}</TableCell>
                    <TableCell>
                      {!pjpData?.is_completed ? (
                        <Button
                          onClick={() =>
                            setCompletedDialog({
                              ...completedDialog,
                              status: true,
                              pjpId: pjpData?.id,
                            })
                          }
                          className="pjp_table_btn"
                        >
                          Completed
                        </Button>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          setPJPDetailDialog({
                            status: true,
                            id: pjpData.id,
                          })
                        }
                        // className="common_button"
                        className="pjp_table_btn"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
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
        </TableContainer>
      ) : (
        <Box sx={{ height: '60vh' }}>
          <NoResultFound />
        </Box>
      )}
      {pjpDetailDialog.status && (
        <PJPDetailDialog
          addPJPDetail={addPJPDetail}
          setAddPJPDetail={setAddPJPDetail}
          pjpDetailDialog={pjpDetailDialog}
          handleCloseDialog={handleCloseDialog}
          setPJPDetailDialog={setPJPDetailDialog}
        />
      )}
    </>
  )
}

export default PJPScheduleTable
