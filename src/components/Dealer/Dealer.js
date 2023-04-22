import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import OutlinedInput from '@mui/material/OutlinedInput'
import FilterIcon from '../../assets/img/Filter.svg'
import {
  Box,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material'
import CallIcon from '../../assets/img/call.svg'
import {
  GetDealerList,
  AddDealerCall,
} from '../../services/apiservices/dealerDetail'
import AddDealerDialog from './AddDealerDialog'
const Dealer = () => {
  const [dealerList, setDealerList] = useState([])
  const [addDealer, setAddDealer] = useState({
    status: false,
    dealerId: '',
  })
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetDealerList(
      parseInt(path),
      res => {
        setDealerList(res.data)
      },
      err => {
        console.log('Printing OrderList Error', err)
      },
    )
  }, [])
  const AddDealerDetail = () => {
    AddDealerCall(
      { username: addDealer.dealerId },
      res => {},
      err => {
        console.log('Printing Error', err)
      },
    )
  }
  const handleCloseDialog = () => {
    setAddDealer({ ...addDealer, status: false })
  }
  return (
    <>
      <Box className="task_section">
        <Box className="d-flex flex-row justify-content-between align-items-center mx-2 px-2">
          <Typography variant="span">Overview</Typography>
          <Box>
            <FormControl variant="outlined">
              <OutlinedInput
                placeholder="Search Here..."
                startAdornment={
                  <InputAdornment position="start" sx={{ background: '#fff' }}>
                    <IconButton>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              onClick={() => setAddDealer({ ...addDealer, status: true })}
              sx={{ background: '#fff', color: '#2E3591' }}
              variant="contained"
            >
              + Dealer
            </Button>
            <IconButton edge="end">
              <img src={FilterIcon} alt="" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{ height: '73vh', margin: 2, padding: 1 }}
          className="task_cards_section"
          component={Paper}
        >
          <TableContainer sx={{ height: '70vh' }} component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead stickyHeader>
                <TableRow>
                  <TableCell align="right">Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Company Name</TableCell>
                  <TableCell align="right">Contact No.</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dealerList.map(dealerData => {
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell scope="row">{dealerData.id}</TableCell>
                      <TableCell align="right">{dealerData.name}</TableCell>
                      <TableCell align="right" sx={{ maxWidth: '150px' }}>
                        {dealerData.companyName}
                      </TableCell>
                      <TableCell align="right">
                        {dealerData.contact_number}
                      </TableCell>
                      <TableCell align="right" sx={{ maxWidth: '150px' }}>
                        {dealerData.state}
                      </TableCell>
                      <TableCell align="right">
                        <Button className="common_button">View</Button>
                        <Button className="common_button">
                          <img src={CallIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {addDealer.status && (
        <AddDealerDialog
          handleCloseDialog={handleCloseDialog}
          addDealer={addDealer}
          setAddDealer={setAddDealer}
          AddDealerDetail={AddDealerDetail}
        />
      )}
    </>
  )
}

export default Dealer
