import createDataContext from "../create_data_context";

const cardListReducer = (state, action) => {
  switch (action.type) {
    case "setActivePage":
      return { ...state, ActivePage: action?.payload };
    case "setEditAppointmentDialogFlag":
      return { ...state, editAppointmentDialogFlag: action.payload };
    case "setEditRemainderDialogFlag":
      return { ...state, editRemainderDialogFlag: action.payload };
    case "setSuccessSnackbar":
      return { ...state, successSnackbar: action.payload };
    case "setErrorSnackbar":
      return { ...state, errorSnackbar: action.payload };
    case "setNotificationSnackbar":
      return { ...state, notificationSnackbar: action.payload };
    default:
      return state;
  }
};
const setActivePage = (dispatch) => async (data) => {
  console.log("Printing Fullscreen flag", data);

  dispatch({
    type: "setActivePage",
    payload: data,
  });
};
const setEditAppointmentDialogFlag = (dispatch) => async (data) => {
  console.log("Printing flag", data);

  dispatch({
    type: "setEditAppointmentDialogFlag",
    payload: data,
  });
};
const setEditRemainderDialogFlag = (dispatch) => async (data) => {
  console.log("Printing  flag", data);

  dispatch({
    type: "setEditRemainderDialogFlag",
    payload: data,
  });
};
const setSuccessSnackbar = (dispatch) => async (data) => {
  console.log("Printing  flag", data);
  dispatch({
    type: "setSuccessSnackbar",
    payload: data,
  });
}

const setErrorSnackbar = (dispatch) => async (data) => {
  console.log("Printing  flag", data);
  dispatch({
    type: "setErrorSnackbar",
    payload: data,
  });
}

const setNotificationSnackbar = (dispatch) => async (data) => {
  console.log("Printing  flag", data);
  dispatch({
    type: "setNotificationSnackbar",
    payload: data,
  });
}
export const { Provider, Context } = createDataContext(
  cardListReducer,
  { setActivePage, setEditAppointmentDialogFlag, setEditRemainderDialogFlag, setSuccessSnackbar, setErrorSnackbar, setNotificationSnackbar },
  { ActivePage: "Profile", editAppointmentDialogFlag: false, editRemainderDialogFlag: false, successSnackbar: { message: "", status: false }, errorSnackbar: { message: "", status: false }, notificationSnackbar: { heading: "", description: "" ,status: false} }
);
