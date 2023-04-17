import React, { useState } from 'react'
import { Button } from '@mui/material'
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

const PJPScheduleTable = ({ pjpList, completedDialog, setCompletedDialog }) => {
  const [pjpDetailDialog, setPJPDetailDialog] = useState({
    status: false,
    id: '',
  })
  const handleCloseDialog = () => {
    setPJPDetailDialog({ ...pjpDetailDialog, status: false })
  }
  return (
    <>
      {pjpList.length > 0 ? (
        <TableContainer
          className="pjp_table_height"
          // component={Paper}
          sx={{
            boxShadow: 'none',
            borderTop: 'none',
            overflowY: 'auto',
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            className="table_heading"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Sr Noss.</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Customer Name</TableCell>
                <TableCell align="left">Business Name</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pjpList.map((pjpData, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    sx={{
                      '&:last-child td,th': { border: 0 },
                    }}
                  >
                    <TableCell className="tablecell_height" align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{pjpData?.date}</TableCell>
                    <TableCell align="left">{pjpData?.client?.name}</TableCell>
                    <TableCell align="left">
                      {pjpData?.client?.business}
                    </TableCell>
                    <TableCell align="left">
                      {pjpData?.client?.contact_number}
                    </TableCell>
                    <TableCell align="left">{pjpData?.client?.city}</TableCell>
                    <TableCell align="left">{pjpData?.status}</TableCell>
                    <TableCell align="left">
                      {!pjpData?.is_completed && (
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
                      )}
                    </TableCell>
                    <TableCell align="left">
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
        </TableContainer>
      ) : (
        <Box sx={{ height: '60vh' }}>
          <NoResultFound />
        </Box>
      )}
      {pjpDetailDialog.status && (
        <PJPDetailDialog
          pjpDetailDialog={pjpDetailDialog}
          handleCloseDialog={handleCloseDialog}
          setPJPDetailDialog={setPJPDetailDialog}
        />
      )}
    </>
  )
}

export default PJPScheduleTable
