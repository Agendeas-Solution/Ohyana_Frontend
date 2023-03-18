import React from "react";
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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@mui/system";

const PoorContact = (props) => {
  console.log(`${props.handleCallClose}`);
  return (
    <>
      <Dialog open={props.addPoorContact} onClose={props.handleCallClose}>
        {/* <Dialog> */}
        <div style={{ textAlign: "center" }} className="px-3 pt-3">
          <h4
            style={{
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Poor Contact
          </h4>
          <div>
            <FormControl>
              <RadioGroup
                row
                defaultValue="not received"
                // className="set_radio_button_bg"
              >
                <FormControlLabel
                  value="not received"
                  control={<Radio />}
                  label="Call not received"
                />
                <FormControlLabel
                  value="other reason"
                  control={<Radio />}
                  label="Due to other work"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="col-md-12 mt-3">
            <TextareaAutosize
              className="w-100"
              sx={{ borderRadius: "10px" }}
              placeholder="Brief in late inquiry"
            />
          </div>

          {/* onClick={props.handleStatusClose} */}

          <Box className="mt-4 p-3 set_reminder_bg" sx={{ borderRadius: 3 }}>
            <h6 align="left">Set Reminder</h6>
            <Box>
              <div className="row mt-2">
                <div className="col-md-12">
                  <Typography align="left">Date</Typography>
                </div>
                <div className="col-md-12  ">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disablePast
                      inputFormat="dd/MM/yyyy"
                      className="set_date_time_bg w-100"
                      renderInput={(params) => (
                        <TextField className="w-100" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Box>
            <Box className="my-3">
              <div className="row  mt-2">
                <div className="col-md-12">
                  <Typography align="left">Time</Typography>
                </div>
                <div className="col-md-12">
                  <TextField className="set_date_time_bg w-100" type="time" />
                </div>
              </div>
            </Box>
          </Box>
          <Button
            className="mt-3"
            sx={{
              paddingRight: 12,
              paddingLeft: 12,
              borderRadius: 2,
              fontSize: 22,
              backgroundColor: "#2E3591",
            }}
            variant="contained"
            onClick={() => console.log("Save button clicked!!!")}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PoorContact;
