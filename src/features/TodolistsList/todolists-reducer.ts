import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC,} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../utils/error-utils";


export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = "SET-TODOLISTS"

//Thunk
export const fetchTodolistsTC = createAsyncThunk('todolitst/fetchTodolists', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await todolistsAPI.getTodolists()
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return {todolists: res.data}
   } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
   }

})
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

const slice = createSlice({
   name: 'todolists',
   initialState: [] as TodolistDomainType[],
   reducers: {
      removeTodolistAC: (state, action: PayloadAction<{ todolistId: string }>) => {
         // state.filter(el => el.id !== action.payload.todolistId)
         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         if (index > -1) {
            state.splice(index, 1)
         }
      },
      addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
         // [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

         state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
      },
      changeTodolistTitleAC: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, title: action.payload.title} : tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].title = action.payload.title
      },
      changeTodolistFilterAC: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, filter: action.payload.filter} : tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].filter = action.payload.filter
      },
      changeTodolistEntityStatusAC: (state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) => {
         // state.map(tdl => tdl.id === action.payload.todolistId ? {...tdl, entityStatus: 'loading'}: tdl)

         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         state[index].entityStatus = action.payload.status
      },
   },
   extraReducers: builder => {
      builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
         return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
      })
   }
})

//reducer
export const todolistsReducer = slice.reducer

//actions
export const {
   addTodolistAC,
   removeTodolistAC,
   changeTodolistFilterAC,
   changeTodolistEntityStatusAC,
   changeTodolistTitleAC,
} = slice.actions


//Type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   // isDisabled: boolean
   entityStatus: RequestStatusType
}

//TYPE AC & Thunk
