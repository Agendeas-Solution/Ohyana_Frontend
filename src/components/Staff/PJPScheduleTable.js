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
     {pjpList.length>0?
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="pjp_all_table_header">
            <TableRow>
              <TableCell align="left">Sr Noss.</TableCell>
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
      </TableContainer>:
      <NoResultFound/>
      }
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
