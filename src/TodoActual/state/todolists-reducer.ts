import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../api/todolists-api";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOS = "SET-TODOS"

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
}

const initialState: TodolistDomainType[] = [
   // {
   //    id: todolistId1,
   //    title: 'What to learn',
   //    filter: 'all',
   //    addedDate: '',
   //    order: 0
   // },
   // {
   //    id: todolistId2,
   //    title: 'What to buy',
   //    filter: 'all',
   //    addedDate: '',
   //    order: 0
   // }
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: todolistsReducersType): TodolistDomainType[] => {
   switch (action.type) {
      case SET_TODOS:
         return action.todolists.map(tdl => {
            return {...tdl, filter: 'all'}
         })
      case REMOVE_TODOLIST:
         return state.filter(el => el.id !== action.todolistId)
      case ADD_TODOLIST: {
         return [{
            id: action.todolistId,
            title: action.title,
            filter: 'all',
            addedDate: '',
            order: 0
         }, ...state]
      }
      case CHANGE_TODOLIST_TITLE:
         return state.map(tdl => tdl.id === action.todolistId ? {...tdl, title: action.title} : tdl)
      // const todolist = state.find(tl => tl.id === action.todolistId);
      // if (todolist) {
      //    // если нашёлся - изменим ему заголовок
      //    todolist.title = action.title;
      // }
      // return [...state]
      case CHANGE_TODOLIST_FILTER:
         return state.map(tdl => tdl.id === action.todolistId ? {...tdl, filter: action.filter} : tdl)
      // const todolist = state.find(tl => tl.id === action.todolistId);
      // if (todolist) {
      //    // если нашёлся - изменим ему заголовок
      //    todolist.filter = action.filter;
      // }
      // return [...state]

      default:
         return state
   }
}

type todolistsReducersType =
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof changeTodolistTitleAC> |
   ReturnType<typeof changeTodolistFilterAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof setTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
   return {type: REMOVE_TODOLIST, todolistId} as const
}
export const addTodolistAC = (title: string) => {
   return {type: ADD_TODOLIST, title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
   return {type: CHANGE_TODOLIST_TITLE, todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
   return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}
export const setTodolistAC = (todolists: TodolistType[]) => {
   debugger
   return {type: SET_TODOS, todolists} as const
}

//Thunk
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
   debugger
   todolistsAPI.getTodolists()
      .then((res) => {
         dispatch(setTodolistAC(res.data))
      })
}
