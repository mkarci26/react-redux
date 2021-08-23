import { createAction, handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const GET_LAYOUT = 'GET_LAYOUT';

const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
const SnackbarOpen = createAction(OPEN_SNACKBAR)
const SnackbarClose = createAction(CLOSE_SNACKBAR)

const redux = function() {
  async function handleGetLayout({dispatch}) {
    return await dispatch({
      type: GET_LAYOUT,
      promise: axios.get(config.host + 'json/layout.json')
    })
  }

  //REDUCER ACTION PACK
  return {
    actions: {
      getLayout: async => {
        return dispatch => {
          return handleGetLayout({dispatch})
        }
      },
      openSnackbar: msg => {
        return dispatch => {
          dispatch(SnackbarOpen(msg))
        }
      },
      closeSnackbar: () => {
        return dispatch => {
          dispatch(SnackbarClose())
        }
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [OPEN_SNACKBAR]: (state, action) => {
          state.snackMsg = action.payload
          state.openSnackbar = true
          return {
            ...state
          }
        },
        [CLOSE_SNACKBAR]: (state, action) => {
          state.snackMsg = ''
          state.openSnackbar = false
          return {
            ...state
          }
        },
        [GET_LAYOUT]: (state, action) => {
          return handle(state, action, {
            start: prevState => ({ ...prevState, isLoading: true}),
            success: prevState => ({ ...prevState, ...action.payload.data, isLoading: false }),
          })
        }
      },
      {
        snackMsg: '',
        openSnackbar: false
      }
    )
  }
}

export default redux();