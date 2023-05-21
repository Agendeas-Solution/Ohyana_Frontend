import React, { useEffect, useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Paper,
  TableHead,
  TableRow,
} from '@mui/material'
import LikeIcon from '../../assets/img/like.svg'
import DisLikeIcon from '../../assets/img/dislike.svg'
import { useNavigate } from 'react-router-dom'
import { GetComplaintList } from '../../services/apiservices/support'
import moment from 'moment'
const Support = () => {
  const [complaintList, setComplainList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    GetComplaintList(
      {},
      res => {
        setComplainList(res.data)
      },
      err => {},
    )
  }, [])
  return (
    <>
      <Box className="main_section">
        <TableContainer sx={{ height: '70vh' }} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead stickyHeader>
              <TableRow>
                <TableCell align="right">Ticket No.</TableCell>
                <TableCell align="right">Dealer Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">About</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Feedback</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaintList.map(complaint => {
                return (
                  <TableRow>
                    <TableCell align="right">{complaint?.id}</TableCell>
                    <TableCell align="right">
                      {complaint?.dealer?.name}
                    </TableCell>
                    <TableCell align="right">
                      {moment(complaint?.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="right">
                      {complaint.complaintType}
                    </TableCell>
                    <TableCell align="right">{complaint.status}</TableCell>
                    <TableCell align="right">
                      {complaint.complaint_feedback.feedbackType === 'LIKED' ? (
                        <img src={LikeIcon} alt="" />
                      ) : (
                        <img src={DisLikeIcon} alt="" />
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button
                        className="common_button"
                        onClick={() => {
                          navigate(`/complaint/${complaint?.id}`)
                        }}
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
      </Box>
    </>
  )
}

export default Support
