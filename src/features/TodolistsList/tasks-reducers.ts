import {
   TaskPriorities, TaskStatuses, TaskType, todolistsAPI, TodolistType,
   UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
   name: "tasks",
   initialState: initialState,
   reducers: {
      setTasksAC: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
         // return {...state, [action.payload.todolistId]: action.payload.tasks}

         state[action.payload.todolistId] = action.payload.tasks
      },
      addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
         // return {
         //    ...state,
         //    [action.payload.task.todolistId]: [action.payload.task, ...state[action.payload.task.todolistId]]
         // }

         state[action.payload.task.todolistId].unshift(action.payload.task)
      },
      removeTaskAC: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
         // return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}

         const tasks = state[action.payload.todolistId]
         const index = tasks.findIndex(t => t.id === action.payload.taskId)
         if (index > -1) {
            tasks.splice(index, 1)
         }
      },
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
   }

})
//reducer
export const tasksReducer = slice.reducer

//actions
export const {setTasksAC, addTaskAC, updateTaskAC, removeTaskAC} = slice.actions

//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({status: "loading"}))
   todolistsAPI.getTasks(todolistId)
      .then((res) => {
         const tasks = res.data.items
         dispatch(setTasksAC({todolistId, tasks}))
         dispatch(setAppStatusAC({status: "succeeded"}))
      })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
   todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
         dispatch(removeTaskAC({todolistId, taskId}))
      })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({status: "loading"}))
   todolistsAPI.createTask(todolistId, title)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
         } else {
            handleServerAppError(res.data, dispatch)
            // dispatch(setAppErrorAC(res.data.messages[0]))
            // dispatch(setAppStatusAC('failed'))
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}

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
