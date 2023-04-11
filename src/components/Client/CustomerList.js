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
import NoResultFound from '../ErrorComponent/NoResultFound'

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
      <TableContainer
        className="orders_table_height"
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          overflowY: 'auto',
        }}
      >
        {clientDetails.length > 0 ? (
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 690, marginLeft: '-10px' }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Company Name</TableCell>
                <TableCell align="right">Contact No.</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientDetails.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  sx={{
                    '&:last-child td,th': { border: 0 },
                  }}
                >
                  <TableCell
                    className="tablecell_height"
                    scope="row"
                    sx={{ maxWidth: '150px' }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.name ?? '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.business ?? '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.contact_number ?? '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {row.state?.name ?? '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
                    {moment(row.createdAt).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell align="right" sx={{ maxWidth: '150px' }}>
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
                      </>
                    ) : null}
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

export default CustomerList
