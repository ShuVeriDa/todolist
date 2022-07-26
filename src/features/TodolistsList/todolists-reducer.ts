import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {
   RequestStatusType,
   setAppStatusAC,
   SetAppStatusActionType
} from "../../app/app-reducer";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
export const SET_TODOLISTS = "SET-TODOLISTS"
export const CHANGE_TODOLIST_ENTITY_STATUS  = 'CHANGE-TODOLIST-ENTITY-STATUS'

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

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
   switch (action.type) {
      case SET_TODOLISTS:
         return action.todolists.map(tdl => ({...tdl, filter: 'all', entityStatus: 'idle'}))
      case REMOVE_TODOLIST:
         return state.filter(el => el.id !== action.todolistId)
      case ADD_TODOLIST:
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
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
      case CHANGE_TODOLIST_ENTITY_STATUS:
         return state.map(tdl => tdl.id === action.todolistId ? {...tdl, entityStatus: 'loading'}: tdl)
      default:
         return state
   }
}

//ACTION CREATOR
export const removeTodolistAC = (todolistId: string) => {
   return {type: REMOVE_TODOLIST, todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
   return {type: ADD_TODOLIST, todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
   return {type: CHANGE_TODOLIST_TITLE, todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
   return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}
export const setTodolistAC = (todolists: TodolistType[]) => {
   return {type: SET_TODOLISTS, todolists} as const
}
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
   return {
      type: CHANGE_TODOLIST_ENTITY_STATUS,
      todolistId,
      status
   } as const
}

//Thunk
export const fetchTodolistsTC = () => {
   return (dispatch: ThunkDispatch) => {
      dispatch(setAppStatusAC('loading'))
      todolistsAPI.getTodolists()
         .then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
         })
   }
}
export const removeTodolistTC = (todolistId: string) => {
   return (dispatch: ThunkDispatch) => {
      dispatch(setAppStatusAC('loading'))
      dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
      todolistsAPI.deleteTodolist(todolistId)
         .then((res) => {
            if (res.data.resultCode == 0) {
               dispatch(removeTodolistAC(todolistId))
               dispatch(setAppStatusAC('succeeded'))
            }
         })
   }
}
export const addTodolistTC = (title: string) => {
   return (dispatch: ThunkDispatch) => {
      dispatch(setAppStatusAC('loading'))
      todolistsAPI.createTodolist(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTodolistAC(res.data.data.item))
               dispatch(setAppStatusAC('succeeded'))
            }
         })
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch<ActionsType>) => {
      todolistsAPI.updateTodolist(todolistId, title)
         .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
         })
   }
}

//Type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   // isDisabled: boolean
   entityStatus: RequestStatusType
}

//TYPE AC & Thunk

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistACType = ReturnType<typeof setTodolistAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType = RemoveTodolistACType
   | ChangeTodolistTitleACType
   | ChangeTodolistFilterACType
   | AddTodolistACType
   | SetTodolistACType
   | ChangeTodolistEntityStatusACType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>