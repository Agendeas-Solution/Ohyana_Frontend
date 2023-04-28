import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import NoResultFound from '../ErrorComponent/NoResultFound'
import moment from 'moment'
const StatusTable = ({
  clientStatusList,
  clientProfileDetail,
  handleViewClientStatus,
  handleEditClientStatus,
}) => {
  return (
    <>
      <TableContainer
        className="client_table_height client_detail_table set_box_shadow"
        component={Paper}
      >
        {clientStatusList.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, padding: '0px !important' }}
            className="table_heading"
          >
            {/* <TableHead className="client_profile_table_header"> */}
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Status Added By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientStatusList.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{
                    '&:last-child td,th': { border: 0 },
                  }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell>{row?.team?.name}</TableCell>
                  <TableCell>{moment(row?.date).format('LL')}</TableCell>
                  <TableCell>
                    {moment(row.time, 'hh:mm:ss').format('LT')}
                  </TableCell>
                  <TableCell className="status_description">
                    {row?.description}
                  </TableCell>
                  <TableCell className="client_status_buttons">
                    <Button
                      sx={{ marginRight: '10px' }}
                      onClick={() => {
                        handleViewClientStatus(row, clientProfileDetail.id)
                      }}
                      className="border_button"
                      // className="button_color"
                    >
                      View
                    </Button>
                    <Button
                      className="border_button"
                      // className="button_color"
                      onClick={() => {
                        handleEditClientStatus(row, clientProfileDetail.id)
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoResultFound />
        )}
      </TableContainer>
    </>
  )
}

export default StatusTable