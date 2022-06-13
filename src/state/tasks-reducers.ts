import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
   ADD_TODOLIST,
   addTodolistAC,
   REMOVE_TODOLIST,
   removeTodolistAC,
   SET_TODOLISTS,
   setTodolistAC
} from "./todolists-reducer";
import {handleAppError, handleNetworkError} from "../utils/error-utils";
import {AppActionsType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";

export const ADD_TASK = "ADD-TASK"
export const SET_TASKS= "SET-TASKS"
export const UPDATE_TASK = "UPDATE-TASK"
export const FETCH_TASK = "FETCH-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
   switch (action.type) {
      case FETCH_TASK:
         return {...state, [action.todolistId]: action.tasks}
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
               .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
         }
      case ADD_TASK:
         return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: TaskStatuses
   priority?: TaskPriorities
   startDate?: string
   deadline?: string
}

type TasksActionType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof fetchTasksAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof setTodolistAC> |
   ReturnType<typeof setTasksAC> |
   ReturnType<typeof updateTaskAC> |
   AppActionsType

export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => {
   debugger
   return {type: FETCH_TASK, todolistId, tasks} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
   ({type: UPDATE_TASK, model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
   ({type: SET_TASKS, tasks, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
// export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
//    return {type: CHANGE_TASK_STATUS,  todolistId, taskId, status} as const
// }
export const removeTaskAC = (todolistId: string, taskId: string) => {
   return {type: REMOVE_TASK, todolistId,  taskId} as const
}
// export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
//    return {type: CHANGE_TASK_TITLE,  todolistId,  taskId, newTitle} as const
// }


//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionType>) => {
   dispatch(setAppStatusAC('loading'))
   todolistsAPI.getTasks(todolistId)
      .then((res) => {
         const tasks = res.data.items
         const action = setTasksAC(tasks, todolistId)
         dispatch(action)
         dispatch(setAppStatusAC('succeeded'))
      })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TasksActionType>) => {
   dispatch(setAppStatusAC('loading'))
   todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
         dispatch(removeTaskAC(taskId, todolistId))
         dispatch(setAppStatusAC('succeeded'))
      })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<TasksActionType>) => {
   dispatch(setAppStatusAC('loading'))
   todolistsAPI.createTask(todolistId, title)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
         } else {
            handleAppError(dispatch, res.data)
            // dispatch(setAppErrorAC(res.data.messages[0]))
            // dispatch(setAppStatusAC('failed'))
         }
      })
      .catch((err: AxiosError) => {
         handleNetworkError(dispatch, err.message)
      })
}

export const updateTaskTC = ( todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
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
      dispatch(setAppStatusAC('loading'))
      todolistsAPI.updateTask(todolistId, taskId, apiModel)
         .then(res => {
            const action = updateTaskAC(todolistId, taskId, domainModel)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
         })
   }


