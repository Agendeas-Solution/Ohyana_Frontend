import {
  Box,
  Button,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'

const IntegrationsDialog = ({
  hanldeCloseDialog,
  integrationDialog,
  setIntegrationDialog,
}) => {
  return (
    <>
      <Dialog open={integrationDialog} onClose={hanldeCloseDialog}>
        <Box className="dialogue_main_section">
          <Typography className="dialogue_heading">
            Indiamart Integration
          </Typography>

          <TextField
            className="dialogue_input_fields"
            label="CRM Key"
            placeholder="Add CRM Key here..."
            autoComplete="off"
            multiline
            minRows={3}
            maxRows={3}
          />
          <DialogActions>
            <Button className="dialogue_button_positive" variant="contained">
              Save
            </Button>
            <Button
              className="dialogue_button_nagative"
              variant="contained"
              onClick={() => {
                setIntegrationDialog(false)
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default IntegrationsDialog
