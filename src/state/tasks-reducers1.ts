import {FilterValuesType, TasksStateType, TasksType} from "./tasks-reducers1.test";

export const ADD_TASK = "ADD-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const UPDATE_TASK = "UPDATE-TASK"
export const CHANGE_STATUS = "CHANGE-STATUS"
export const CHANGE_FILTER = "CHANGE-FILTER"

export const tasksReducers1 = (state: TasksStateType, action: tasksReducers1Type): TasksStateType => {
   switch (action.type) {
      case ADD_TASK:
         const newTask: TasksType = {id: '0', title: action.payload.newTitle, isDone: false}
         return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
      case REMOVE_TASK:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)
         }
      case UPDATE_TASK:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
               ...t,
               title: action.payload.newTitle
            } : t)
         }
      case CHANGE_STATUS:
         return {
            ...state,
            [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
               ...t,
               isDone: action.payload.isDone
            } : t)
         }
      case CHANGE_FILTER:
         return {
            ...state,

         }
      default:
         return state
   }
}

type tasksReducers1Type =
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof updateTaskAC> |
   ReturnType<typeof changeStatusAC> |
   ReturnType<typeof changeFilterAC>

export const addTaskAC = (todolistID: string, newTitle: string) => {
   return {
      type: ADD_TASK,
      payload: {
         todolistID,
         newTitle
      }
   } as const
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
   return {
      type: REMOVE_TASK,
      payload: {
         todolistID,
         taskID
      }
   } as const
}

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
   return {
      type: UPDATE_TASK,
      payload: {
         todolistID,
         taskID,
         newTitle,
      }
   } as const
}

export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
   return {
      type: CHANGE_STATUS,
      payload: {
         todolistID,
         taskID,
         isDone
      }
   } as const
}

export const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
   return {
      type: CHANGE_FILTER,
      payload: {
         todolistID,
         filter
      }
   } as const
}