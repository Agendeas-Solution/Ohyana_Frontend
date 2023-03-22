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
const PJPScheduleTable = ({ pjpList }) => {
  const [pjpDetailDialog, setPJPDetailDialog] = useState({
    status: false,
    id: '',
  })
  const handleCloseDialog = () => {
    setPJPDetailDialog({ ...pjpDetailDialog, status: false })
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Sr No.</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Business Name</TableCell>
              <TableCell align="left">Contact Number</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pjpList.map((pjpData, index) => {
              return (
                <TableRow>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{pjpData?.date}</TableCell>
                  <TableCell align="left">{pjpData?.name}</TableCell>
                  <TableCell align="left">{pjpData?.business}</TableCell>
                  <TableCell align="left">{pjpData?.contact_number}</TableCell>
                  <TableCell align="left">{pjpData?.city}</TableCell>
                  <TableCell align="left">{pjpData?.status}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() =>
                        setPJPDetailDialog({
                          status: true,
                          id: pjpData.id,
                        })
                      }
                      className="common_button"
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
