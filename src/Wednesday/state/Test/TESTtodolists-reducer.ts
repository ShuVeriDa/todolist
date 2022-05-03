import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../../../App";

export const ADD_TODOLIST = "ADD-TODOLIST"
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const CHANGE_FILTER = "CHANGE-FILTER"
export const UPDATE_TODOLIST_TITLE = "UPDATE-TODOLIST-TITLE"

export const todolistReducer = (state: TodoListsType[], action: todolistReducerType): TodoListsType[] => {
   switch (action.type) {
      case ADD_TODOLIST:
         let newTodolist: TodoListsType = {id: action.payload.todolistID, title: action.payload.newTitle, filter: 'all'}
         return [...state, newTodolist]
      case REMOVE_TODOLIST:
         return state.filter(tdl => tdl.id !== action.payload.todolistID)
      case CHANGE_FILTER:
         return state.map(tdl => tdl.id === action.payload.todolistID ? {...tdl, filter: action.payload.filter} : tdl)
      case UPDATE_TODOLIST_TITLE:
         return state.map(tdl => tdl.id === action.payload.todolistID ? {...tdl, title: action.payload.title} : tdl)
      default:
         return state
   }
}

type todolistReducerType =
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof changeFilterAC> |
   ReturnType<typeof updateTodolistTitle>

export const addTodolistAC = (newTitle: string) => {
   return {
      type: ADD_TODOLIST,
      payload: {
         newTitle,
         todolistID: v1()
      }
   } as const
}
export const removeTodolistAC = (todolistID: string) => {
   return {
      type: REMOVE_TODOLIST,
      payload: {
         todolistID,
      }
   } as const
}
export const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
   return {
      type: CHANGE_FILTER,
      payload: {
         todolistID,
         filter
      }
   } as const
}
export const updateTodolistTitle = (todolistID: string, title: string) => {
   return {
      type: UPDATE_TODOLIST_TITLE,
      payload: {
         todolistID,
         title
      }
   } as const
}
