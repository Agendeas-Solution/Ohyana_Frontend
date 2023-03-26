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
const StageDialog = props => {
  const [stageStatus, setStageStatus] = useState(
    props?.clientProfileDetail?.stage,
  )
  const { successSnackbar } = useContext(ContextSnackbar)?.state
  const { setSuccessSnackbar } = useContext(ContextSnackbar)
  const handleChangeStage = () => {
    EditClientStage(
      props?.clientProfileDetail?.id,
      { stage: stageStatus },
      res => {
        props.handleClose()
        setSuccessSnackbar({
          ...successSnackbar,
          status: true,
          message: res.data.message,
        })
      },
      err => {
        
      },
    )
  }
  return (
    <>
      <Dialog open={props.stageDialog} onClose={props.handleClose}>
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
                    defaultValue={props?.clientProfileDetail?.stage}
                    column
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="Initiate"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="No Response"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Irrelevant"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="Intermediate"
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label="Confirm"
                    />
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
          <Button variant="contained" onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default StageDialog
