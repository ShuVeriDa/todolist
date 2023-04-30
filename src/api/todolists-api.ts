import axios, {AxiosResponse} from 'axios'
import {
   AuthMeType,
   GetTasksResponse,
   LoginParamsType,
   ResponseType,
   TaskType,
   TodolistType,
   UpdateTaskModelType
} from "./types";

const apiKey = process.env.REACT_APP_API_KEY ? String(process.env.REACT_APP_API_KEY) : '';


const instance = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
     // || 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      'API-KEY': apiKey
   }
})

// api
export const todolistsAPI = {
   //Todolist
   getTodolists() {
      return instance.get<TodolistType[]>('todo-lists');
   },
   createTodolist(title: string) {
      return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
   },
   deleteTodolist(todolistId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
   },
   updateTodolist(todolistId: string, title: string) {
      return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title});
   },

   //Task
   getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
   },
   deleteTask(todolistId: string, taskId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
   },
   createTask(todolistId: string, title: string) {
      return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
   },
   updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
      return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
   }
}

export const authAPI = {
   login(data: LoginParamsType) {
      return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: string}>>>("auth/login", data)
   },
   me(){
      return instance.get<ResponseType>('/auth/me')
   },
   logout() {
      return instance.delete<ResponseType<AuthMeType>>('/auth/login')
   }
}


