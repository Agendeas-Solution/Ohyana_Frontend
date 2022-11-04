import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup, FormControlLabel, Checkbox,
  Typography, TextareaAutosize
} from "@mui/material";
import { AddClientStatus } from "../../services/apiservices/adminprofile";
import { Context as ContextSnackbar } from "../../context/pageContext";
var a;
const StatusDialog = (props) => {
  const [addStatusDetail, setAddStatusDetail] = useState({
    clientId: props.clientProfileDetail.id,
    description: "",
    audio: {},
    callNotReceived: false
  });
  const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state;
  const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar);
  const [buttonName, setButtonName] = useState("Play");

  useEffect(() => {
    if (a) {
      a.pause();
      setButtonName("Play");
    }
    if (addStatusDetail.audio) {
      a = new Audio(addStatusDetail.audio);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [addStatusDetail.audio]);
  const AddStatus = async (e) => {
    let blob = await fetch(addStatusDetail.audio).then(r => r.blob());
    const formData = new FormData()
    formData.append('clientId', addStatusDetail.clientId)
    formData.append('description', addStatusDetail.description)
    if (addStatusDetail.callNotReceived === false) {
      formData.append('audio', blob)
      formData.append('callNotReceived', addStatusDetail.callNotReceived)
    }
    else {
      formData.append('callNotReceived', addStatusDetail.callNotReceived)
    }
    console.log(formData);
    debugger
    AddClientStatus(
      formData,
      (res) => {
        props.handleStatusClose();
        setSuccessSnackbar({ ...successSnackbar, status: true, message: res.data.message })
      },
      (err) => {
        setErrorSnackbar({ ...errorSnackbar, status: true, message: err.response.data.error })
      }
    );
  };
  const addFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      console.log(e.target.files);
      // debugger
      setAddStatusDetail({ ...addStatusDetail, audio: URL.createObjectURL(e.target.files[0]) });
    }
  };
  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };
  return (
    <>
      <Dialog open={props.statusDialog} onClose={props.handleStatusClose}>
        <div style={{ textAlign: 'center' }} className="px-3 pt-3">
          <h4 style={{ fontWeight: '600' }}>Add Status</h4>
        </div>
        {/* <form enctype="multipart/form-data"> */}
        <DialogContent>
          <Box>
            <div className="row">
              <div className="col-md-12">
                <Typography variant="span">Description<span className="required_star">*</span></Typography>
              </div>
              <div className="col-md-12">
                <TextareaAutosize
                  value={addStatusDetail.description}
                  className="w-100"
                  sx={{ borderRadius: "10px" }}
                  onChange={(e) =>
                    setAddStatusDetail({
                      ...addStatusDetail,
                      description: e.target.value,
                      clientId: props.clientProfileDetail.id,
                    })
                  }
                  placeholder="Description Here..."
                />
                <Box className="col-md-12">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={() => setAddStatusDetail({ ...addStatusDetail, callNotReceived: !addStatusDetail.callNotReceived })} />} label="Call not received" />
                  </FormGroup>
                </Box>
                {addStatusDetail.callNotReceived === false && <> <p> Upload Audio File<span className="required_star">*</span>(Mp3 Only)</p>
                  <div>
                    <button onClick={handleClick}>{buttonName}</button>
                    <input type="file" onChange={addFile} />
                  </div></>}
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={AddStatus}>
            Add
          </Button>
          <Button variant="contained" onClick={props.handleStatusClose}>
            Cancel
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
};

export default StatusDialog;
