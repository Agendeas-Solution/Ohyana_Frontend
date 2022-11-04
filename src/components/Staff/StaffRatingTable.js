import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Rating,
} from "@mui/material";
import "./index.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";  
const StaffRatingTable = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <TableContainer sx={{ height: "50vh" }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Sr No.</TableCell>
              <TableCell align="right">Feedback By</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Star Rating</TableCell>
              <TableCell align="right">Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.adminRatingList.map((row, index) => (
              <TableRow
                key={index + 1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row?.name}</TableCell>
                <TableCell align="right">{moment(row?.date).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  <Rating
                    name="half-rating-read"
                    value={row?.rating}
                    precision={0.5}
                    readOnly
                  />
                </TableCell>
                <TableCell align="right">{row?.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaffRatingTable;
