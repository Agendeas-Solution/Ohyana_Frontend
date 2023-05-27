import createDataContext from '../create_data_context'

const cardListReducer = (state, action) => {
  switch (action.type) {
    case 'setActivePage':
      return { ...state, ActivePage: action?.payload }
    case 'setActivePageClient':
      return { ...state, activePageClient: action?.payload }
    case 'setEditAppointmentDialogFlag':
      return { ...state, editAppointmentDialogFlag: action.payload }
    case 'setEditRemainderDialogFlag':
      return { ...state, editRemainderDialogFlag: action.payload }
    case 'setSuccessSnackbar':
      return { ...state, successSnackbar: action.payload }
    case 'setErrorSnackbar':
      return { ...state, errorSnackbar: action.payload }
    case 'setNotificationSnackbar':
      return { ...state, notificationSnackbar: action.payload }
    default:
      return state
  }
}
const setActivePage = dispatch => async data => {
  dispatch({
    type: 'setActivePage',
    payload: data,
  })
}
const setActivePageClient = dispatch => async data => {
  dispatch({
    type: 'setActivePageClient',
    payload: data,
  })
}
const setEditAppointmentDialogFlag = dispatch => async data => {
  dispatch({
    type: 'setEditAppointmentDialogFlag',
    payload: data,
  })
}
const setEditRemainderDialogFlag = dispatch => async data => {
  dispatch({
    type: 'setEditRemainderDialogFlag',
    payload: data,
  })
}
const setSuccessSnackbar = dispatch => async data => {
  dispatch({
    type: 'setSuccessSnackbar',
    payload: data,
  })
}

const setErrorSnackbar = dispatch => async data => {
  dispatch({
    type: 'setErrorSnackbar',
    payload: data,
  })
}

const setNotificationSnackbar = dispatch => async data => {
  dispatch({
    type: 'setNotificationSnackbar',
    payload: data,
  })
}
export const { Provider, Context } = createDataContext(
  cardListReducer,
  {
    setActivePage,
    setActivePageClient,
    setEditAppointmentDialogFlag,
    setEditRemainderDialogFlag,
    setSuccessSnackbar,
    setErrorSnackbar,
    setNotificationSnackbar,
  },
  {
    ActivePage: 'Profile',
    activePageClient: 'Status',
    editAppointmentDialogFlag: false,
    editRemainderDialogFlag: false,
    successSnackbar: { message: '', status: false },
    errorSnackbar: { message: '', status: false },
    notificationSnackbar: { heading: '', description: '', status: false },
  },
)
