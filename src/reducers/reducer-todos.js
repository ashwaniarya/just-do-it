import * as actionTypes from '../actions/types'
import _ from 'lodash'
import shortid from 'shortid'

export function todo(state={},action){
  switch(action.type){
    case actionTypes.ADD_TODO:
      return {...state,[action.payload.id]:action.payload}
    case actionTypes.REMOVE_TODO:
      let newState = {...state}
      console.log(newState[action.payload]);
      delete newState[action.payload]
      return newState
    case actionTypes.TOGGLE_COMPLETE:
      newState = {...state}
      console.log(newState[action.payload]);
      newState[action.payload].completed = !newState[action.payload].completed
      return newState
    default: return state
  }
}