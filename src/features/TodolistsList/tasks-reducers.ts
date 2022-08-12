import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";
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

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {

      const state = getState()
      const task = state.tasks[todolistId].find(t => t.id === taskId)
      if (!task) {
         //throw new Error("task not found in the state");
         console.warn('task not found in the state')
         return
      }

      const apiModel: UpdateTaskModelType = {
         deadline: task.deadline,
         description: task.description,
         priority: task.priority,
         startDate: task.startDate,
         title: task.title,
         status: task.status,
         ...model
      }

      todolistsAPI.updateTask(todolistId, taskId, apiModel)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(updateTaskAC({todolistId, taskId, model}))
            } else {
               handleServerAppError(res.data, dispatch);
            }
         })
         .catch((error) => {
            handleServerNetworkError(error, dispatch);
         })
   }


const slice = createSlice({
   name: "tasks",
   initialState: initialState,
   reducers: {
      updateTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) => {
         // return {
         //    ...state,
         //    [action.payload.todolistId]: state[action.payload.todolistId]
         //       .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
         // }

         const tasks = state[action.payload.todolistId]
         const index = tasks.findIndex(t => t.id === action.payload.taskId)
         if (index > -1) {
            tasks[index] = {...tasks[index], ...action.payload.model}
         }
      },

   },
   extraReducers: (builder) => {
      builder.addCase(addTodolistAC, (state, action) => {
         // return {
         //          ...state,
         //          [action.payload.todolist.id]: []
         //       }

         state[action.payload.todolist.id] = []
      })
      builder.addCase(setTodolistAC, (state, action) => {
         // const stateCopy = {...state}
         //       action.payload.todolists.forEach((tl: any) => {
         //          stateCopy[tl.payload.id] = []
         //       })
         //       return stateCopy

         action.payload.todolists.forEach(tl => {
            state[tl.id] = []
         })
      })
      builder.addCase(removeTodolistAC, (state, action) => {
         // let copyState = {...state}
         //       delete state[action.payload.todolistId]
         //       return copyState

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
   }

})

//reducer
export const tasksReducer = slice.reducer

//actions
export const {updateTaskAC} = slice.actions


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
