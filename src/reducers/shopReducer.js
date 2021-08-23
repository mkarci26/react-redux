import { handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const GET_SHOP = 'GET_SHOP';

const redux = function() {
  async function handleGetShop({dispatch}) {
    return await dispatch({
      type: GET_SHOP,
      promise: axios.get(config.host + 'json/shop.json')
    })
  }

  //REDUCER ACTION PACK
  return {
    actions: {
      getShop: async => {
        return dispatch => {
          return handleGetShop({dispatch})
        }
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [GET_SHOP]: (state, action) => {
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