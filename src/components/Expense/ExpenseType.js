import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  TextareaAutosize,
} from '@mui/material'
// import './index.css'
const ExpenseType = ({
  addExpenseType,
  handleEditExpenses,
  setAddExpenseType,
  handleAddExpenses,
  handleCloseDialog,
}) => {
  return (
    <>
      <Dialog open={addExpenseType.status} onClose={handleCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Expense Type</Typography>

          <TextField
            className="dialogue_input_fields"
            label="Expense Type"
            variant="outlined"
            value={addExpenseType.name}
            onChange={e => {
              setAddExpenseType({
                ...addExpenseType,
                name: e.target.value,
              })
            }}
          />

          <TextField
            className="dialogue_input_fields"
            multiline
            type="number"
            placeholder="Description Here..."
            variant="outlined"
            autoComplete="off"
            label="Description"
            minRows={3}
            maxRows={3}
            value={addExpenseType.description}
            onChange={e => {
              setAddExpenseType({
                ...addExpenseType,
                description: e.target.value,
              })
            }}
          />

          <DialogActions>
            <Button
              className="dialogue_bottom_button"
              variant="contained"
              onClick={
                addExpenseType?.expenseId
                  ? handleEditExpenses
                  : handleAddExpenses
              }
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default ExpenseType
