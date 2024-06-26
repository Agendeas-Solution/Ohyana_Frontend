import React from 'react'
import { TableCell, TableRow, Button } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'

const ClientProfileTable = props => {
  let navigate = useNavigate()
  const ViewClientDetail = () => {
    let domain = window.location.host
    let protocol = window.location.protocol
    window.location.replace(`${protocol}//${domain}/clientprofile`)
  }
  return (
    <>
      {props ? (
        <TableRow
          key={props.row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {props.index}
          </TableCell>
          <TableCell align="left">{props.row.team.name}</TableCell>
          <TableCell align="left">{props.row.team.role}</TableCell>
          <TableCell align="left">{props.row.date}</TableCell>
          <TableCell align="left">{props.row.time}</TableCell>
          <TableCell align="left">{props.row.description}</TableCell>
          <TableCell align="left">
            <Button
              className="border_button"
              onClick={() => {
                ViewClientDetail()
              }}
            >
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  )
}

export default ClientProfileTable
