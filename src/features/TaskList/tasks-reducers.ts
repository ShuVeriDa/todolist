import {todolistsAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/types";
import {AppRootStateType, ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {asyncActions as asyncTodolistsActions} from '../TodolistsList/todolists-reducer'

const initialState: TasksStateType = {}

//thunk
export const fetchTasksTC = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
   thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
   try {
      const res = await todolistsAPI.getTasks(todolistId)
      const tasks = res.data.items
      thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
      return {todolistId, tasks}
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI)
   }
})
export const removeTaskTC = createAsyncThunk<{ todolistId: string, taskId: string,  }, {todolistId: string, taskId: string  }, ThunkError>('tasks/removeTask',
   async (param, thunkAPI) => {
      const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
      return {todolistId: param.todolistId, taskId: param.taskId}
   })
export const addTaskTC = createAsyncThunk<TaskType, {todolistId: string, title: string }, ThunkError>('tasks/addTask', async (param, thunkAPI) => {
   thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
   try {
      const res = await todolistsAPI.createTask(param.todolistId, param.title)
      if (res.data.resultCode === 0) {
         thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
         return res.data.data.item
      } else {
         return handleAsyncServerAppError(res.data, thunkAPI)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI, false)

   }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType }, thunkAPI) => {

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
         return handleAsyncServerAppError(res.data, thunkAPI)
      }
   } catch (error: any) {
      return handleAsyncServerNetworkError(error, thunkAPI)
   }
})

export const asyncActions = {
   fetchTasksTC,
   removeTaskTC,
   addTaskTC,
   updateTaskTC
}

export const slice = createSlice({
   name: "tasks",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(asyncTodolistsActions.addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
         })
         .addCase(asyncTodolistsActions.fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
               state[tl.id] = []
            })
         })
         .addCase(asyncTodolistsActions.removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
         })
         .addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
         })
         .addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
               tasks.splice(index, 1)
            }
         })
         .addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId].unshift(action.payload)
         })
         .addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
               tasks[index] = {...tasks[index], ...action.payload.model}
            }
         })
   }

})


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
