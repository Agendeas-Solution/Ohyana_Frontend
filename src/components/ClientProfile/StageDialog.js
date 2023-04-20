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
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleChangeStage = () => {
    EditClientStage(
      clientProfileDetail?.id,
      { stage: stageStatus },
      res => {
        handleClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {},
    )
  }
  return (
    <>
      <Dialog open={stageDialog} onClose={handleClose}>
        <div className="px-3 pt-3 m-auto">
          <h3>Set Position</h3>
        </div>
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-12">
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
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions className="mt-2">
          <Button variant="contained" onClick={handleChangeStage}>
            Ok
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StageDialog
