import { handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const GET_PRODUCT = 'GET_PRODUCT';

const redux = function() {
  async function handleGetProduct({dispatch}) {
    return await dispatch({
      type: GET_PRODUCT,
      promise: axios.get(config.host + 'json/product.json')
    })
  }

  //REDUCER ACTION PACK
  return {
    actions: {
      getProduct: async => {
        return dispatch => {
          return handleGetProduct({dispatch})
        }
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [GET_PRODUCT]: (state, action) => {
          return handle(state, action, {
            start: prevState => ({ ...prevState, isLoading: true}),
            success: prevState => ({ ...prevState, data: action.payload.data, isLoading: false }),
          })
        }
      },
      {
        data: []
      }
    )
  }
}

export default redux();