import {
   TaskPriorities, TaskStatuses, TaskType, todolistsAPI,
   UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {
   ADD_TODOLIST, addTodolistAC, REMOVE_TODOLIST, removeTodolistAC,
   SET_TODOLISTS, setTodolistAC
} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import { setAppStatusAC} from "../../app/app-reducer";

export const ADD_TASK = "ADD-TASK"
export const SET_TASKS = "SET-TASKS"
export const UPDATE_TASK = "UPDATE-TASK"
export const REMOVE_TASK = "REMOVE-TASK"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
   switch (action.type) {
      case SET_TODOLISTS:
         const stateCopy = {...state}
         action.todolists.forEach(tl => {
            stateCopy[tl.id] = []
         })
         return stateCopy
      case SET_TASKS:
         return {...state, [action.todolistId]: action.tasks}
      case UPDATE_TASK:
         return {
            ...state,
            [action.todolistId]: state[action.todolistId]
               .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
         }
      case ADD_TASK:
         return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]}
      // case CHANGE_TASK_STATUS:
      //    return {
      //       ...state,
      //       [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
      //          ...t,
      //          status: action.status
      //       } : t)
      //    }
      case REMOVE_TASK:
         return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
      // case CHANGE_TASK_TITLE:
      //    return {
      //       ...state,
      //       [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
      //          ...t,
      //          title: action.newTitle
      //       } : t)
      //    }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.todolist.id]: [],
         }
      // const stateCopy = {...state}
      // stateCopy[action.todolistID] = []
      // return stateCopy
      case REMOVE_TODOLIST:
         let copyState = {...state}
         delete state[action.todolistId]
         // let {[action.todolistID] : [], ...rest} = {...state}
         return copyState
      default:
         return state
   }
}


export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
   return {type: UPDATE_TASK, domainModel, todolistId, taskId} as const}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType> ) =>
   ({type: SET_TASKS, tasks, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => {
   return {type: REMOVE_TASK, todolistId, taskId} as const
}


//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({status: "loading"}))
   todolistsAPI.getTasks(todolistId)
      .then((res) => {
         const tasks = res.data.items
         dispatch(setTasksAC(todolistId, tasks))
         dispatch(setAppStatusAC({status: "succeeded"}))
      })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
   todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
         dispatch(removeTaskAC(todolistId, taskId))
      })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
   dispatch(setAppStatusAC({status: "loading"}))
   todolistsAPI.createTask(todolistId, title)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
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

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
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
         ...domainModel
      }

      todolistsAPI.updateTask(todolistId, taskId, apiModel)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(updateTaskAC(todolistId, taskId, domainModel))
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

type TasksActionType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof setTodolistAC> |
   ReturnType<typeof setTasksAC> |
   ReturnType<typeof updateTaskAC>