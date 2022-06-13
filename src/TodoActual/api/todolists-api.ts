import axios from "axios";

export type TodolistAPIType = {
   id: string
   title: string
   addedDate: string
   order: number
}

export type TaskAPIType = {
   description: string
   title: string
   completed: boolean
   status: TaskStatuses
   priority: TaskPriorities
   startDate: string
   deadline: string
   id: string
   todoListId: string
   order: number
   addedDate: string
}

export type GetTaskResponse = {
   error: string | null
   totalCount: number
   items: TaskAPIType[]
}

export enum TaskStatuses {
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

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      'API-KEY': 'c094e303-b7d4-4052-8343-1a5391056e3d'
   }
})

export const todolistsAPI = {
   getTodolists: () => {
      return instance.get<TodolistAPIType[]>('todo-lists');
   },
   getTasks: (todolistId: string) => {
      return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
   }
}


