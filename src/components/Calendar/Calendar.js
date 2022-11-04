import { React, useState, useEffect, useContext } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AppointmentList from "./AppointmentList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import ReminderList from "./ReminderList";
import AddRemainderDialog from "./AddRemainderDialog";
import AddAppointmentDialog from "./AddAppointmentDialog";
import {
  GetAdminAppointmentOrReminder,
  DeleteAppointment,
  AddCalendarReminder,
} from "../../services/apiservices/adminprofile";
import { Context as ContextEditAppointmentDialog } from "../../context/pageContext";
import Loader from "../Loader/Loader";

const Calendar = () => {
  const [value, setValue] = useState("Appointments");
  const { editAppointmentDialogFlag } = useContext(ContextEditAppointmentDialog)?.state;
  const [loader, setLoader] = useState(false);

  const [clientType, setClientType] = useState([
    "intiate",
    "inter-mediate",
    "confirm",
  ]);
  const [remainderDialogControl, setRemainderDialogControl] = useState(false);
  const [appointmentDialogControl, setAppointmentDialogControl] =
    useState(false);
  const [AppointmentListDetail, setAppointmentListDetail] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAppointmentDialogClose = () => {
    setAppointmentDialogControl(!appointmentDialogControl);
  };
  const handleRemainderDialogClose = () => {
    setRemainderDialogControl(!remainderDialogControl);
  };

  useEffect(() => {
    setLoader(true)
    GetAdminAppointmentOrReminder(
      { type: "APPOINTMENT" },
      (res) => {
        if (res.status === 200) {
          setAppointmentListDetail(res.data);
          setLoader(false)
        }
      },
      (err) => {
        setLoader(false)
      }
    );
  }, [appointmentDialogControl, editAppointmentDialogFlag]);

  return (
    <>
      {
        loader && <Loader />
      }
      <Box className="calender_section">
        <TabContext value={value}>
          <Box className="notification_tabs_root">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab value="Appointments" label="Appointments" />
              <Tab value="My Reminder" label="My Reminder" />
            </Tabs>
            {value === "Appointments" ? (
              <Button
                className="main_button"
                onClick={() => {
                  setAppointmentDialogControl(true);
                }}
              >
                <AddRoundedIcon />
                Appointment
              </Button>
            ) : null}
            {value === "My Reminder" ? (
              <Button
                className="main_button"
                onClick={() => {
                  setRemainderDialogControl(true);
                }}
              >
                <AddRoundedIcon />
                Reminder
              </Button>
            ) : null}
          </Box>
          <TabPanel value="Appointments">
            <AppointmentList
              AppointmentListDetail={AppointmentListDetail}
              // handleDeleteAppointment={handleDeleteAppointment}
              setAppointmentListDetail={setAppointmentListDetail}
            />
          </TabPanel>
          <TabPanel value="My Reminder">
            <ReminderList remainderDialogControl={remainderDialogControl} />
          </TabPanel>
        </TabContext>
        <AddRemainderDialog
          // handleAddReminder={handleAddReminder}
          remainderDialogControl={remainderDialogControl}
          handleRemainderDialogClose={handleRemainderDialogClose}
        />
        <AddAppointmentDialog
          appointmentDialogControl={appointmentDialogControl}
          handleAppointmentDialogClose={handleAppointmentDialogClose}
        />
      </Box>
    </>
  );
};

export default Calendar;
