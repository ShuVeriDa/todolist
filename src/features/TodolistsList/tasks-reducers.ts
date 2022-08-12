import {
   authAPI,
   TaskPriorities,
   TaskStatuses,
   TaskType,
   todolistsAPI,
   UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistAC, fetchTodolistsTC, removeTodolistAC} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

//thunk
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
   const res = await todolistsAPI.getTasks(todolistId)
   const tasks = res.data.items
   thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
   return {todolistId, tasks}
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async(param: { todolistId: string, taskId: string }, thunkAPI) => {
   const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
     return {todolistId: param.todolistId, taskId: param.taskId}
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: {todolistId: string, title: string}, thunkAPI) => {
   thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
   const res = await todolistsAPI.createTask(param.todolistId, param.title)
      try {
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
           return thunkAPI.rejectWithValue(null)
         }
      } catch(error: any)  {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async(param: {todolistId: string, taskId: string, model: UpdateDomainTaskModelType}, thunkAPI) => {

      const state = thunkAPI.getState() as AppRootStateType
      const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
      if (!task) {
         return thunkAPI.rejectWithValue('task not found in the state')
      }

      const apiModel: UpdateTaskModelType = {
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate,
         title: task.title,
         status: task.status,
         ...param.model
      }

      const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
         try {
            if (res.data.resultCode === 0) {
               return param
            } else {
               handleServerAppError(res.data, thunkAPI.dispatch);
               return thunkAPI.rejectWithValue(null)
            }
         } catch(error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null)
         }
   })


const slice = createSlice({
   name: "tasks",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(addTodolistAC, (state, action) => {
         state[action.payload.todolist.id] = []
      })
      builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
         action.payload.todolists.forEach(tl => {
            state[tl.id] = []
         })
      })
      builder.addCase(removeTodolistAC, (state, action) => {
         delete state[action.payload.todolistId]
      })
      builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
         state[action.payload.todolistId] = action.payload.tasks
      })
      builder.addCase(removeTaskTC.fulfilled, (state, action) => {
         const tasks = state[action.payload.todolistId]
         const index = tasks.findIndex(t => t.id === action.payload.taskId)
         if (index > -1) {
            tasks.splice(index, 1)
         }
      })
      builder.addCase(addTaskTC.fulfilled, (state, action) => {
         state[action.payload.todolistId].unshift(action.payload)
      })
      builder.addCase(updateTaskTC.fulfilled, (state, action) => {
         const tasks = state[action.payload.todolistId]
         const index = tasks.findIndex(t => t.id === action.payload.taskId)
         if (index > -1) {
            tasks[index] = {...tasks[index], ...action.payload.model}
         }
      })
   }

})

//reducer
export const tasksReducer = slice.reducer

//actions


//types
export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
}

export type TasksStateType = {
   [key: string]: Array<TaskType>
}

//Types AC & Thunks
