import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";
import {TodolistAPIType, todolistsAPI} from "../api/todolists-api";
import {AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";


const initialState: TodoListsType[] = []

export const todolistsReducer = (state = initialState, action: todolistsReducersType): TodoListsType[] => {
   switch (action.type) {
      case 'REMOVE-TODOLIST':
         return state.filter(el => el.id !== action.todolistID)
      case "ADD-TODOLIST":
         let newTodoList: TodoListsType = {id: action.todolistID, title: action.title, filter: "all"}
         return [newTodoList, ...state]
      case 'CHANGE-TODOLIST-TITLE':
         return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
      case "CHANGE-TODOLIST-FILTER":
         return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
      case 'SET-TODOS':
        return action.todolists.map(tdl => {
           return {...tdl, filter: 'all'}
        })
      default:
         return state
   }
}

type todolistsReducersType =
   ReturnType<typeof removeTodoListAC> |
   ReturnType<typeof changeTodoListTitle> |
   ReturnType<typeof changeFilterAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof setTodolistAC>

export const removeTodoListAC = (todolistID: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      todolistID,
   } as const
}
export const addTodolistAC = (title: string) => {
   return {
      type: "ADD-TODOLIST",
      title,
      todolistID: v1()
   } as const
}
export const changeTodoListTitle = (id: string, title: string) => {
   debugger
   return {
      type: 'CHANGE-TODOLIST-TITLE',
      id,
      title
   } as const
}
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      id,
      filter
   } as const
}
export const setTodolistAC = (todolists: TodolistAPIType[]) => {
   return {
      type: 'SET-TODOS',
      todolists
   } as const
}

//Thunk
export const fetchTodosTC = () => {
   return (dispatch: Dispatch) => {
      todolistsAPI.getTodolists()
         .then((res) => {
            dispatch(setTodolistAC(res.data))
         })
   }
}
