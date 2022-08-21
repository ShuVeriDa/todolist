import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {RequestStatusType,} from "../Application/application-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../../api/types";
import {appActions} from '../CommonActions/App'
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {ThunkError} from "../../utils/types";


const {setAppStatusAC} = appActions

//Thunk
const fetchTodolistsTC = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>('todolist/fetchTodolists', async (param, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   try {
      const res = await todolistsAPI.getTodolists()
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return {todolists: res.data}
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI)
   }

})
const removeTodolistTC = createAsyncThunk<{ todolistId: string }, string, ThunkError>('todolist/removeTodolist', async (todolistId, thunkAPI) => {
   //изменим глобальный статус приложения, чтобы вверху полоса побежала
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
   thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
   const res = await todolistsAPI.deleteTodolist(todolistId)
   //скажем глобально приложению, что асинхронная операция завершена
   thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
   return {todolistId}
})
const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>
('todolist/addTodolist', async (title, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

   try {
      const res = await todolistsAPI.createTodolist(title)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
         return {todolist: res.data.data.item}
      } else {
         return handleAsyncServerAppError(res.data, thunkAPI, false)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)
   }
})
const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
   try {
      const res = await todolistsAPI.updateTodolist(param.id, param.title)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
         return {id: param.id, title: param.title}
      } else {
         return handleAsyncServerAppError(res.data, thunkAPI)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)
   }
})

export const asyncActions = {
   fetchTodolistsTC,
   removeTodolistTC,
   addTodolistTC,
   changeTodolistTitleTC
}

export const slice = createSlice({
   name: 'todolists',
   initialState: [] as TodolistDomainType[],
   reducers: {
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
      builder
         .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
         })
         .addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
            if (index > -1) {
               state.splice(index, 1)
            }
         })
         .addCase(addTodolistTC.fulfilled, (state, action) => {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
         })
         .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
         })
   }
})


//actions
export const {
   changeTodolistFilterAC,
   changeTodolistEntityStatusAC,
} = slice.actions


//Type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
   filter: FilterValuesType
   // isDisabled: boolean
   entityStatus: RequestStatusType
}
