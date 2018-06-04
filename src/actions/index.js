import * as actionTypes from './types'

export function createTodo(todo){
  console.log(todo);
  return {
    type:actionTypes.ADD_TODO,
    payload:todo
  }
}

export function toggleComplete(id){
  console.log(id);
  return {
    type:actionTypes.TOGGLE_COMPLETE,
    payload:id
  }
}

export function removeTodo(id){
  console.log(id);
  return {
    type:actionTypes.REMOVE_TODO,
    payload:id
  }
}