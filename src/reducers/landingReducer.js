import { handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const GET_LANDING = 'GET_LANDING';

const redux = function() {
  async function handleGetLanding({dispatch}) {
    return await dispatch({
      type: GET_LANDING,
      promise: axios.get(config.host + 'json/landing.json')
    })
  }

  //REDUCER ACTION PACK
  return {
    actions: {
      getLanding: async => {
        return dispatch => {
          return handleGetLanding({dispatch})
        }
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [GET_LANDING]: (state, action) => {
          return handle(state, action, {
            start: prevState => ({ ...prevState, isLoading: true}),
            success: prevState => ({ ...prevState, ...action.payload.data, isLoading: false }),
          })
        }
      },
      {}
    )
  }
}

export default redux();