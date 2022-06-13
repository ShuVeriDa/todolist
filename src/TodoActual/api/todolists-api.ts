import axios, {AxiosResponse} from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      'API-KEY': 'c094e303-b7d4-4052-8343-1a5391056e3d'
   }
})

export const todolistsAPI = {
   //todolist
   getTodolists: () => {
      return instance.get<TodolistType[]>('todo-lists')
   },
   createTodolist: (title: string) => {
      return instance.post<{title: string}, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`todo-lists`, {title})
   },
   //task
   getTasks: (todolistId: string) => {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
   },
   deleteTask: (todolistId: string, taskId: string) => {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
   },
   createTask: (todolistId: string, title: string) => {
      return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks`, {title})
   },
   updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
      return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
   }
}

export type TodolistType = {
   id: string
   addedDate: string
   order: number
   title: string
}

export type ResponseType<D = {}> = {
   resultCode: number
   messages: string[]
   fieldsErrors: string []
   data: D
}

export type GetTasksResponse = {
   totalCount: number
   error: string
   items: TaskType []
}

export type TaskType = {
   description: string
   title: string
   completed: boolean
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todolistId: string
   order: number
   addedDate: string
}

export enum TaskStatuses  {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}

export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4
}

export type UpdateTaskModelType = {
   title: string
   description: string
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
}