import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC,} from "../Application/application-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../utils/error-utils";
import {TodolistType} from "../../api/types";

//Thunk
export const fetchTodolistsTC = createAsyncThunk('todolist/fetchTodolists', async (param, thunkAPI) => {
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
export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (todolistId: string, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
   const res = await todolistsAPI.deleteTodolist(todolistId)
   thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
   return {todolistId}
})
export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (title: string, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
   const res = await todolistsAPI.createTodolist(title)
   thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
   return {todolist: res.data.data.item}
})
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
      builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
         const index = state.findIndex(tdl => tdl.id === action.payload.todolistId)
         if (index > -1) {
            state.splice(index, 1)
         }
      })
      builder.addCase(addTodolistTC.fulfilled, (state, action) => {
         state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
      })
   }
})

//reducer
export const todolistsReducer = slice.reducer

//actions
export const {
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
