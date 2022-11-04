import React from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Autocomplete,
} from "@mui/material";
const ChangeRoleDialog = (props) => {
  return (
    <>
      <Dialog
        open={props.changeRoleDialogControl}
        // onClose={handleClose}
      >
        <div className="px-3 pt-3">
          <h3>{"Use Google's location service?"}</h3>
        </div>
        <DialogContent>
          <DialogContentText>
            <TextField placeholder="Outlined" variant="outlined" />
            {/* <Autocomplete
                            disablePortal
                            options={props.changeRoleDialogControl}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} placeholder="Movie" />}
                        /> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          {/* <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeRoleDialog;
