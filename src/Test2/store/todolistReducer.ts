import {v1} from "uuid";
import {Test2FilterValuesType, Test2TaskType, Test2TodoListType} from "../Test2";


//TodoLists
export const ADD_TODOLIST = "ADD-TODOLIST"
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"
export const UPDATE_TODOLIST_TITLE = "UPDATE-TODOLIST-TITLE"

//Tasks
export const ADD_TASK = "ADD-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_FILTER = "CHANGE-FILTER"
export const CHANGE_STATUS = "CHANGE-STATUS"
export const UPDATE_TASK_HANDLER = "UPDATE-TASK-HANDLER"

//TodolistReducer
export const todolistReducers = (state: Test2TodoListType[], action: todolistReducersType) => {
   switch (action.type) {
      case ADD_TODOLIST:
         const newID = v1()
         const newTodoList: Test2TodoListType = {id: newID, title: action.payload.todolistID, filter: 'all'}
         return [...state, newTodoList]
      case REMOVE_TODOLIST:
         return state.filter(tdl => tdl.id !== action.payload.todolistID)
      case UPDATE_TODOLIST_TITLE:
         return state.map(tdl => tdl.id === action.payload.todolistID ? {...tdl, title: action.payload.newTitle} : tdl)
      default:
         return state
   }
};

export const tasksReducers = (state: Test2TaskType[], action: tasksReducersType) => {
   switch (action.type) {
      case ADD_TASK:
         const newTasks: Test2TaskType= {id: v1(), name: action.payload.newTitle, isDone: false }
         // return {...state, [action.payload.todolistID]: [newTasks, ...state[action.payload.todolistID]]}
         return {...state}
      case REMOVE_TASK:
      case CHANGE_FILTER:
      case CHANGE_STATUS:
      case UPDATE_TASK_HANDLER:
      default:
         return state

   }
}

// TodoListsReducersType
type todolistReducersType =
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof updateTodolistTitleAC>

//TasksReducersType
type tasksReducersType =
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof changeFilterAC> |
   ReturnType<typeof changeStatusAC> |
   ReturnType<typeof updateTaskHandlerAC>

// TodoListsAC
export const addTodolistAC = (todolistID: string) => {
   return {
      type: ADD_TODOLIST,
      payload: {
         todolistID,
      }
   } as const
}
export const removeTodolistAC = (todolistID: string) => {
   return {
      type: REMOVE_TODOLIST,
      payload: {
         todolistID
      }
   } as const
}
export const updateTodolistTitleAC = (todolistID: string, newTitle: string) => {
   return {
      type: UPDATE_TODOLIST_TITLE,
      payload: {
         todolistID,
         newTitle
      }
   }
}

//TasksAC
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
export const changeFilterAC = (todolistID: string, filter: Test2FilterValuesType) => {
   return {
      type: CHANGE_FILTER,
      payload: {
         todolistID,
         filter
      }
   } as const
}
export const changeStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
   return {
      type: CHANGE_STATUS,
      payload: {
         todoListID,
         taskID,
         isDone
      }
   } as const
}
export const updateTaskHandlerAC = (todolistID: string, taskID: string, newTitle: string ) => {
   return {
      type: UPDATE_TASK_HANDLER,
      payload: {
         todolistID,
         taskID,
         newTitle
      }
   } as const
}
