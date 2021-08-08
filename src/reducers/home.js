import { handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const GET_LAYOUT = 'GET_LAYOUT';

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
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [GET_LAYOUT]: (state, action) => {
          return handle(state, action, {
            start: prevState => ({ ...prevState, isLoading: true}),
            success: prevState => ({ ...prevState, layout: action.payload.data, isLoading: false }),
          })
        }
      },
      {
        layout: {}
      }
    )
  }
}

export default redux();