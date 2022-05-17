import {TasksStateType, TasksType} from "./tasks-reducers.test";
import {v1} from "uuid";

export const ADD_TASK = "ADD-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
export const UPDATE_TASK_TITLE = "UPDATE-TASK-TITLE"
export const ADD_TODOLIST = "ADD-TODOLIST"
export const REMOVE_TODOLIST = "REMOVE-TODOLIST"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: tasksReducerType): TasksStateType => {
   switch (action.type) {
      case REMOVE_TASK:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
         }
      case ADD_TASK:
         const newTasks: TasksType = {id: v1(), title: action.newTitle, isDone: false}
         return {...state, [action.todolistID]: [newTasks, ...state[action.todolistID]]}
      case CHANGE_TASK_STATUS:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
               ...el,
               isDone: action.isDoneValue
            } : el)
         }
      case UPDATE_TASK_TITLE:
         return {
            ...state,
            [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
               ...el,
               title: action.newTitle
            } : el)
         }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.todolistID]: [],
         }
      // const stateCopy = {...state}
      // stateCopy[action.todolistID] = []
      // return stateCopy
      case REMOVE_TODOLIST:
         let copyState = {...state}
         delete state[action.todolistID]
         // let {[action.todolistID] : [], ...rest} = {...state}
         return copyState
      default:
         return state
   }
}

type tasksReducerType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof changeTaskStatusAC> |
   ReturnType<typeof updateTaskTitleAC> |
   ReturnType<typeof addTodoListAC> |
   ReturnType<typeof removeTodoListAC>


export const removeTaskAC = (todolistID: string, taskID: string) => {
   return {
      type: REMOVE_TASK,
      todolistID,
      taskID,
   } as const
}

export const addTaskAC = (todolistID: string, newTitle: string) => {
   return {
      type: ADD_TASK,
      todolistID,
      newTitle
   } as const
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDoneValue: boolean) => {
   return {
      type: CHANGE_TASK_STATUS,
      todolistID,
      taskID,
      isDoneValue,
   } as const
}
export const updateTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
   return {
      type: UPDATE_TASK_TITLE,
      todolistID,
      taskID,
      newTitle
   } as const
}

export const addTodoListAC = (title: string) => {
   return {
      type: ADD_TODOLIST,
      title,
      todolistID: v1()
   } as const
}

export const removeTodoListAC = (todolistID: string) => {
   return {
      type: REMOVE_TODOLIST,
      todolistID
   } as const
}



