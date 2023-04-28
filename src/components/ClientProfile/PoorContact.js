import React from 'react'
import {
  Dialog,
  Button,
  FormControlLabel,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  DialogActions,
} from '@mui/material'
import { Box } from '@mui/system'
const PoorContact = ({
  addPoorContact,
  handleCallClose,
  setAddPoorContact,
  handleAddPoorContact,
}) => {
  return (
    <>
      <Dialog open={addPoorContact.status} onClose={handleCallClose}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">Poor Contact</Typography>
          <FormControl
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
            }}
          >
            <RadioGroup
              value={addPoorContact.flag}
              onChange={e => {
                setAddPoorContact({
                  ...addPoorContact,
                  flag: e.target.value,
                })
              }}
              sx={{
                padding: '0px',
              }}
              row
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Call not received"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Left Inquiry"
              />
            </RadioGroup>
          </FormControl>
          {addPoorContact.flag !== 'true' ? (
            <TextField
              className="dialogue_input_fields"
              multiline
              label="Description"
              autoComplete="off"
              minRows={3}
              maxRows={3}
              placeholder="reason of late inquiry"
              value={addPoorContact.description}
              onChange={e =>
                setAddPoorContact({
                  ...addPoorContact,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <TextField
              disabled
              className="dialogue_input_fields"
              multiline
              label="Description"
              autoComplete="off"
              minRows={3}
              maxRows={3}
              placeholder="reason of late inquiry"
              value={addPoorContact.description}
              onChange={e =>
                setAddPoorContact({
                  ...addPoorContact,
                  description: e.target.value,
                })
              }
            />
          )}
          <DialogActions>
            <Button
              className="dialogue_button_positive"
              variant="contained"
              onClick={handleAddPoorContact}
            >
              Save
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={handleCallClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default PoorContact
