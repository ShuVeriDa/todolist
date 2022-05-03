import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"

export const todolistsReducer1 = (state: TodoListsType[], action: todolistsReducer1Type): TodoListsType[] => {
   switch (action.type) {
      case REMOVE_TODOLIST:
         return state.filter(task => task.id !== action.todolistID)
      case ADD_TODOLIST:
         let newTodoList: TodoListsType = {id: action.todolistID, title: action.title, filter: "all"}
         return [...state, newTodoList]
      case CHANGE_TODOLIST_TITLE:
         return state.map(tdl => tdl.id === action.todolistID ? {...tdl, title: action.title} : tdl)
      case CHANGE_TODOLIST_FILTER:
         return state.map(tdl => tdl.id === action.todolistID ? {...tdl, filter: action.filter}: tdl)
      default:
         return state
   }
}

type todolistsReducer1Type =
   ReturnType<typeof removeTodolist1AC> |
   ReturnType<typeof addTodolist1AC> |
   ReturnType<typeof changeTodolist1AC> |
   ReturnType<typeof changeTodolistFilter1AC>

export const removeTodolist1AC = (todolistID: string) => {
   return {
      type: REMOVE_TODOLIST,
      todolistID
   } as const
}

export const addTodolist1AC = (title: string) => {
   return {
      type: ADD_TODOLIST,
      title,
      todolistID: v1()
   } as const
}

export const changeTodolist1AC = (todolistID: string, title: string) => {
   return {
      type: CHANGE_TODOLIST_TITLE,
      todolistID,
      title,
   } as const
}

export const changeTodolistFilter1AC = (todolistID: string, filter: FilterValuesType) => {
   return {
      type: CHANGE_TODOLIST_FILTER,
      todolistID,
      filter
   } as const
}



