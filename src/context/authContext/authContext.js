import createDataContext from '../create_data_context'

const LoginReducer = (state, action) => {
  switch (action.type) {
    case 'setAuthorize':
      return { ...state, authorize: action?.payload }
    case 'setFlagLoader':
      return { ...state, flagLoader: action?.payload }
    case 'setPermissions':
      return { ...state, permissions: action?.payload }
    default:
      return state
  }
}
const setAuthorize = dispatch => async data => {
  dispatch({
    type: 'setAuthorize',
    payload: data,
  })
}
const setFlagLoader = dispatch => async data => {
  dispatch({
    type: 'setFlagLoader',
    payload: data,
  })
}
const setPermissions = dispatch => async data => {
  dispatch({
    type: 'setPermissions',
    payload: data,
  })
}

export const { Provider, Context } = createDataContext(
  LoginReducer,
  { setAuthorize, setFlagLoader, setPermissions },
  { authorize: false, flagLoader: false, permissions: {} },
)
