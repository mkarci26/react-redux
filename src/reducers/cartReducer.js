import { createAction, handleActions } from "redux-actions";
import { handle } from "redux-pack";
import axios from "axios";
import config from '../config.js'

const ADD_CART = 'ADD_CART'
const addToCart = createAction(ADD_CART)

const redux = function() {
  //REDUCER ACTION PACK
  return {
    actions: {
      addCart: obj => {
        return dispatch => {
          dispatch(addToCart(obj))
        }
      }
    },

    //REDUCER DISPATCHER
    reducer: handleActions(
      {
        [ADD_CART]: (state, action) => {
          let obj = action.payload
          let res = state.data.filter(x => x.id === obj.id)
          if (res.length > 0 ) {
            obj.qty++
          } else {
            obj.qty = 1
            state.data.push(obj)
          }
          return {
            ...state
          }
        }
      },
      {
        data: []
      }
    )
  }
}

export default redux();