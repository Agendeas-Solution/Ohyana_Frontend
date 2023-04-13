import React from 'react'
import {
  Dialog,
  Button,
  TextareaAutosize,
  FormControlLabel,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  DialogActions,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box } from '@mui/system'

const PoorContact = ({ addPoorContact, handleCallClose }) => {
  return (
    <>
      <Dialog
        open={addPoorContact.status}
        onClose={handleCallClose}>

        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Poor Contact</Typography>
          <FormControl
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
            }} >
            <RadioGroup defaultValue="not received"
              sx={{
                padding: '0px'
              }} row>
              <FormControlLabel
                value="not received"
                control={<Radio />}
                label="Call not received"
              />
              <FormControlLabel
                value="other reason"
                control={<Radio />}
                label="Left Inquiry"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            className="dialogue_input_fields"
            multiline
            label="Description"
            autoComplete="off"
            minRows={3}
            placeholder="reason of late inquiry"
          // value={closeStatusDialogControl.description}
          // onChange={e =>
          //   setCloseStatusDialogControl({
          //     ...closeStatusDialogControl,
          //     description: e.target.value,
          //   })
          // }
          />
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={() => console.log('Save button clicked!!!')}
            >
              Save
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCallClose}>
              Cancel
            </Button>
          </DialogActions>

        </Box>
      </Dialog>
    </>
  )
}

export default PoorContact
