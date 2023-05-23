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
import './index.css'
import CallIcon from '../../assets/img/call.svg'
import moment from 'moment'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CustomerTake } from '../../services/apiservices/clientDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'

const CustomerList = ({
  clientDetails,
  ViewClientDetail,
  getClientDetails,
}) => {
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleTakeCustomer = customerId => {
    CustomerTake(
      customerId,
      res => {
        if (res?.success) {
          getClientDetails()
          setSuccessSnackbar({
            ...successSnackbar,
            status: true,
            message: res.message,
          })
        }
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err.response.data.message,
        })
      },
    )
  }

  return (
    <>
      <TableContainer
        className="orders_table_height set_box_shadow"
        component={Paper}
      >
        {clientDetails.length > 0 ? (
          <Table
            className="customer_list_table"
            stickyHeader
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Contact No.</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientDetails.map((row, index) => (
                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell className="tablecell_height" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name ?? '-'}</TableCell>
                  <TableCell>{row.business ?? '-'}</TableCell>
                  <TableCell>{row.contact_number ?? '-'}</TableCell>
                  <TableCell>{row.state ?? '-'}</TableCell>
                  <TableCell>
                    {moment(row.createdAt).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell className="customers_list_page_buttons">
                    {row.teamId === null ? (
                      <Button
                        onClick={() => {
                          handleTakeCustomer(row.id)
                        }}
                        className="common_button buttons"
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
