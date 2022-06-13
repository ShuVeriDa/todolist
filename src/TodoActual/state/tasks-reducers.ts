import {TasksStateType} from "../AppWithRedux";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
   ADD_TODOLIST,
   addTodolistAC,
   REMOVE_TODOLIST,
   removeTodolistAC,
   SET_TODOS,
   setTodolistAC
} from "./todolists-reducer";

export const ADD_TASK = "ADD-TASK"
export const FETCH_TASK = "FETCH-TASK"
export const REMOVE_TASK = "REMOVE-TASK"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
   switch (action.type) {
      case FETCH_TASK:
         return {...state, [action.todolistId]: action.tasks}
      case SET_TODOS:
         const stateCopy = {...state}
         action.todolists.forEach(tl => {
            stateCopy[tl.id] = []
         })
         return stateCopy
      case ADD_TASK:
         return {
            ...state,
            [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]
         }
      case REMOVE_TASK:
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
         }
      case CHANGE_TASK_TITLE:
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
               ...t,
               title: action.newTitle
            } : t)
         }
      case CHANGE_TASK_STATUS:
         return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
               ...t,
               status: action.status
            } : t)
         }
      case ADD_TODOLIST:
         return {
            ...state,
            [action.todolistId]: [],
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

type TasksActionType =
   ReturnType<typeof removeTaskAC> |
   ReturnType<typeof addTaskAC> |
   ReturnType<typeof changeTaskStatusAC> |
   ReturnType<typeof changeTaskTitleAC> |
   ReturnType<typeof fetchTasksAC> |
   ReturnType<typeof addTodolistAC> |
   ReturnType<typeof removeTodolistAC> |
   ReturnType<typeof setTodolistAC>


export const fetchTasksAC = (todolistId: string, tasks: TaskType[]) => {
   debugger
   return {type: FETCH_TASK, todolistId, tasks} as const
}
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => {
   return {type: REMOVE_TASK, todolistId,  taskId} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
   return {type: CHANGE_TASK_TITLE,  todolistId,  taskId, newTitle} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
   return {type: CHANGE_TASK_STATUS,  todolistId, taskId, status} as const
}

//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
   debugger
   todolistsAPI.getTasks(todolistId)
      .then((res) => {
         dispatch(fetchTasksAC(todolistId, res.data.items))
      })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
   todolistsAPI.deleteTask(todolistId, taskId)
      .then(() => {
         dispatch(removeTaskAC(todolistId, taskId))
      })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
   todolistsAPI.createTask(todolistId, title)
      .then((res) => {
         dispatch(addTaskAC(res.data.data.item))
      })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses,) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {

      const changedTask = getState().tasks[todolistId].find((t) => t.id === taskId)

      if (changedTask) {
         const model: UpdateTaskModelType = {
            title: changedTask.title,
            status,
            deadline: changedTask.deadline,
            startDate: changedTask.startDate,
            priority: changedTask.priority,
            description: changedTask.description,
         }

         todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
               dispatch(changeTaskStatusAC(todolistId, taskId, status))
            })
      }
   }


