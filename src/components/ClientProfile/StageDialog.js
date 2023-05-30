import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material'
import { EditClientStage } from '../../services/apiservices/clientDetail'
import { Context as ContextSnackbar } from '../../context/pageContext'
import { CLIENT } from '../../constants'
const StageDialog = ({ clientProfileDetail, handleClose, stageDialog }) => {
  const [stageStatus, setStageStatus] = useState(clientProfileDetail?.stage)
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
  const handleChangeStage = () => {
    EditClientStage(
      clientProfileDetail?.id,
      { stage: stageStatus },
      res => {
        handleClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.message,
        })
      },
      err => {
        setErrorSnackbar({
          ...errorSnackbar,
          status: true,
          message: err?.response?.data?.message,
        })
      },
    )
  }
  return (
    <>
      <Dialog
        PaperProps={{ sx: { width: '30%' } }}
        open={stageDialog}
        onClose={handleClose}
      >
        <Box className="px-3 pt-3 m-auto">
          <h3>Set Position</h3>
        </Box>
        <DialogContent>
          <Box>
            <Box className="row">
              <Box className="col-md-12">
                <FormControl className="mx-2">
                  <RadioGroup
                    className="radio_button"
                    onChange={e => {
                      setStageStatus(parseInt(e.target.value))
                    }}
                    defaultValue={clientProfileDetail?.stage}
                    column
                  >
                    {CLIENT.STAGE.map(stage => {
                      return (
                        <FormControlLabel
                          value={stage.id}
                          control={<Radio />}
                          label={stage.stage}
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            className="dialogue_bottom_button"
            variant="contained"
            onClick={handleChangeStage}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StageDialog
