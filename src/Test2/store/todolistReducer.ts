import {v1} from "uuid";
import {Test2FilterValuesType, Test2TodoListType} from "../Test2";

export const ADD_TODOLIST = "ADD-TODOLIST"
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"

const initialState: Test2TodoListType[] = []

export const todolistReducer = (state: Test2TodoListType[] = initialState, action: todolistsReducerType): Test2TodoListType[] => {
   switch (action.type) {
      case ADD_TODOLIST:
         let newTodolist: Test2TodoListType = {id: action.todolistID, title: action.title, filter: 'all'}
         return [newTodolist, ...state]
      case REMOVE_TODOLIST:
         return state.filter(tdl => tdl.id !== action.todolistID)
      case CHANGE_TODOLIST_FILTER:
         return state.map(tdl => tdl.id === action.todolistID ? {...tdl, filter: action.filter} : tdl)
      case CHANGE_TODOLIST_TITLE:
         return state.map(tdl => tdl.id === action.todolistID ? {...tdl, title: action.newTitle} : tdl)
      default:
         return state
   }
}

type todolistsReducerType =
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof changeFilterAC> |
   ReturnType<typeof changeTodolistTitleAC>

export const addTodolistAC = (title: string) => {
   return {
      type: ADD_TODOLIST,
      title,
      todolistID: v1()
   } as const
}
export const removeTodolistAC = (todolistID: string) => {
   return {
      type: REMOVE_TODOLIST,
      todolistID
   } as const
}
export const changeFilterAC = (todolistID: string, filter: Test2FilterValuesType) => {
   return {
      type: CHANGE_TODOLIST_FILTER,
      todolistID,
      filter
   } as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
   return {
      type: CHANGE_TODOLIST_TITLE,
      todolistID,
      newTitle
   } as const
}