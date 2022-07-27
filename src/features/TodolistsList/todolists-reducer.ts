import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {
   RequestStatusType,
   setAppStatusAC,
} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = "SET-TODOLISTS"

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

const slice = createSlice({
   name: 'todolists',
   initialState: initialState,
   reducers: {
      setTodolistAC: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
         return action.payload.todolists.map(tdl => ({...tdl, filter: 'all', entityStatus: 'idle'}))
      },
      removeTodolistAC: (state, action: PayloadAction<{todolistId: string}>) => {
         // state.filter(el => el.id !== action.payload.todolistId)
         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         if (index > -1) {
            state.splice(index, 1)
         }
      },
      addTodolistAC: (state, action: PayloadAction<{todolist: TodolistType}>) => {
         // [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

         state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
      },
      changeTodolistTitleAC: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, title: action.payload.title} : tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].title = action.payload.title
      },
      changeTodolistFilterAC: (state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, filter: action.payload.filter} : tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].filter = action.payload.filter
      },
      changeTodolistEntityStatusAC: (state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, entityStatus: 'loading'}: tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].entityStatus = action.payload.status
      },
   }
})

//reducer
export const todolistsReducer = slice.reducer

//actions
export const {addTodolistAC, removeTodolistAC, changeTodolistFilterAC, changeTodolistEntityStatusAC, changeTodolistTitleAC, setTodolistAC} = slice.actions


//Thunk
export const fetchTodolistsTC = () => {
   return (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      todolistsAPI.getTodolists()
         .then((res) => {
            dispatch(setTodolistAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
         })
   }
}
export const removeTodolistTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
      todolistsAPI.deleteTodolist(todolistId)
         .then((res) => {
            if (res.data.resultCode == 0) {
               dispatch(removeTodolistAC({todolistId}))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            }
         })
   }
}
export const addTodolistTC = (title: string) => {
   return (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      todolistsAPI.createTodolist(title)
         .then((res) => {
            if (res.data.resultCode === 0) {
               dispatch(addTodolistAC({todolist: res.data.data.item}))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            }
         })
   }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
   return (dispatch: Dispatch) => {
      todolistsAPI.updateTodolist(todolistId, title)
         .then((res) => {
            dispatch(changeTodolistTitleAC({todolistId, title}))
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
