import {Test2TaskObjectType, Test2TaskType} from "../Test2";
import {v1} from "uuid";

export const ADD_TASK = 'ADD-TASK'
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"

export const ADD_TODOLIST = "ADD-TODOLIST"

const initialState: Test2TaskObjectType = {}

export const tasksReducer = (state: Test2TaskObjectType = initialState, action: taskReducerType): Test2TaskObjectType => {
   switch (action.type) {
      case ADD_TASK:
         let newTask: Test2TaskType = {id: v1(), title: action.newTitle, isDone: false}
         return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
      case REMOVE_TASK:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskId)
         }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.todolistID]: []
         }
      case CHANGE_TASK_STATUS:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? {
               ...t,
               isDone: action.isDoneValue
            } : t)
         }
      case CHANGE_TASK_TITLE:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? {
               ...t,
               title: action.newTitle
            } : t)
         }
      default:
         return state
   }
}

type taskReducerType =
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof changeTaskStatusAC> |
   ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (todolistID: string, newTitle: string) => {
   return {
      type: ADD_TASK,
      todolistID,
      newTitle
   } as const
}
export const removeTaskAC = (todolistID: string, taskId: string) => {
   return {
      type: REMOVE_TASK,
      todolistID,
      taskId: taskId
   } as const
}
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDoneValue: boolean) => {
   return {
      type: CHANGE_TASK_STATUS,
      todolistID,
      taskId: taskId,
      isDoneValue
   } as const
}

export const changeTaskTitleAC = (todolistID: string, taskId: string, newTitle: string) => {
   return {
      type: CHANGE_TASK_TITLE,
      todolistID,
      taskId: taskId,
      newTitle
   } as const
}


export const addTodolistAC = (title: string) => {
   return {
      type: ADD_TODOLIST,
      title,
      todolistID: v1()
   } as const
}


