import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import "./index.css";
const ExpenseType = ({
  addExpenseType,
  //   setAddLeaveDialog,
  //   AddLeave,
  handleCloseDialog,
  //   UpdateLeave,
}) => {
  return (
    <>
      <Dialog open={addExpenseType.status} onClose={handleCloseDialog}>
        <div className="px-3 pt-3 text-center">
          <h3>Expense Type</h3>
        </div>
        <DialogContent>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Expense Type</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  value={addExpenseType.type}
                  //   onChange={(e) => {
                  //     setAddLeaveDialog({
                  //       ...addExpenseType,
                  //       type: e.target.value,
                  //     });
                  //   }}
                  className="w-100"
                  placeholder="Expense Type"
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
          <Box className="py-3">
            <div className="row">
              <div className="col-md-6">
                <Typography variant="span">Description</Typography>
              </div>
              <div className="col-md-12">
                <TextField
                  type="number"
                  value={addExpenseType.duration}
                  //   onChange={(e) => {
                  //     setAddLeaveDialog({
                  //       ...addExpenseType,
                  //       duration: e.target.value,
                  //     });
                  //   }}
                  className="w-100"
                  placeholder="Description Here..."
                  variant="outlined"
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ marginLeft: "13px", marginRight: "13px" }}
          className="mt-1 d-flex justify-content-between"
        >
          <Button
            variant="contained"
            className="ok-btn"
            sx={{}}
            // onClick={addExpenseType?.id ? UpdateLeave : AddLeave}
          >
            Save
          </Button>
          {/* <Button onClick={handleCloseDialog} className="cancel-btn" autoFocus>
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseType;
