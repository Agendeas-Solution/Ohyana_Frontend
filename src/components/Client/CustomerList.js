import React, { useContext } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Paper,
  TableHead,
  TableRow,
} from '@mui/material'
import CallIcon from '../../assets/img/call.svg'
import MailIcon from '../../assets/img/mail.svg'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CustomerTake } from '../../services/apiservices/clientDetail'
const CustomerList = ({ clientDetails, ViewClientDetail }) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleTakeCustomer = customerId => {
    CustomerTake(
      customerId,
      res => {
        if (res?.success) {
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.data.message,
          })
        }
      },
      err => {
        console.log('Printing Error', err)
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.error,
        })
      },
    )
  }
  return (
    <>
      <TableContainer sx={{ height: '70vh' }} component={Paper}>
        {clientDetails.length > 0 ? (
          <Table sx={{ minWidth: 650 }}>
            <TableHead stickyHeader>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Company Name</TableCell>
                <TableCell align="right">Contact No.</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientDetails.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.business}
                  </TableCell>
                  <TableCell align="right">{row.contact_number}</TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.state}
                  </TableCell>
                  <TableCell align="right">
                    {moment(row.createdAt.split(' ')[0]).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell align="right">
                    {row.teamId === null ? (
                      <Button
                        onClick={() => {
                          handleTakeCustomer(row.id)
                        }}
                        className="common_button"
                      >
                        Take
                      </Button>
                    ) : null}
                    <Button
                      className="client_view_button common_button"
                      onClick={() => {
                        ViewClientDetail(row.id)
                      }}
                    >
                      View
                    </Button>
                    {row.teamId ? (
                      <>
                        <a href={`tel:${row.contact_number}`}>
                          <Button className="common_button">
                            <img src={CallIcon} />
                          </Button>
                        </a>
                        <a href={`mailto:${row.email}`}>
                          {' '}
                          <Button className="common_button">
                            <img src={MailIcon} />
                          </Button>
                        </a>
                      </>
                    ) : null}
                    {/* {permissions?.deleteClient && <DeleteRoundedIcon className="delete_client_icon" onClick={() => {
                          setDeleteClientDialogControl({ ...deleteClientDialogControl, status: true, clientId: row.id })
                        }} />} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            No Data Found
          </p>
        )}
      </TableContainer>
    </>
  )
}

export default CustomerList
