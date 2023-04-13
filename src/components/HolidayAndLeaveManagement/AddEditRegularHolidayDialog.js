import React, { useContext } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
const AddEditRegularHolidayDialog = ({ addEditRegularDetail, setAddEditRegularDetail, daysList, handleAddEditRegularDialogClose, handleAddRegularHoliday,handleUpdateRegularHoliday }) => {
    return (
        <>
            <Dialog
                open={addEditRegularDetail.status}
                onClose={handleAddEditRegularDialogClose}
            >
                <DialogTitle>Add Regular Holiday</DialogTitle>
                <FormControl>
                    <InputLabel>Select Regular Holiday</InputLabel>
                    <Select
                        label="Select Regular Holiday"
                        value={addEditRegularDetail?.occasion}
                        onChange={e => {
                            setAddEditRegularDetail({ ...addEditRegularDetail, occasion: e.target.value })
                        }}
                    >
                        {daysList &&
                            daysList.map(data => {
                                return <MenuItem value={data?.id}>{data?.days}</MenuItem>
                            })}
                    </Select>
                </FormControl>
                <DialogActions className="m-auto">
                    <Button
                        variant="contained"
                        onClick={addEditRegularDetail?.id ? handleUpdateRegularHoliday : handleAddRegularHoliday}
                    >
                        Ok
                    </Button>
                    <Button className="cancel-btn" onClick={handleAddEditRegularDialogClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddEditRegularHolidayDialog