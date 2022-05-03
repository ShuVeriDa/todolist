import {TasksStateType, TasksType} from "./TESTtasks-reducers.test";
import {v1} from "uuid";

export const ADD_TASK = "ADD-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_STATUS = "CHANGE-STATUS"
export const UPDATE_TASK_TITLE = "UPDATE-TASK-TITLE"

export const tasksReducer = (state: TasksStateType, action: taskReducerType): TasksStateType => {
   switch (action.type) {
      case ADD_TASK:
         const newID = v1()
         const newTask: TasksType = {id: newID, title: action.payload.title, isDone: false}
         return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
      case REMOVE_TASK:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
         }
      case CHANGE_STATUS:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {
               ...task,
               isDone: action.payload.isDone
            } : task)
         }
      case UPDATE_TASK_TITLE:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {
               ...task,
               title: action.payload.newTitle
            } : task)
         }
      default:
         return state
   }
}

type taskReducerType =
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof changeStatusAC> |
   ReturnType<typeof updateTaskTitleAC>

export const addTaskAC = (todolistID: string, title: string) => {
   return {
      type: ADD_TASK,
      payload: {
         todolistID,
         title
      }
   } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
   return {
      type: REMOVE_TASK,
      payload: {
         todolistID,
         taskID,
      }
   } as const
}
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
   return {
      type: CHANGE_STATUS,
      payload: {
         todolistID,
         taskID,
         isDone,
      }
   } as const
}
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
   return {
      type: UPDATE_TASK_TITLE,
      payload: {
         todolistID,
         taskID,
         newTitle
      }
   } as const
}